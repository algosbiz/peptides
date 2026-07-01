import { Hero } from "@/components/home/hero";
import { Ticker } from "@/components/home/ticker";
import { Stats } from "@/components/home/stats";
import { Catalogue } from "@/components/home/catalogue";
import { Assurance } from "@/components/home/assurance";
import { Pass } from "@/components/home/pass";
import { Principles } from "@/components/home/principles";
import { Voices } from "@/components/home/voices";
import { Questions } from "@/components/home/questions";
import { Account } from "@/components/home/account";
import { Newsletter } from "@/components/home/newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <Stats />
      <Catalogue />
      <Pass />
      <Assurance />
      <Principles />
      <Voices />
      <Questions />
      <Account />
      <Newsletter />
    </>
  );
}
