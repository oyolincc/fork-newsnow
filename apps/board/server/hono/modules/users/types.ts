export type UserResponse = {
  id: string
  type: 'github'
  profile: { name: string; avatar: string }
  email: string | null
}
