import Hero from "../components/home/hero";
import Activities from "../components/home/Activity/Activities";
import About from "../components/home/About";
import Facilities from "../components/home/Facility/Facilities";
import Events from "../components/home/Events/Events";

export default function Home() {
  return(
  <main>
    
    <Hero />
    <Activities />
    <About />
    <Facilities />
    <Events />

  </main>
  );
}
