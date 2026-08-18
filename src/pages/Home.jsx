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