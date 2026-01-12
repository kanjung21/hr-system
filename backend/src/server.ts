import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';

import authRoutes from './routes/auth';
import employeeRoutes from './routes/employeeRoutes';
import leaveRoutes from './routes/leaveRoutes';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/hrdb';
mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => { console.error(err); process.exit(1); });

// Ensure upload dir
const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
app.use('/uploads', express.static(uploadDir));

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/leaves', leaveRoutes);

app.get('/api/health', (req, res) => res.json({ ok: true, time: new Date() }));

const port = Number(process.env.PORT) || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
