// types.ts

import { UserRole } from "./enum";

export interface Employee {
  name: any;
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
    lastAccess: string;
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
  condition: string;
  warrantyExpiration: string;
  imageUrl: string;
  stock: {
    id: number;
    name: string;
    arrivalDate: string;
    supplierId: number;
    supplierName: string;
    imageUrl: string;
  };
}


export interface EditAsset {
  id: number;
  name: string;
  description: string;
  stockId: number;
  status: string;
  condition: string;
  warrantyExpiration: string;
  image: File | null; 
}

export interface DeleteAsset {
  id: number;
  name: string;
}

export interface ExternalWorker {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  dateOfBirth: string;
  hireDate: string;
  jobTitle: string;
  departmentId: number;
}
