import { About } from "@/components/About";
import { Catalog } from "@/components/Catalog";
import { CategoryGrid } from "@/components/CategoryGrid";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CategoryGrid />
        <Catalog />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
