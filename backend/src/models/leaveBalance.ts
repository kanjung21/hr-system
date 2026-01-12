import { Schema, model, Document } from 'mongoose';

export interface ILeaveBalance extends Document {
  employeeId: string;
  leaveType: string;
  year: number;
  entitled: number;
  taken: number;
  remaining: number;
  policyVersionId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const LeaveBalanceSchema = new Schema<ILeaveBalance>({
  employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  leaveType: { type: String, required: true },
  year: { type: Number, required: true },
  entitled: { type: Number, required: true },
  taken: { type: Number, default: 0 },
  remaining: { type: Number, required: true },
  policyVersionId: { type: Schema.Types.ObjectId, default: null }
}, { timestamps: true });

LeaveBalanceSchema.index({ employeeId: 1, leaveType: 1, year: 1 }, { unique: true });

export const LeaveBalanceModel = model<ILeaveBalance>('LeaveBalance', LeaveBalanceSchema);
