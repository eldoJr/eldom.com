import Hero from "@/components/sections/homehero";
import Work from "@/components/sections/homework";
import Experience from "@/components/sections/homeexperience";
import About from "@/components/sections/homeabout";

export default function page() {
  return (
    <main>
      <Hero />
      <Work />
      <Experience />
      <About />
    </main>
  );
}
