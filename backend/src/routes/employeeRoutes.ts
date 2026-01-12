import express from 'express';
import { EmployeeModel } from '../models/employee';

const router = express.Router();

router.get('/', async (req, res) => {
  const { department, status } = req.query;
  const filter: any = {};
  if (department) filter.department = department;
  if (status) filter.status = status;
  const list = await EmployeeModel.find(filter).limit(200);
  res.json(list);
});

router.post('/', async (req, res) => {
  // create employee (HR/Admin)
  const data = req.body;
  const emp = await EmployeeModel.create(data);
  res.status(201).json(emp);
});

export default router;
