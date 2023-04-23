import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useFormik } from "formik"
import { motion } from "framer-motion"

// Libs
import { signupValidate } from "@/libs/formik/auth/formvalidate"

// Css
import styles from '@styles/auth/form.module.css'

// Animations
const variants = {
  initial: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 }
}

export default function SignupForm() {
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      username: '',
      email:'',
      password: '',
      cpassword: '',
      nombre: '',
      apellido:'',
      telefono: ''
    },
    validate: signupValidate,
    onSubmit
  })

  interface Values {
    username: string,
    email: string,
    password: string,
    cpassword: string,
    nombre: string,
    apellido: string,
    telefono: string
  }

  async function onSubmit(values: Values) {
    const {
      username,
      email,
      password,
      nombre,
      apellido,
      telefono
    } = values

    try {
      const res = await fetch('/api/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          email,
          password,
          nombre,
          apellido,
          telefono
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message)
      }

      alert('Registrado exitosamente')

      router.push('/auth/login')
    } catch (error) {
      alert(error)
    }
  }

  const inputs = {
    user: [
      {
        name: 'username',
        type: 'text',
        placeholder: 'Usuario',
        image: '/images/user.svg',
        errors: formik.errors.username
      },
      {
        name: 'email',
        type:'text',
        placeholder: 'Email',
        image: '/images/arroba.svg',
        errors: formik.errors.email
      },
      {
        name: 'password',
        type:'password',
        placeholder: 'Contraseña',
        image: '/images/lock.svg',
        errors: formik.errors.password
      },
      {
        name: 'cpassword',
        type:'password',
        placeholder: 'Confirmá tu contraseña',
        image: '/images/lock.svg',
        errors: formik.errors.cpassword
      },

    ],
    paciente: [
      {
        name: 'nombre',
        type: 'text',
        placeholder: 'Nombre',
        image: '/images/user.svg',
        errors: formik.errors.nombre
      },
      {
        name: 'apellido',
        type: 'text',
        placeholder: 'Apellido',
        image: '/images/user.svg',
        errors: formik.errors.apellido
      },
      {
        name: 'telefono',
        type: 'text',
        placeholder: 'Teléfono',
        image: '/images/phone.svg',
        errors: formik.errors.telefono
      },
    ]
  }

  return (
    <div className={styles.auth}>
      <motion.form
        onSubmit={formik.handleSubmit}
        className={`flex_container ${styles.form}`}
        variants={variants}
        initial='initial'
        animate='visible'
        exit='exit'
      >
        <span className={styles.title}>Registrate</span>

        <span className={styles.subtitle}>Datos del Usuario</span>

        {inputs.user.map((e, index) => (
          <label key={index} className={styles.input_label}>
            <input
              type={e.type}
              placeholder=' '
              className={`
                ${styles.input}
                ${e.errors ? styles.error : null}
              `}
              {...formik.getFieldProps(e.name)}
            />
            <span className={styles.input_span}>{e.placeholder}</span>
            <Image
              src={e.image}
              alt='Icon'
              width={25}
              height={25}
              className={styles.image}
            />
            {e.errors ? <span className={styles.error_span}>{e.errors}</span> : null}
          </label>
        ))}

        <span className={styles.subtitle}>Datos del Paciente</span>

        {inputs.paciente.map((e, index) => (
          <label key={index} className={styles.input_label}>
            <input
              type={e.type}
              placeholder=' '
              className={`
                ${styles.input}
                ${e.errors ? styles.error : null}
              `}
              {...formik.getFieldProps(e.name)}
            />
            <span className={styles.input_span}>{e.placeholder}</span>
            <Image
              src={e.image}
              alt='Icon'
              width={25}
              height={25}
              className={styles.image}
            />
            {e.errors ? <span className={styles.error_span}>{e.errors}</span> : null}
          </label>
        ))}

        <button type='submit' className={styles.button}>
          Registrarme
        </button>

        <span className={styles.subtitle}>Ya tienes una cuenta?</span>

        <Link href={'/auth/login'} className={styles.button}>
          Inicia Sesion
        </Link>
      </motion.form>
    </div>
  )
}
