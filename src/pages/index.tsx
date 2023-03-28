// Layout
import Layout from '@/layout/Home'

// Components
import Hero from '@/components/home/Hero'
import About from '@/components/home/About'
import Locations from '@/components/home/Locations'
import FAQ from '@/components/home/FAQ'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Locations/>
      <FAQ />
    </>
  )
}

Home.PageLayout = Layout
