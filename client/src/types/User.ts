// types/User.ts

export interface User {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  location: string;
  profile_image?: string;
  created_at?: string;
}

export interface StoredUser {
  full_name?: string;
  email?: string;
  profile_image?: string;
}