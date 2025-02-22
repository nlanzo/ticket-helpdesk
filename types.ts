export type Ticket = {
  id: number
  title: string
  description: string
  status: 'new' | 'open' | 'closed'
  created_at: string
  user_id: string
}

export type User = {
  id: string
  email: string
  created_at: string
}
