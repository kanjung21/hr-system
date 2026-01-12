import nodemailer from 'nodemailer';

export async function sendAdminCredentialEmail(to: string, password: string) {
  const host = process.env.SMTP_HOST;
  if (!host) throw new Error('SMTP not configured');
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  const from = process.env.FROM_EMAIL || 'hr@example.com';
  await transporter.sendMail({
    from,
    to,
    subject: 'บัญชีผู้ใช้ระบบ HR - ข้อมูลเข้าสู่ระบบ',
    text: `ทดสอบระบบ: บัญชีของคุณถูกสร้าง\nEmail: ${to}\nPassword: ${password}\nกรุณาเปลี่ยนรหัสผ่านทันทีเมื่อเข้าใช้งานครั้งแรก`
  });
}
