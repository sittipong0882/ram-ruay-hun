// =============================================
//  VIP SUBSCRIPTION SYSTEM
// =============================================

// state for VIP selection
let selectedVIPPlan = null;

// Select VIP Plan
function selectVIPPlan(plan) {
  selectedVIPPlan = plan;
  
  // update UI
  const monthly = document.getElementById('vipPlan-monthly');
  const yearly = document.getElementById('vipPlan-yearly');
  
  if (monthly && yearly) {
    monthly.classList.remove('selected');
    yearly.classList.remove('selected');
    
    if (plan === 'monthly') {
      monthly.classList.add('selected');
    } else {
      yearly.classList.add('selected');
    }
  }
  
  // enable submit button
  document.getElementById('submitVIPBtn').disabled = false;
}

// Submit VIP Request
async function submitVIPRequest() {
  if (!currentUser) {
    toastError('กรุณาเข้าสู่ระบบก่อน');
    return;
  }
  
  if (!selectedVIPPlan) {
    toastError('กรุณาเลือกแผน VIP');
    return;
  }
  
  try {
    // check if already has pending request
    const existingReq = await db.collection('vip_requests')
      .where('userId', '==', currentUser.id || currentUser.username)
      .where('status', '==', 'pending')
      .get();
    
    if (!existingReq.empty) {
      toastError('คุณมีคำขอรออนุมัติอยู่แล้ว');
      return;
    }
    
    // create VIP request
    const docRef = await db.collection('vip_requests').add({
      userId: currentUser.id || currentUser.username,
      userName: currentUser.name || currentUser.username,
      userEmail: currentUser.email || '-',
      plan: selectedVIPPlan,
      status: 'pending',
      requestDate: new Date(),
      approvedDate: null,
      expiryDate: null,
    });
    
    // update user document
    await db.collection('users')
      .where('username', '==', currentUser.username)
      .get()
      .then(snapshot => {
        if (snapshot.docs.length > 0) {
          const userDoc = snapshot.docs[0];
          db.collection('users').doc(userDoc.id).update({
            vipRequest: {
              plan: selectedVIPPlan,
              status: 'pending',
              requestDate: new Date(),
            }
          });
        }
      });
    
    closeModal('vipSubscriptionModal');
    showVIPStatusModal(selectedVIPPlan);
    toastSuccess('ส่งคำขอสมาชิก VIP แล้ว');
  } catch (e) {
    console.error('Error:', e);
    toastError('เกิดข้อผิดพลาด: ' + e.message);
  }
}

// Show VIP Status Modal
function showVIPStatusModal(plan) {
  document.getElementById('vipStatusIcon').textContent = '⏳';
  document.getElementById('vipStatusTitle').textContent = 'รอการอนุมัติ';
  document.getElementById('vipStatusText').textContent = 'คำขอของคุณได้ถูกส่งแล้ว แอดมินจะอนุมัติภายใน 24 ชั่วโมง';
  document.getElementById('vipStatusPlan').textContent = plan === 'monthly' ? 'VIP รายเดือน (฿299)' : 'VIP รายปี (฿2,499)';
  document.getElementById('vipStatusDate').textContent = new Date().toLocaleDateString('th-TH');
  document.getElementById('vipStatusBadge').textContent = 'รอยืนยัน';
  document.getElementById('vipStatusBadge').className = 'badge badge-gray';
  
  showModal('vipStatusModal');
}

// =============================================
//  ADMIN VIP REQUEST MANAGEMENT
// =============================================

// Load VIP Requests for Admin
async function loadVIPRequests() {
  const container = document.getElementById('adminVIPRequests');
  if (!container) return;
  
  try {
    const snap = await db.collection('vip_requests')
      .orderBy('requestDate', 'desc')
      .get();
    
    if (snap.empty) {
      container.innerHTML = '<div style=\"color:var(--text-muted); padding:16px;\">ไม่มีคำขอ</div>';
      return;
    }
    
    container.innerHTML = '';
    snap.docs.forEach((doc) => {
      const req = doc.data();
      const div = document.createElement('div');
      div.className = 'vip-request-item';
      
      const planText = req.plan === 'monthly' ? 'VIP รายเดือน' : 'VIP รายปี';
      const badgeColor = req.status === 'pending' ? 'badge-gray' : 
                        req.status === 'approved' ? 'badge-green' : 'badge-red';
      const statusText = req.status === 'pending' ? 'รอยืนยัน' : 
                        req.status === 'approved' ? 'อนุมัติแล้ว' : 'ปฏิเสธ';
      
      div.innerHTML = `
        <div class=\"vip-request-info\">
          <div class=\"vip-request-user\">${escapeHtml(req.userName)}</div>
          <div class=\"vip-request-detail\">${escapeHtml(req.userEmail)}</div>\n          <div class=\"vip-request-detail\">${planText} • ${formatDate(req.requestDate)}</div>\n          <span class=\"vip-request-badge ${badgeColor}\">${statusText}</span>\n        </div>\n        <div class=\"vip-request-actions\">\n          ${req.status === 'pending' ? `\n            <button class=\"btn btn-sm btn-gold\" onclick=\"approveVIPRequest('${doc.id}', '${req.plan}', '${req.userId}')\"><i class=\"fas fa-check\"></i> อนุมัติ</button>\n            <button class=\"btn btn-sm btn-danger\" onclick=\"rejectVIPRequest('${doc.id}')\"><i class=\"fas fa-times\"></i> ปฏิเสธ</button>\n          ` : ''}\n        </div>\n      `;
      container.appendChild(div);
    });
  } catch (e) {
    console.error('Error loading VIP requests:', e);
  }
}

