export interface User {
  id: string;
  email: string;
}

export interface Analytics {
  id: string;
  user_id: string;
  revenue: number;
  users: number;
  sales: number;
  created_at: string;
}