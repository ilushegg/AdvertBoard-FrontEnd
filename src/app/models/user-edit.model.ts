export interface UserEdit {
  id: string,
  name: string | null,
  mobile: string | null,
  email: string | null,
  oldPassword: string | null,
  newPassword: string | null
}