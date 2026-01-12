import { differenceInCalendarDays } from 'date-fns';

export interface EmployeeForCalc {
  startDate: string; // ISO
  employmentType: string;
}

export interface Policy {
  annualDays: number;
  prorate: boolean;
}

export function calculateLeaveEntitlement(employee: EmployeeForCalc, leaveType: string, year: number, policy: Policy): number {
  if (policy.annualDays === 0) return 0;

  const nonProrate = ['MATERNITY', 'PATERNITY'];
  if (nonProrate.includes(leaveType)) {
    return policy.annualDays;
  }

  if (!policy.prorate) {
    return policy.annualDays;
  }

  const jan1 = new Date(Date.UTC(year, 0, 1));
  const dec31 = new Date(Date.UTC(year, 11, 31));
  const empStart = new Date(employee.startDate);

  const startDate = empStart > jan1 ? empStart : jan1;
  const workedDays = differenceInCalendarDays(dec31, startDate) + 1;
  const entitledRaw = (policy.annualDays / 365) * workedDays;
  const entitled = Math.floor(entitledRaw * 2) / 2;
  return Math.max(0, Math.round(entitled * 100) / 100);
}
