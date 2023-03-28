import Image from 'next/image'

// Css
import styles from '@styles/home/Locations.module.css'

const locations = [
  {
    city: 'Frías',
    adress: 'CEMEP | MITRE Y GENERAL PAZ'
  },
  {
    city: 'Santiago del Estero (Capital)',
    adress: 'AZAHARES | MITRE 279'
  },
  {
    city: 'Añatuya',
    adress: 'CLINICA MAYO'
  },
  {
    city: 'Quimilí',
    adress: 'CLINICA SOR ANGELA'
  },
  {
    city: 'Colonia Dora',
    adress: 'CONSULTORIOS DR. RODRIGUEZ'
  },
  {
    city: 'Juríes',
    adress: 'CENTRO MEDICO MEDIFAN'
  }
]

export default function Locations() {
  return (
    <div className={`flex_container ${styles.locations}`}>
      <h1>Lugares de atención</h1>
      <div className={styles.locations_container}>
        {locations.map((e, index) => (
          <div key={index} className={`flex_container`}>
            <Image
              src='/images/location.svg'
              alt='image'
              width={50}
              height={50}
              className={styles.image}
            />
            <h2 className={styles.city}>{e.city}</h2>
            <h3>{e.adress}</h3>
          </div>
        ))}
      </div>
      <h3>POR FECHAS Y HORARIOS EN EL INTERIOR, CONSULTAR EN EL APARTADO DE TURNOS</h3>
    </div>
  )
}
