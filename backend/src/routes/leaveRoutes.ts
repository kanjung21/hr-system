import express from 'express';
import { LeaveRequestModel } from '../models/leaveRequest';
import { EmployeeModel } from '../models/employee';
import { LeavePolicyModel } from '../models/leavePolicy';
import { calculateLeaveEntitlement } from '../services/calculateLeave';

const router = express.Router();

router.post('/', async (req, res) => {
  const { employeeId, leaveType, startDate, endDate, reason } = req.body;
  const employee = await EmployeeModel.findById(employeeId);
  if (!employee) return res.status(400).json({ error: 'Employee not found' });

  const policy = await LeavePolicyModel.findOne({ employmentType: employee.employmentType, leaveType });
  const year = new Date(startDate).getFullYear();
  const entitlement = calculateLeaveEntitlement({ startDate: employee.startDate?.toISOString() || new Date().toISOString(), employmentType: employee.employmentType }, leaveType, year, { annualDays: policy?.annualDays || 0, prorate: policy?.prorate ?? true });

  // naive days calc (inclusive)
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.round((end.getTime() - start.getTime()) / (24*60*60*1000)) + 1;

  const lr = await LeaveRequestModel.create({ employeeId, leaveType, startDate, endDate, days, reason, status: 'PENDING' });
  res.status(201).json({ leaveRequest: lr, entitlement });
});

export default router;
