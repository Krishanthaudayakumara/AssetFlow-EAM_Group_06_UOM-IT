export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string | null;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    hireDate: string;
    jobTitle: string | null;
    departmentId: number;
    department: string | null;
    userId: string;
    user: string | null;
  }