// Approve VIP Request
async function approveVIPRequest(docId, plan, userId) {
  if (!confirm('ยืนยันการอนุมัติ?')) return;
  
  try {
    const now = new Date();
    const expiryDate = new Date();
    
    if (plan === 'monthly') {
      expiryDate.setMonth(expiryDate.getMonth() + 1);
    } else {
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    }
    
    // update request
    await db.collection('vip_requests').doc(docId).update({
      status: 'approved',
      approvedDate: now,
      expiryDate: expiryDate,
    });
    
    // update user
    const userSnap = await db.collection('users')
      .where('username', '==', userId)
      .get();
    
    if (userSnap.docs.length > 0) {
      const userDoc = userSnap.docs[0];
      await db.collection('users').doc(userDoc.id).update({
        vip: true,
        vipPlan: plan,
        vipStatus: 'approved',
        vipStartDate: now,
        vipExpiryDate: expiryDate,
        vipRequest: null,
      });
      
      // update local currentUser
      if (currentUser && currentUser.username === userId) {
        currentUser.vip = true;
        currentUser.vipPlan = plan;
        currentUser.vipStatus = 'approved';
        currentUser.vipExpiryDate = expiryDate;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
      }
    }
    
    toastSuccess('อนุมัติสมาชิก VIP แล้ว');
    loadVIPRequests();
    loadAdminStats();
  } catch (e) {
    toastError('เกิดข้อผิดพลาด');
  }
}

// Reject VIP Request
async function rejectVIPRequest(docId) {
  if (!confirm('ยืนยันการปฏิเสธ?')) return;
  
  try {
    await db.collection('vip_requests').doc(docId).update({
      status: 'rejected',
    });
    
    toastSuccess('ปฏิเสธคำขอแล้ว');
    loadVIPRequests();
    loadAdminStats();
  } catch (e) {
    toastError('เกิดข้อผิดพลาด');
  }
}

// =============================================
//  AUTO EXPIRE VIP
// =============================================

// Check and downgrade expired VIP
async function checkExpiredVIP() {
  try {
    const now = new Date();
    const snapshot = await db.collection('users')
      .where('vip', '==', true)
      .get();
    
    snapshot.docs.forEach(async (doc) => {
      const user = doc.data();
      if (user.vipExpiryDate && new Date(user.vipExpiryDate.toDate()) < now) {
        // downgrade to free
        await db.collection('users').doc(doc.id).update({
          vip: false,
          vipPlan: null,
          vipStatus: 'expired',
          vipExpiryDate: null,
        });
        
        // notify user if logged in
        if (currentUser && currentUser.id === user.id) {
          currentUser.vip = false;
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          updateNavForUser();
          toastError('สมาชิก VIP ของคุณหมดอายุแล้ว');
        }
      }
    });
  } catch (e) {
    console.error('Error checking expired VIP:', e);
  }
}

// Run check every hour
setInterval(checkExpiredVIP, 3600000);

