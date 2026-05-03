# ตัวอย่างการตั้งค่า RuayHun AI

## 🔑 Default Test Credentials

ระบบจะสร้างบัญชีแอดมิน `ket` ให้อัตโนมัติ หากยังไม่มีในฐานข้อมูล:

```
ชื่อผู้ใช้: ket
รหัสผ่าน: admin1234
บทบาท: admin
```

## 1. Firebase Config

โค้ดปัจจุบันมีค่า Firebase Config ฝังไว้ใน `index.html` ดังนี้:

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

หากต้องการใช้ Firebase ของตัวเอง ให้แทนค่าตรงนี้ด้วยค่า config ของโปรเจกต์คุณ

## 2. Firestore

เปิดใช้งาน Firestore Database ใน Firebase Console แล้วตั้งค่า Rules ดังนี้:

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

จากนั้นคลิก `Publish`

## 3. Finnhub API

โค้ดปัจจุบันใช้ Finnhub API สำหรับโหลดข่าวหุ้น โดยค่าเริ่มต้นถูกกำหนดไว้ใน `index.html`:

```javascript
const API_KEY = "d7qrrb1r01qudmina8qgd7qrrb1r01qudmina8r0";
const FINNHUB = "https://finnhub.io/api/v1";
```

หากต้องการใช้คีย์ของตัวเอง ให้แก้ไขค่า `API_KEY` ใน `index.html`

## 4. ทดสอบการใช้งาน

1. เปิด `index.html` ในเว็บเบราว์เซอร์
2. เข้าสู่ระบบด้วย `ket` / `admin1234`
3. ตรวจสอบว่าโหลดหน้า Admin, VIP, และ Rocket Scan ได้
4. ตรวจสอบ Console (F12) ว่าไม่มี error

## หมายเหตุ

- โค้ดปัจจุบันไม่ได้ใช้ Alpha Vantage หรือ Twelve Data
- หากไม่มีข่าวหุ้น ให้ตรวจสอบค่า `API_KEY` และสถานะ Firestore
- ใช้งานได้กับเว็บโฮสต์แบบ static เช่น GitHub Pages, Netlify, Vercel
