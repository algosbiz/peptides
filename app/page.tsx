import { Hero } from "@/components/home/hero";
import { Ticker } from "@/components/home/ticker";
import { Catalogue } from "@/components/home/catalogue";
import { Assurance } from "@/components/home/assurance";
import { Pass } from "@/components/home/pass";
import { Principles } from "@/components/home/principles";
import { Reviews } from "@/components/home/reviews";
import { Questions } from "@/components/home/questions";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <Catalogue />
      <Assurance />
      <Pass />
      <Principles />
      <Reviews />
      <Questions />
    </>
  );
}
