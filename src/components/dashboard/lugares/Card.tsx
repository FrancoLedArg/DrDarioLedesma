import { motion } from 'framer-motion'

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

function Card({ data }: { data: LugaresDeAtencion }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className={styles.card}
    >
      <span className={styles.card_title}>
        {data.ciudad}
        <span className={styles.card_subtitle}>( {data.institucion} )</span>
      </span>

      {data.dia ?
        <span>Día de atención</span>
        :
        <span>No se asigno ningun día de atención</span>
      }

      {data.comienzo || data.final ?
        <span>De {data.comienzo} a {data.final}</span>
        :
        <span>No se asigno ningun horario de atención</span>
      }

      {data.precio ?
        <span>Precio de la consulta: ${data.precio}</span>
        :
        <span>No se asigno ningun precio a la consulta</span>
      }
    </motion.div>
  )
}

export default Card
