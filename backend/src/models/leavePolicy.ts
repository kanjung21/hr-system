import { Schema, model, Document } from 'mongoose';

export interface ILeavePolicy extends Document {
  name: string;
  employmentType: string;
  leaveType: string;
  annualDays: number;
  prorate: boolean;
  createdBy?: string;
  createdAt: Date;
}

const LeavePolicySchema = new Schema<ILeavePolicy>({
  name: { type: String, required: true },
  employmentType: { type: String, required: true },
  leaveType: { type: String, required: true },
  annualDays: { type: Number, required: true },
  prorate: { type: Boolean, default: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export const LeavePolicyModel = model<ILeavePolicy>('LeavePolicy', LeavePolicySchema);
