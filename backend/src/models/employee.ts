import { Schema, model, Document } from 'mongoose';

export type EmploymentType = 'PERMANENT' | 'CONTRACT' | 'PARTTIME' | 'TRAINEE';

export interface IEmployee extends Document {
  employeeCode: string;
  prefix?: string;
  firstName: string;
  lastName: string;
  nationalId?: string;
  birthDate?: Date;
  gender?: string;
  phone?: string;
  email?: string;
  address?: string;
  position?: string;
  department?: string;
  managerEmployeeId?: string | null;
  employmentType: EmploymentType;
  startDate?: Date;
  status: 'ACTIVE' | 'RESIGNED' | 'SUSPENDED';
  createdAt: Date;
  updatedAt: Date;
}

const EmployeeSchema = new Schema<IEmployee>({
  employeeCode: { type: String, required: true, unique: true },
  prefix: String,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  nationalId: String,
  birthDate: Date,
  gender: String,
  phone: String,
  email: String,
  address: String,
  position: String,
  department: String,
  managerEmployeeId: { type: Schema.Types.ObjectId, ref: 'Employee', default: null },
  employmentType: { type: String, required: true, default: 'PERMANENT' },
  startDate: Date,
  status: { type: String, default: 'ACTIVE' }
}, { timestamps: true });

export const EmployeeModel = model<IEmployee>('Employee', EmployeeSchema);
