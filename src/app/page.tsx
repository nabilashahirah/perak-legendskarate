import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { About } from "@/components/sections/About";
import { Founder } from "@/components/sections/Founder";
import { Programmes } from "@/components/sections/Programmes";
import { HallOfFame } from "@/components/sections/HallOfFame";
import { Coaches } from "@/components/sections/Coaches";
import { FinalCta } from "@/components/sections/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Founder />
      <Programmes />
      <HallOfFame />
      <Coaches />
      <FinalCta />
    </>
  );
}
