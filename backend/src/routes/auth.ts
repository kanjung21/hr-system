import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user';
import { sendAdminCredentialEmail } from '../services/emailService';

const router = express.Router();

// Simple login (email/password)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user || !user.passwordHash) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ userId: user._id, roles: user.roles }, process.env.JWT_SECRET || 'secret', { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });
  res.json({ token });
});

// Admin endpoint to create user and send credentials via SMTP if configured
router.post('/admin/create-user', async (req, res) => {
  // Note: protect this endpoint with auth+role checks in production
  const { email, roles = ['EMPLOYEE'], employeeId = null } = req.body;
  const randomPassword = req.body.password || generateRandomPassword(Number(process.env.ADMIN_INITIAL_PASSWORD_LENGTH) || 12);
  const hash = await bcrypt.hash(randomPassword, 10);
  const user = await UserModel.create({ email, passwordHash: hash, roles, employeeId });

  // attempt to send email (if SMTP config provided)
  try {
    await sendAdminCredentialEmail(email, randomPassword);
  } catch (err) {
    console.warn('Failed to send email (SMTP may be unconfigured):', err);
  }

  res.status(201).json({ user: { id: user._id, email: user.email, roles: user.roles } });
});

function generateRandomPassword(len: number) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
  let out = '';
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export default router;
