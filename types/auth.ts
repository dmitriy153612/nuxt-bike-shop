export interface ILogin {
  email: string
  password: string
}

export interface IRegistration extends ILogin {
  passwordConfirm: string
}

export interface IRegistration extends ILogin {
  passwordConfirm: string
}

export interface IUser {
  token: string
  cartAmount: number
}

export interface IAuthError {
  status: number
  data: string
}

export function isIAuthError(err: unknown): err is IAuthError {
  return err instanceof Error && 'status' in err && 'data' in err
}
