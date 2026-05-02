# RuayHun AI - ระบบวิเคราะห์หุ้นอัจฉริยะ

เว็บแอปวิเคราะห์หุ้นครบครันด้วยข้อมูลจริงจาก API หุ้นชั้นนำ

## ⚠️ ขั้นตอนการตั้งค่าที่จำเป็นก่อนใช้งาน

### ✅ 1. Firebase Firestore (Config ตั้งค่าเรียบร้อยแล้ว)

Firebase Config ได้ตั้งค่าแล้ว แต่ยังต้องเปิดใช้งาน Firestore Database และตั้ง Rules:

1. ไปที่ [Firebase Console](https://console.firebase.google.com/)
2. เลือกโปรเจกต์ `app-rm-ruay-hun` ที่ได้สร้างไว้
3. **เปิดใช้งาน Firestore Database:**
   - ไป Firestore Database > Create database
   - เลือก **Start in test mode**
   - ตัวเลือก Rules ให้เป็น test mode ดังนี้:
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
   - Publish Rules

### 2. ตั้งค่า API Keys สำหรับข้อมูลหุ้น (จำเป็นสำหรับข้อมูลจริง)
✅ **Alpha Vantage API Key**: ตั้งค่าเรียบร้อยแล้ว (VA4YH1MQD8QPT99U)

เลือก API เพิ่มเติมหากต้องการ (ไม่บังคับ):

#### Alpha Vantage (แนะนำ - ฟรี 500 calls/วัน)
- **เว็บไซต์**: https://www.alphavantage.co/support/#api-key
- **ขั้นตอน**: สมัคร → รับ API Key → แทนที่ `YOUR_ALPHA_VANTAGE_API_KEY` ในไฟล์
- **ข้อดี**: ฟรี ใช้งานง่าย

#### Finnhub (ฟรี 60 calls/นาที)
- **เว็บไซต์**: https://finnhub.io/
- **ขั้นตอน**: สมัคร → รับ API Key → แทนที่ `YOUR_FINNHUB_API_KEY` ในไฟล์
- **ข้อดี**: อัปเดตข้อมูลรวดเร็ว

#### Twelve Data (ฟรี 800 calls/วัน)
- **เว็บไซต์**: https://twelvedata.com/
- **ขั้นตอน**: สมัคร → รับ API Key → แทนที่ `YOUR_TWELVE_DATA_API_KEY` ในไฟล์
- **ข้อดี**: ข้อมูลครบถ้วน

### 3. ทดสอบการทำงาน
1. เปิดไฟล์ `index.html` ในเว็บเบราว์เซอร์
2. ลองสมัครสมาชิกใหม่
3. ลองเข้าสู่ระบบ
4. ลองค้นหาหุ้น (เช่น AAPL, TSLA)

### 3. ทดสอบการทำงาน

#### 🔑 Default Test Credentials (ทำงานโดยไม่ต้องตั้งค่า Firestore)
**ใช้สำหรับการทดสอบระบบ:**
- **ชื่อผู้ใช้**: ket
- **รหัสผ่าน**: admin1234
- **บทบาท**: Admin (VIP)

#### ขั้นตอนการทดสอบ:
1. เปิดไฟล์ `index.html` ในเบราว์เซอร์
2. คลิก "เข้าสู่ระบบ"
3. กรอก: ket / admin1234
4. คลิก "เข้าสู่ระบบ"
5. ลองค้นหาหุ้น เช่น AAPL หรือ TSLA

> 💡 **ถ้าเห็นข้อความ "(Test Mode)"** = Firestore ยังไม่ได้เปิดใช้งาน แต่ระบบก็ใช้งานได้ชั่วคราว

#### สำหรับการ production:
เมื่อต่อ Firestore Firestore ให้สร้างผู้ใช้เพิ่มเติมผ่าน Admin Panel

## ✨ คุณสมบัติ

- 📊 **ข้อมูลหุ้นจริง** - ดึงข้อมูลจาก Alpha Vantage, Finnhub, หรือ Twelve Data
- 🤖 **AI วิเคราะห์หุ้น** - คำนวณ RSI, MACD, EMA และแนวรับ/ต้าน
- 📈 **กราฟราคา** - แสดงกราฟแท่งเทียนและเส้นราคา
- 💼 **พอร์ตลงทุน** - จัดการและติดตามผลการลงทุน
- ❤️ **หุ้นโปรด** - บันทึกหุ้นที่สนใจ
- 🚨 **แจ้งเตือนราคา** - ตั้งราคาเป้าหมายและรับการแจ้งเตือน
- 📰 **ข่าวหุ้น** - อัปเดตข่าวสารตลาดหุ้น
- 👑 **ระบบ VIP** - ฟีเจอร์พิเศษสำหรับสมาชิก VIP
- 🛡️ **ระบบแอดมิน** - จัดการผู้ใช้และระบบ

## 🚀 การติดตั้งและใช้งาน

### 1. เตรียมไฟล์
- วางไฟล์ `index.html` ในโฟลเดอร์ที่ต้องการ

### 2. ตั้งค่า API Keys
แก้ไขส่วน `API_CONFIG` ในไฟล์ `index.html`:

```javascript
const API_CONFIG = {
  ALPHA_VANTAGE: {
    key: "YOUR_ALPHA_VANTAGE_API_KEY", // ใส่ API Key ที่ได้จาก https://www.alphavantage.co/
  },
  FINNHUB: {
    key: "YOUR_FINNHUB_API_KEY", // ใส่ API Key ที่ได้จาก https://finnhub.io/
  },
  TWELVE_DATA: {
    key: "YOUR_TWELVE_DATA_API_KEY", // ใส่ API Key ที่ได้จาก https://twelvedata.com/
  }
};
```

### 3. เลือก API ที่ต้องการใช้
แก้ไขตัวแปร `ACTIVE_API`:
```javascript
const ACTIVE_API = "ALPHA_VANTAGE"; // หรือ "FINNHUB" หรือ "TWELVE_DATA"
```

### 4. เปิดใช้งาน
- เปิดไฟล์ `index.html` ในเว็บเบราว์เซอร์
- หรือ deploy ขึ้น Vercel, Netlify, หรือ GitHub Pages

## 🔑 API Keys ที่จำเป็น

### Alpha Vantage (แนะนำ)
- **เว็บไซต์**: https://www.alphavantage.co/support/#api-key
- **ราคา**: ฟรี 500 calls/วัน
- **วิธีใช้**: สมัคร → รับ API Key → แทนที่ในโค้ด

### Finnhub
- **เว็บไซต์**: https://finnhub.io/
- **ราคา**: ฟรี 60 calls/นาที
- **วิธีใช้**: สมัคร → รับ API Key → แทนที่ในโค้ด

### Twelve Data
- **เว็บไซต์**: https://twelvedata.com/
- **ราคา**: ฟรี 800 calls/วัน
- **วิธีใช้**: สมัคร → รับ API Key → แทนที่ในโค้ด

## 📱 การใช้งาน

### สมัครสมาชิก
1. คลิก "สมัครสมาชิก"
2. กรอกข้อมูลให้ครบถ้วน
3. เข้าสู่ระบบด้วยชื่อผู้ใช้และรหัสผ่าน

### ค้นหาหุ้น
1. พิมพ์ชื่อหุ้นในช่องค้นหา (เช่น AAPL, TSLA, PTT)
2. กด Enter หรือคลิกค้นหา
3. ดูข้อมูลราคา กราฟ และการวิเคราะห์ AI

### จัดการพอร์ต
1. เข้าสู่ระบบแล้วไปที่เมนู "พอร์ต"
2. คลิก "เพิ่มหุ้นในพอร์ต"
3. กรอกชื่อหุ้น จำนวน และราคาซื้อ
4. ติดตามผลการลงทุนแบบเรียลไทม์

### ตั้งแจ้งเตือน
1. ในหน้า Dashboard คลิก "การแจ้งเตือนราคา"
2. กรอกชื่อหุ้นและราคาเป้าหมาย
3. ระบบจะแจ้งเตือนเมื่อราคาถึงระดับที่กำหนด

## 🔒 ความปลอดภัย

- ใช้ Firebase Firestore สำหรับจัดเก็บข้อมูล
- เข้ารหัสรหัสผ่าน
- ตรวจสอบข้อมูล input
- ระบบแอดมินสำหรับจัดการผู้ใช้

## 🚀 Deploy

### Vercel (แนะนำ)
1. สร้างบัญชี Vercel
2. Import โปรเจกจาก GitHub
3. Deploy อัตโนมัติ

### Netlify
1. สร้างบัญชี Netlify
2. Drag & Drop ไฟล์ `index.html`
3. Deploy เสร็จสิ้น

### GitHub Pages
1. Upload ไฟล์ขึ้น GitHub
2. ไป Settings → Pages
3. เลือก Branch และโฟลเดอร์
4. Deploy

## 🔧 การแก้ปัญหา

### ❌ ไม่สามารถเข้าสู่ระบบได้
**สาเหตุ**: Firestore Rules ไม่ถูกต้องหรือ Firestore Database ยังไม่ได้เปิดใช้งาน
**วิธีแก้**:
1. ตรวจสอบว่าได้เปิดใช้งาน Firestore Database ใน Firebase Console
2. ตรวจสอบ Firestore Rules ให้เป็น test mode (อนุญาตการอ่าน/เขียน)
3. ดู Console (F12) ตรวจสอบ error message

### ❌ ไม่มีข้อมูลหุ้นแสดง
**สาเหตุ**: Alpha Vantage API ไม่ตอบสนองหรือการเรียก API มีปัญหา
**วิธีแก้**:
1. ตรวจสอบว่า API key `VA4YH1MQD8QPT99U` ถูกต้อง
2. ดู Console (F12) ตรวจสอบ error message
3. ลองค้นหาหุ้นต่างออกไป (เช่น AAPL, TSLA, MSFT)
4. รอ 1 นาทีถ้าเกินจำนวน calls/นาที

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