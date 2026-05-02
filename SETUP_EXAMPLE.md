# ตัวอย่างการตั้งค่า RuayHun AI

## 🔑 Default Test Credentials

**ใช้เข้าสู่ระบบเพื่อการทดสอบ (ทำงานทันที โดยไม่ต้องตั้งค่า Firestore):**

```
ชื่อผู้ใช้: ket
รหัสผ่าน: admin1234
บทบาท: Admin + VIP
```

## 1. Firebase Config (ตั้งค่าเรียบร้อยแล้ว ✅)

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDwmFKFoTEegJONofUOyZJBRKcOkmkQG7A",
  authDomain: "app-rm-ruay-hun.firebaseapp.com",
  projectId: "app-rm-ruay-hun",
  storageBucket: "app-rm-ruay-hun.firebasestorage.app",
  messagingSenderId: "501495695669",
  appId: "1:501495695669:web:431ced9edaf06efc74e47c",
  measurementId: "G-ZVF8WYX8X1"
};
```

**สถานะ**: ✅ Firebase Config ตั้งค่าเรียบร้อยแล้ว

## 2. Firestore Rules (ตั้งค่าใน Firebase Console)

ไปที่ Firestore Database > Rules และแทนที่ด้วยรายนี้:

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

หลังจากแทนที่ ให้คลิก **"Publish"** เพื่อให้ rules มีผลบังคับใช้

## 3. API Keys (ตั้งค่าเรียบร้อยแล้ว ✅)

```javascript
const API_CONFIG = {
  ALPHA_VANTAGE: {
    key: "VA4YH1MQD8QPT99U", // ✅ API key จริงที่ได้จาก Alpha Vantage
    base: "https://www.alphavantage.co/query"
  },
  FINNHUB: {
    key: "YOUR_FINNHUB_API_KEY", // API key จาก https://finnhub.io/
    base: "https://finnhub.io/api/v1"
  },
  TWELVE_DATA: {
    key: "YOUR_TWELVE_DATA_API_KEY", // API key จาก https://twelvedata.com/
    base: "https://api.twelvedata.com"
  }
};
```

## วิธีการทดสอบ

1. แทนที่ค่าในไฟล์ `index.html`
2. เปิดไฟล์ในเบราว์เซอร์
3. ตรวจสอบ Console (F12) ไม่มี error
4. ลองสมัครสมาชิกและเข้าสู่ระบบ
5. ลองค้นหาหุ้น เช่น "AAPL"