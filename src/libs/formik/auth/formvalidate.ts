interface Values {
  username: string,
  email?: string,
  password: string,
  cpassword?: string,
  nombre?: string,
  apellido?: string,
  telefono?: string
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

  if (!values.username) {
    errors.username = 'Campo obligatorio'
  } else if (values.username.length < 8 || values.username.length > 20) {
    errors.username = 'Usuario invalido'
  }

  if (!values.email) {
    errors.email = 'Campo obligatorio'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Email invalido'
  }

  if (!values.password) {
    errors.password = 'Campo obligatorio'
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = 'Contraseña invalida'
  }

  if (!values.cpassword) {
    errors.cpassword = 'Campo obligatorio'
  } else if (values.password !== values.cpassword) {
    errors.cpassword = 'Las contaseñas no coinciden'
  }

  if(!values.nombre) {
    errors.nombre = 'Campo obligatorio'
  } else if (!/^[\p{L}a-zA-Z\s\u00C0-\u00FF]+$/.test(values.nombre)) {
    errors.nombre = 'Nombre invalido'
  }

  if(!values.apellido) {
    errors.apellido = 'Campo obligatorio'
  } else if (!/^[\p{L}a-zA-Z\s\u00C0-\u00FF]+$/.test(values.apellido)) {
    errors.apellido = 'Apellido invalido'
  }

  if (!values.telefono) {
    errors.telefono = 'Campo obligatorio'
  } else if (!/^\d+$/.test(values.telefono)) {
    errors.telefono = 'Solamente numeros'
  }

  return errors
}
