interface Values {
  username: string,
  password: string,
  cpassword?: string
}

export function loginValidate(values: Values) {
  const errors: Partial<Values> = {}

  if(!values.username) {
    errors.username = 'Campo obligatorio'
  } else if (values.username.length < 8 || values.username.length > 20) {
    errors.username = 'Usuario invalido'
  }

  if(!values.password) {
    errors.password = 'Campo obligatorio'
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = 'Contraseña invalida'
  }

  return errors
}

export function signupValidate(values: Values) {
  const errors: Partial<Values> = {}

  if(!values.username) {
    errors.username = 'Campo obligatorio'
  } else if (values.username.length < 8 || values.username.length > 20) {
    errors.username = 'Usuario invalido'
  }

  if(!values.password) {
    errors.password = 'Campo obligatorio'
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = 'Contraseña invalida'
  }

  if(!values.cpassword) {
    errors.cpassword = 'Campo obligatorio'
  } else if (values.password !== values.cpassword) {
    errors.cpassword = 'No coinciden'
  }

  return errors
}
