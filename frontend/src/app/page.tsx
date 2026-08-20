import Hero from "../components/home/hero";
import Activities from "../components/home/Activity/Activities";
import About from "../components/home/About";
import Facilities from "../components/home/Facility/Facilities";
import Events from "../components/home/Events/Events";
import Gallery from "../components/home/Gallery/Gallery";
import Location from "../components/home/Location/Location";
import ContactCTA from "../components/home/ContactCTA/ContactCTA";

export default function Home() {
  return(
  <main>
    
    <Hero />
    <Activities />
    <About />
    <Facilities />
    <Events />'
    <Gallery />
    <Location />
    <ContactCTA />

  </main>
  );
}
