#!/usr/bin/env python3
import re

# Read the HTML file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add VIP system script reference
script_tag = '<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>'
new_script_section = script_tag + '\n    <script src="vip-system.js" defer></script>'
content = content.replace(script_tag, new_script_section)

# 2. Update subscribe button function
old_subscribe = 'onclick="subscribeVIP(\'monthly\')"'
new_subscribe = 'onclick="showModal(\'vipSubscriptionModal\')"'
content = content.replace('onclick="subscribeVIP(\'monthly\')"', new_subscribe)

# 3. Add VIP modals before ADD USER MODAL
vip_modals = '''
    <!-- VIP SUBSCRIPTION MODAL -->
    <div class="modal-overlay" id="vipSubscriptionModal">
      <div class="modal">
        <button class="modal-close" onclick="closeModal('vipSubscriptionModal')">
          <i class="fas fa-times"></i>
        </button>
        <div style="text-align: center; margin-bottom: 24px">
          <div style="font-size: 36px; margin-bottom: 8px">👑</div>
          <h2>อัปเกรด VIP</h2>
          <p>เลือกแผนที่เหมาะสมกับคุณ</p>
        </div>
        <div id="vipPlanSelector" style="margin-bottom: 24px">
          <button class="vip-plan-card" id="vipPlan-monthly" onclick="selectVIPPlan('monthly')" style="width: 100%; margin-bottom: 12px; text-align: center; padding: 16px; border: 2px solid var(--navy-border); border-radius: 12px; background: var(--navy-card); cursor: pointer;">
            <div class="vip-plan-badge">ยอดนิยม</div>
            <div style="font-size: 24px; margin: 8px 0">📅 VIP เดือน</div>
            <div class="vip-plan-price">฿299</div>
            <div style="font-size: 12px; color: var(--text-secondary)">ต่อเดือน</div>
          </button>
          <button class="vip-plan-card" id="vipPlan-yearly" onclick="selectVIPPlan('yearly')" style="width: 100%; text-align: center; padding: 16px; border: 2px solid var(--navy-border); border-radius: 12px; background: var(--navy-card); cursor: pointer;">
            <div class="vip-plan-badge" style="background: var(--blue-glow)">ประหยัด 30%</div>
            <div style="font-size: 24px; margin: 8px 0">💎 VIP ปี</div>
            <div class="vip-plan-price" style="color: var(--blue-glow)">฿2,499</div>
            <div style="font-size: 12px; color: var(--text-secondary)">ต่อปี</div>
          </button>
        </div>
        <button class="btn btn-gold" style="width: 100%; padding: 13px" onclick="submitVIPRequest()" id="submitVIPBtn" disabled>
          <i class="fas fa-crown"></i> ส่งคำขอสมาชิก VIP
        </button>
        <p style="text-align: center; margin-top: 12px; font-size: 12px; color: var(--text-muted)">
          คำขอจะถูกส่งให้แอดมินทำการอนุมัติ
        </p>
      </div>
    </div>

    <!-- VIP REQUEST STATUS MODAL -->
    <div class="modal-overlay" id="vipStatusModal">
      <div class="modal">
        <button class="modal-close" onclick="closeModal('vipStatusModal')">
          <i class="fas fa-times"></i>
        </button>
        <div style="text-align: center; margin-bottom: 24px">
          <div style="font-size: 48px; margin-bottom: 8px" id="vipStatusIcon">⏳</div>
          <h2 id="vipStatusTitle">รอการอนุมัติ</h2>
          <p id="vipStatusText">คำขอของคุณได้ถูกส่งแล้ว แอดมินจะอนุมัติภายใน 24 ชั่วโมง</p>
        </div>
        <div class="card" style="background: rgba(41, 121, 255, 0.08); border-color: rgba(41, 121, 255, 0.3); margin-bottom: 16px">
          <div class="card-title" style="margin: 0 0 12px 0">
            <i class="fas fa-info-circle"></i> รายละเอียด
          </div>
          <div class="indicator-row" style="border: none">
            <span>แผน:</span><strong id="vipStatusPlan">-</strong>
          </div>
          <div class="indicator-row" style="border: none; margin-top: 8px">
            <span>วันที่สมัคร:</span><strong id="vipStatusDate">-</strong>
          </div>
          <div class="indicator-row" style="border: none; margin-top: 8px">
            <span>สถานะ:</span><strong id="vipStatusBadge" class="badge badge-gray">รอยืนยัน</strong>
          </div>
        </div>
        <button class="btn btn-outline" style="width: 100%; padding: 13px" onclick="closeModal('vipStatusModal')">
          ปิด
        </button>
      </div>
    </div>

'''

add_user_modal = '    <!-- ADD USER MODAL -->'
content = content.replace(add_user_modal, vip_modals + add_user_modal)

# 4. Add admin VIP requests tab section
admin_tab_vip = '''
          <!-- VIP REQUESTS TAB -->
          <div id="adminTab-vip_requests" class="tab-content">
            <div class="card">
              <div class="card-title">
                <i class="fas fa-crown"></i> คำขอสมาชิก VIP
              </div>
              <div id="adminVIPRequests" style="max-height: 600px; overflow-y: auto">
                กำลังโหลด...
              </div>
            </div>
          </div>

'''

settings_tab = '          <!-- SETTINGS TAB -->'
content = content.replace(settings_tab, admin_tab_vip + settings_tab)

# 5. Add VIP requests tab button in admin tabs
admin_tabs = '''            <button class="tab-btn" onclick="switchTab('adminTab', 'vip_requests', this)">
              <i class="fas fa-crown"></i> VIP Requests
            </button>'''

news_tab_btn = '''            <button class="tab-btn" onclick="switchTab('adminTab', 'news', this)">
              <i class="fas fa-newspaper"></i> ข่าว
            </button>'''

if admin_tabs not in content and news_tab_btn in content:
    content = content.replace(news_tab_btn, news_tab_btn + '\n' + admin_tabs)

# Write the modified HTML back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✓ HTML updated successfully!")
print("  - Added VIP system script reference")
print("  - Added VIP subscription modals")
print("  - Added VIP request status modal")
print("  - Added admin VIP requests tab")
print("  - Updated subscribe button functions")
