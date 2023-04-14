import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useFormik } from "formik"
import { motion } from "framer-motion"

// Layout
import Layout from '@/layout/auth/Layout'

// Libs
import { loginValidate } from "@/libs/formvalidate"

// Css
import styles from '@styles/auth/form.module.css'

// Animations
const variants = {
  initial: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 }
}

export default function LoginForm() {
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validate: loginValidate,
    onSubmit
  })

  interface Values {
    username: string,
    password: string
  }

  async function onSubmit(values: Values) {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error)
      }

      router.push('/turnos')

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout>
      <motion.form
        onSubmit={formik.handleSubmit}
        className={`flex_container ${styles.form}`}
        variants={variants}
        initial='initial'
        animate='visible'
        exit='exit'
      >
        <span className={styles.title}>Inicia Sesión</span>

        <label className={styles.input_label}>
          <input
            type='text'
            placeholder=' '
            className={`
              ${styles.input}
              ${formik.errors.username ? styles.error : null}
            `}
            {...formik.getFieldProps('username')}
          />
          <span className={styles.input_span}>Usuario</span>
          <Image
            src={'/images/user.svg'}
            alt='Personaa'
            width={25}
            height={25}
            className={styles.image}
          />
          {formik.errors.username ? <span className={styles.error_span}>{formik.errors.username}</span> : null}
        </label>

        <label className={styles.input_label}>
          <input
            type='password'
            placeholder=' '
            className={`
              ${styles.input}
              ${formik.errors.password ? styles.error : null}
            `}
            {...formik.getFieldProps('password')}
          />
          <span className={styles.input_span}>Contraseña</span>
          <Image
            src={'/images/lock.svg'}
            alt='Candado'
            width={25}
            height={25}
            className={styles.image}
          />
          {formik.errors.password ? <span className={styles.error_span}>{formik.errors.password}</span> : null}
        </label>

        <button type='submit' className={styles.button}>
          Iniciar Sesion
        </button>

        <span>NO TIENES UNA CUENTA?</span>

        <Link href={'/auth/signup'} className={styles.button}>
          Registrate
        </Link>
      </motion.form>
    </Layout>
  )
}
