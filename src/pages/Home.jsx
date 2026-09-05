import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Services from '../sections/Services';
import Toolbox from '../sections/Toolbox';
import Projects from '../sections/Projects';
import Testimonials from '../sections/Testimonials';
import Contact from '../sections/Contact';
import Footer from '../components/Footer';

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const id = location.state.scrollTo;
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location.state]);

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Toolbox />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;