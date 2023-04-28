import Link from 'next/link'
import Image from 'next/image'

// Css
import styles from '@styles/home/Hero.module.css'

export default function Hero() {
  return (
    <div className={`flex_container ${styles.hero}`}>
      <div className={styles.title_container}>
        <span className={styles.title}>
          Dr Dario
          <br />
          Ledesma
        </span>

        <span className={styles.subtitle}>
          NEURÓLOGO INFANTOJUVENIL
        </span>

      </div>

      <div className={styles.buttons_container}>
        <Link href={'#'} className={styles.button} draggable='false'>
          TURNOS
        </Link>
        <Link href={'#'} className={styles.button} draggable='false'>
          PREGUNTAS
        </Link>
      </div>

      <div className={`flex_container ${styles.scroll}`}>
        <span className={styles.scroll_span}>SCROLL PARA MÁS INFORMACIÓN</span>
        <div className={styles.arrows}>
          <Image
            src='/images/arrow.svg'
            alt='arrow'
            width={30}
            height={30}
            className={styles.arrow}
          />
          <Image
            src='/images/arrow.svg'
            alt='arrow'
            width={30}
            height={30}
            className={styles.arrow2}
          />
          <Image
            src='/images/arrow.svg'
            alt='arrow'
            width={30}
            height={30}
            className={styles.arrow3}
          />
        </div>
      </div>
    </div>
  )
}
