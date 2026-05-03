# RuayHun AI - ระบบวิเคราะห์หุ้นอัจฉริยะ

เว็บแอปหน้าเดียวสำหรับวิเคราะห์หุ้น พร้อมระบบสมาชิก VIP, ระบบผู้ดูแล, และข่าวหุ้นจาก Finnhub

## 📌 สถานะปัจจุบัน
- โค้ดหลักอยู่ใน `index.html` และ `vip-system.js`
- ใช้ Firebase Firestore เป็นฐานข้อมูล
- ใช้ Finnhub API สำหรับโหลดข่าวหุ้น
- มีระบบสมัครสมาชิก, เข้าสู่ระบบ, VIP, และหน้า Admin

## 🚀 การเริ่มต้นใช้งาน
1. เปิดไฟล์ `index.html` ในเว็บเบราว์เซอร์
2. หากต้องการใช้งานบนเว็บจริง ให้อัปโหลดไฟล์นี้ไปยังเว็บโฮสต์แบบ static เช่น GitHub Pages, Netlify หรือ Vercel

## 🔧 การตั้งค่าในโค้ดปัจจุบัน
### 1. Firebase Config
ค่า Firebase ถูกฝังไว้ใน `index.html` แล้ว:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDwmFKFoTEegJONofUOyZJBRKcOkmkQG7A",
  authDomain: "app-rm-ruay-hun.firebaseapp.com",
  projectId: "app-rm-ruay-hun",
  storageBucket: "app-rm-ruay-hun.firebasestorage.app",
  messagingSenderId: "501495695669",
  appId: "1:501495695669:web:431ced9edaf06efc74e47c",
  measurementId: "G-ZVF8WYX8X1",
};
```
หากต้องการใช้งาน Firebase ของตัวเอง ให้แทนค่าตรงนี้ด้วยค่าของโปรเจกต์ Firebase ของคุณ

### 2. Firestore
ต้องเปิดใช้งาน Firestore Database ใน Firebase Console

ตัวอย่างกฎแบบทดสอบสำหรับการใช้งานเบื้องต้น:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write;
    }
  }
}
```
> ควรปรับกฎเมื่อจะนำระบบขึ้น production

### 3. Finnhub API
โค้ดปัจจุบันใช้ Finnhub API สำหรับโหลดข่าวหุ้นจาก `company-news`:
```javascript
const API_KEY = "d7qrrb1r01qudmina8qgd7qrrb1r01qudmina8r0";
const FINNHUB = "https://finnhub.io/api/v1";
```
หากต้องการใช้ API Key ของตัวเอง ให้แก้ไขค่า `API_KEY` ใน `index.html`

## 🔑 บัญชีทดสอบ
ระบบจะสร้างผู้ดูแล `ket` ให้อัตโนมัติหากยังไม่มีในฐานข้อมูล

- ชื่อผู้ใช้: `ket`
- รหัสผ่าน: `admin1234`

## ✨ ฟีเจอร์หลักในเวอร์ชันนี้
- สมัครสมาชิก / เข้าสู่ระบบ
- ระบบผู้ใช้ VIP และการอนุมัติคำขอ VIP
- หน้า Admin สำหรับจัดการผู้ใช้, ข่าว, VIP request
- ระบบหุ้นซิ่ง (Rocket Scan)
- แสดงข่าวหุ้นจาก Finnhub
- อัปเดตสถานะ VIP อัตโนมัติเมื่อหมดอายุ
- ป้องกันการเพิ่มหุ้นโปรดเกินจำนวนสำหรับผู้ใช้ฟรี

## 📘 วิธีใช้งานพื้นฐาน
1. เปิด `index.html` ด้วยเบราว์เซอร์
2. สมัครสมาชิกหรือเข้าสู่ระบบด้วย `ket` / `admin1234`
3. ใช้งานเมนูต่าง ๆ เช่น Dashboard, VIP, News, Rocket Scan
4. หากเป็นแอดมิน ให้เข้าหน้า Admin เพื่อจัดการผู้ใช้และข่าว

## ⚠️ หมายเหตุสำคัญ
- โค้ดปัจจุบันใช้ Finnhub เป็นแหล่งข้อมูลข่าวหลัก
- ไม่มีการกำหนด Alpha Vantage หรือ Twelve Data ในโค้ดปัจจุบัน
- หากไม่สามารถโหลดข่าวได้ อาจเป็นเพราะ API Key ถูกจำกัดหรือหมดอายุ

## 🛠️ การแก้ปัญหาเบื้องต้น
### ไม่สามารถเข้าสู่ระบบ
- ตรวจสอบว่า Firestore ถูกเปิดใช้งาน
- ตรวจสอบว่า Firestore rules อนุญาต read/write
- ดู Console ของเบราว์เซอร์ (F12)

### ไม่มีข่าวหุ้นหรือข้อมูลหุ้นไม่ขึ้น
- ตรวจสอบค่า `API_KEY` ใน `index.html`
- หากใช้ Finnhub key ของตัวเอง ให้แน่ใจว่า key ยังใช้ได้
- ดู Console ของเบราว์เซอร์เพื่อดูข้อความผิดพลาด

## 🚀 Deploy
- ใช้งานได้ทันทีด้วย static hosting
- วาง `index.html`, `vip-system.js`, และโฟลเดอร์ `img/` บนเว็บโฮสต์

## 🧩 โครงสร้างไฟล์ที่สำคัญ
- `index.html` — หน้า UI และโค้ดหลัก
- `vip-system.js` — ระบบ VIP, admin, และ helper functions
- `img/` — รูปภาพและไอคอน


### ❌ Firebase Error
**สาเหตุ**: Firebase config ไม่ถูกต้องหรือ Firestore Rules ไม่อนุญาตการอ่าน/เขียน
**วิธีแก้**:
1. ตรวจสอบ Firebase config ใน Firebase Console
2. ตรวจสอบว่าได้เปิดใช้งาน Firestore Database
3. ตรวจสอบ Firestore Rules ให้อนุญาตการอ่าน/เขียน (test mode)

### ❌ API Rate Limit
**สาเหตุ**: เรียก API เกินจำนวนที่กำหนด
**วิธีแก้**:
1. รอให้ครบกำหนด (ตามนโยบายของแต่ละ API)
2. เปลี่ยนไปใช้ API อื่น
3. ใช้ระบบ cache (5 นาที) เพื่อลดการเรียก API

## ⚠️ คำเตือน

- ข้อมูลนี้ใช้สำหรับการศึกษาและติดตามการลงทุนเท่านั้น
- ไม่ใช่คำแนะนำทางการเงิน
- ควรศึกษาข้อมูลเพิ่มเติมก่อนตัดสินใจลงทุน
- ความเสี่ยงเป็นของนักลงทุนเอง

## 📞 สนับสนุน

- **Email**: support@ruayhun.ai
- **Line**: @ruayhunai

---

**พัฒนาโดย**: Senior Frontend Developer + Stock API Engineer + Firebase Expert
**เวอร์ชัน**: 1.0.0
**วันที่**: 2024</content>
<parameter name="filePath">d:\RAM RUAY\README.md