// types.ts

import { UserRole } from "./enum";

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  hireDate: string;
  jobTitle: string;
  departmentId: number;
  userName: string;
  password: string;
  department?: string;
  user?: string;
}

export interface Department {
  id: number;
  name: string;
  description: string;
}

export interface Supplier {
  id?: number;
  name: string;
  address: string;
  contactNumber: string;
  email: string;
  notes: string;
}


export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    role: UserRole;
  }
  

export { UserRole };


export interface Stock {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  category: Category | null;
  subCategoryId: number;
  subCategory: SubCategory | null;
  supplierId: number;
  supplier: Supplier | null;
  imageUrl: string;
  arrivalDate: string;
  assets: Asset[] | null;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  assets: Asset[] | null;
}

export interface SubCategory {
  id: number;
  name: string;
  imageUrl: string;
  categoryId: number;
  category: Category | null;
  assets: Asset[] | null;
}



export interface Asset {
  id: number;
  name: string;
  description: string;
  barcode: string;
  stockId: number;
  status: string;
  warrantyExpiration: string;
  stock: Stock | null;
  imageUrl: string;
  facilityAsset: any;
}
