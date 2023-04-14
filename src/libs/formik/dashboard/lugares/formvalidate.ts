interface Values {
  ciudad: string,
  institucion: string,
  dia?: Date | string,
  comienzo?: string,
  final?: string,
  precio?: number
}

export function formValidate(values: Values) {
  const errors: Partial<Values> = {}

  if (!values.ciudad) {
    errors.ciudad = 'Campo obligatorio'
  } else if (!/^[a-zA-Z\u00C0-\u024F\s]+$/.test(values.ciudad)) {
    errors.ciudad = 'Solo se permiten letras y espacios'
  }

  if (!values.institucion) {
    errors.institucion = 'Campo obligatorio'
  } else if (!/^[a-zA-Z\u00C0-\u024F\s]+$/.test(values.institucion)) {
    errors.institucion = 'Solo se permiten letras y espacios'
  }

  if (values.dia) {
    const today = new Date()
    const selectedDate = new Date(values.dia)
    if (selectedDate < today || selectedDate.getMonth() !== today.getMonth()) {
      errors.dia = 'La fecha debe ser posterior al día de hoy y estar dentro del mes actual'
    }
  }

  return errors
}
