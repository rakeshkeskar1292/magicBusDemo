// Common type definitions
export interface Customer {
  id: number
  name: string
  email: string
  status: 'Active' | 'Inactive'
  purchases: number
}

export interface DashboardStats {
  totalCustomers: number
  revenue: number
  orders: number
  growth: number
}
