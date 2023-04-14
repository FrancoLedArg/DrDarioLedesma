import Image from "next/image"
import { useRouter } from 'next/router'
import { useFormik } from "formik"
import { motion } from 'framer-motion'

// Utils
import { formValidate } from "@/libs/formik/dashboard/lugares/formvalidate"

// Css
import styles from '@styles/dashboard/lugares.module.css'

interface LugaresDeAtencion {
  id: number,
  ciudad: string,
  institucion: string,
  dia?: Date,
  comienzo?: string,
  final?: string,
  precio?: number
}

export default function Form({ data }: { data: LugaresDeAtencion }) {
  const router = useRouter()
  const formik = useFormik<LugaresDeAtencion>({
    initialValues: {
      id: data.id,
      ciudad: data.ciudad,
      institucion: data.institucion,
      dia: data.dia,
      comienzo: data.comienzo,
      final: data.final,
      precio: data.precio,

    },
    validate: formValidate,
    onSubmit
  })

  async function onSubmit(values: LugaresDeAtencion) {
    try {
      const res = await fetch('/api/lugares/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error)
      }

      router.reload()

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <motion.form
      onSubmit={formik.handleSubmit}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className={styles.card}
    >
      <label className={styles.input_label}>
        <input
          type="text"
          placeholder={data.ciudad}
          className={`
            ${styles.input}
            ${formik.errors.ciudad ? styles.error : null}
          `}
          {...formik.getFieldProps('ciudad')}
          />
          <span className={styles.input_span}>Ciudad</span>
          <Image
            src={'/images/user.svg'}
            alt='Personaa'
            width={25}
            height={25}
            className={styles.image}
          />
          {formik.errors.ciudad ? <span className={styles.error_span}>{formik.errors.ciudad}</span> : null}
      </label>

      <label className={styles.input_label}>
        <input
          type="text"
          placeholder={data.institucion}
          className={`
            ${styles.input}
            ${formik.errors.institucion ? styles.error : null}
          `}
          {...formik.getFieldProps('institucion')}
        />
        <span className={styles.input_span}>Institución</span>
          <Image
            src={'/images/user.svg'}
            alt='Personaa'
            width={25}
            height={25}
            className={styles.image}
          />
          {formik.errors.institucion ? <span className={styles.error_span}>{formik.errors.institucion}</span> : null}
      </label>

      <label className={styles.input_label}>
        <span>Día de atención:</span>
        <input
          type="date"
          className={`
            ${styles.input}
            ${formik.errors.dia ? styles.error : null}
          `}
          {...formik.getFieldProps('dia')}
          />
        {formik.errors.dia? <span className={styles.error_span}>{formik.errors.dia}</span> : null}
      </label>

      <label className={styles.input_label}>
        <input
          type="text"
          placeholder={data.comienzo}
          className={`
            ${styles.input}
            ${formik.errors.comienzo ? styles.error : null}
          `}
          {...formik.getFieldProps('comienzo')}
        />
        <span className={styles.input_span}>Comienzo de la jornada</span>
          <Image
            src={'/images/user.svg'}
            alt='Personaa'
            width={25}
            height={25}
            className={styles.image}
          />
        {formik.errors.comienzo? <span className={styles.error_span}>{formik.errors.comienzo}</span> : null}
      </label>

      <label className={styles.input_label}>
        <input
          type="text"
          placeholder={data.final}
          className={`
            ${styles.input}
            ${formik.errors.final ? styles.error : null}
          `}
          {...formik.getFieldProps('final')}
        />
        <span className={styles.input_span}>Final de la jornada</span>
          <Image
            src={'/images/user.svg'}
            alt='Personaa'
            width={25}
            height={25}
            className={styles.image}
          />
          {formik.errors.final ? <span className={styles.error_span}>{formik.errors.final}</span> : null}
      </label>

      <label className={styles.input_label}>
        <input
          type="number"
          placeholder={data.precio ? data.precio.toString() : 'No especificado'}
          className={`
            ${styles.input}
            ${formik.errors.precio ? styles.error : null}
          `}
          {...formik.getFieldProps('precio')}
        />
        <span className={styles.input_span}>Precio de la consulta</span>
          <Image
            src={'/images/user.svg'}
            alt='Personaa'
            width={25}
            height={25}
            className={styles.image}
          />
          {formik.errors.precio ? <span className={styles.error_span}>{formik.errors.precio}</span> : null}
      </label>

      <button type='submit'>
        Guardar cambios
      </button>
    </motion.form>
  )
}
