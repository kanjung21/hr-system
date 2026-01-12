import { Schema, model, Document } from 'mongoose';

export type Role = 'ADMIN' | 'HR' | 'MANAGER' | 'EMPLOYEE';

export interface IUser extends Document {
  email: string;
  passwordHash?: string;
  roles: Role[];
  employeeId?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String },
  roles: { type: [String], default: ['EMPLOYEE'] },
  employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', default: null },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export const UserModel = model<IUser>('User', UserSchema);
