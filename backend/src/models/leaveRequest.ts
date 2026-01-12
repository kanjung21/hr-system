import { Schema, model, Document } from 'mongoose';

export interface ILeaveRequest extends Document {
  employeeId: string;
  leaveType: string;
  startDate: Date;
  endDate: Date;
  days: number;
  reason?: string;
  attachmentIds?: string[];
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  submittedAt: Date;
  approvalFlow?: any;
  approvedAt?: Date | null;
  processedBy?: string | null;
}

const LeaveRequestSchema = new Schema<ILeaveRequest>({
  employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  leaveType: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  days: { type: Number, required: true },
  reason: String,
  attachmentIds: [{ type: Schema.Types.ObjectId, ref: 'Attachment' }],
  status: { type: String, default: 'PENDING' },
  approvalFlow: { type: Schema.Types.Mixed, default: {} },
  approvedAt: Date,
  processedBy: { type: Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true });

export const LeaveRequestModel = model<ILeaveRequest>('LeaveRequest', LeaveRequestSchema);
