export function generateAuthError(error) {
  switch (message) {
    case INVALID_PASSWORD:
      return "Email или пароль введены не верно"
    case EMAIL_EXISTS:
      return "пользователь с таким email существует"
    default:
      return "слишком много попыток входа"
  }
}
