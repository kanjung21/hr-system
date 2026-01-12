# HR System Starter (React + Node + MongoDB)

โครงงาน starter สำหรับระบบ HR (Employee Management + Leave & Approval)
- Backend: Node.js + Express + TypeScript + Mongoose
- Frontend: React + TypeScript (skeleton)
- Database: MongoDB (docker-compose ให้ใน repo)
- Auth: Email/Password (Admin สร้างบัญชี), เตรียม hook สำหรับ Azure AD SSO

การรันท้องถิ่น (ตัวอย่าง):
1. สร้างไฟล์ `.env` ในโฟลเดอร์ `backend` โดยคัดลอกจาก `.env.example` และใส่ค่า SMTP ถ้าต้องการให้ระบบส่งอีเมล
2. รัน:
   - docker compose up -d
   - cd backend && npm install && npm run dev
   - cd frontend && npm install && npm start

สร้างบัญชี Admin และส่งรหัสผ่านผ่าน SMTP:
- ตั้งค่า SMTP ใน `backend/.env`
- รัน `cd backend && npm run create-admin -- kan@tlogical.com`

หมายเหตุ:
- ระบบนี้เป็น starter kit. ต้องเพิ่มการตรวจสอบสิทธิ์ (RBAC), validation, และ UI pages ตาม requirement ที่ตกลง
