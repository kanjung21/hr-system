import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user';
import { sendAdminCredentialEmail } from '../services/emailService';

dotenv.config();

async function main() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://mongo:27017/hrdb';
  await mongoose.connect(mongoUri);
  const email = process.argv[2] || process.env.ADMIN_EMAIL;
  if (!email) {
    console.error('Usage: npm run create-admin -- <email> or set ADMIN_EMAIL env');
    process.exit(1);
  }
  const password = process.argv[3] || generateRandomPassword(Number(process.env.ADMIN_INITIAL_PASSWORD_LENGTH) || 12);
  const hash = await bcrypt.hash(password, 10);
  const existing = await UserModel.findOne({ email });
  if (existing) {
    console.log('User already exists:', email);
    process.exit(0);
  }
  const user = await UserModel.create({ email, passwordHash: hash, roles: ['ADMIN'] });
  console.log('Created admin user:', user.email);
  try {
    await sendAdminCredentialEmail(email, password);
    console.log('Sent email to', email);
  } catch (err) {
    console.warn('Could not send email automatically. SMTP may be unconfigured. Password:', password);
  }
  process.exit(0);
}

function generateRandomPassword(len: number) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
  let out = '';
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

main().catch(err => { console.error(err); process.exit(1); });