// =============================================\n//  FAVORITES LIMIT CHECK\n// =============================================\n\n// Check favorite limit\nfunction checkFavoriteLimit() {\n  if (!currentUser) return true;\n  \n  const maxFav = currentUser.vip ? 999 : 5;\n  const currentFavCount = localStorage.getItem('favCount-' + currentUser.username) || 0;\n  \n  if (parseInt(currentFavCount) >= maxFav) {\n    const planText = currentUser.vip ? 'VIP' : 'แผนฟรี';\n    toastError(`คุณถึงขีดจำกัดหุ้นโปรดแล้ว (${maxFav} ตัว) สำหรับ${planText}`);\n    return false;\n  }\n  \n  return true;\n}\n\n// =============================================\n//  NEWS FILTERING BY TIER\n// =============================================\n\n// Load news based on user tier\nasync function loadNewsForUserTier() {\n  try {\n    let newsSnapshot;\n    \n    if (!currentUser) {\n      // free users: general news only\n      newsSnapshot = await db.collection('news')\n        .where('tier', 'in', ['free', 'all'])\n        .orderBy('date', 'desc')\n        .limit(20)\n        .get();\n    } else if (currentUser.vip) {\n      const isYearlyVIP = currentUser.vipPlan === 'yearly';\n      // VIP users\n      const allowedTiers = isYearlyVIP ? ['free', 'vip_monthly', 'vip_yearly', 'all'] : ['free', 'vip_monthly', 'all'];\n      newsSnapshot = await db.collection('news')\n        .where('tier', 'in', allowedTiers)\n        .orderBy('date', 'desc')\n        .limit(20)\n        .get();\n    } else {\n      // free plan users\n      newsSnapshot = await db.collection('news')\n        .where('tier', 'in', ['free', 'all'])\n        .orderBy('date', 'desc')\n        .limit(10)\n        .get();\n    }\n    \n    return newsSnapshot.docs.map(doc => ({\n      id: doc.id,\n      ...doc.data()\n    }));\n  } catch (e) {\n    console.error('Error loading news:', e);\n    return [];\n  }\n}\n\n// Load news for stock detail modal\nasync function loadStockNews(symbol) {\n  const container = document.getElementById('sdNews');\n  if (!container) return;\n  \n  try {\n    const news = await loadNewsForUserTier();\n    const relevantNews = news.filter(n => \n      n.symbol === symbol || n.content.includes(symbol)\n    ).slice(0, 5);\n    \n    if (relevantNews.length === 0) {\n      container.innerHTML = '<div style=\"color: var(--text-muted); padding: 16px; text-align: center;\">ยังไม่มีข่าวสำหรับหุ้นนี้</div>';\n      return;\n    }\n    \n    container.innerHTML = '';\n    relevantNews.forEach(item => {\n      const newsElement = document.createElement('div');\n      newsElement.className = 'news-item';\n      \n      let tierBadge = '';\n      if (item.tier === 'vip_yearly') {\n        tierBadge = '<span class=\"badge badge-gold\" style=\"margin-left: 8px;\"><i class=\"fas fa-crown\"></i> VIP ปี</span>';\n      } else if (item.tier === 'vip_monthly') {\n        tierBadge = '<span class=\"badge badge-blue\" style=\"margin-left: 8px;\"><i class=\"fas fa-star\"></i> VIP เดือน</span>';\n      }\n      \n      newsElement.innerHTML = `\n        <div style=\"flex: 1;\">\n          <div class=\"news-title\">${escapeHtml(item.title)}${tierBadge}</div>\n          <div class=\"news-meta\">${escapeHtml(item.source || '')} · ${formatDate(item.date)}</div>\n          <div style=\"margin-top: 8px; color: var(--text-secondary); font-size: 13px;\">${escapeHtml(item.content?.substring(0, 100) || '')}...</div>\n        </div>\n      `;\n      container.appendChild(newsElement);\n    });\n  } catch (e) {\n    console.error('Error loading stock news:', e);\n  }\n}\n\n// =============================================\n//  UPDATE USER STATUS DISPLAY\n// =============================================\n\nfunction updateUserStatusDisplay() {\n  if (!currentUser) {\n    const statusEl = document.getElementById('homeUserStatus');\n    if (statusEl) {\n      statusEl.parentElement.style.display = 'none';\n    }\n    return;\n  }\n  \n  const statusEl = document.getElementById('homeUserStatus');\n  if (statusEl) {\n    let badge = '';\n    if (currentUser.vip) {\n      if (currentUser.vipPlan === 'yearly') {\n        badge = '<i class=\"fas fa-crown\"></i> VIP ปี';\n        statusEl.className = 'badge status-vip-year';\n      } else {\n        badge = '<i class=\"fas fa-star\"></i> VIP เดือน';\n        statusEl.className = 'badge status-vip-month';\n      }\n    } else {\n      badge = '<i class=\"fas fa-user\"></i> แผนฟรี';\n      statusEl.className = 'badge status-free';\n    }\n    statusEl.innerHTML = badge;\n    statusEl.parentElement.style.display = 'block';\n  }\n}\n\n// Run on page load\nwindow.addEventListener('load', () => {\n  checkExpiredVIP();\n  updateUserStatusDisplay();\n});\n\n// Subscribe to update every page change\nconst originalShowPage = window.showPage;\nwindow.showPage = function(pageId) {\n  originalShowPage(pageId);\n  updateUserStatusDisplay();\n};\n