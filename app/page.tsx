import { About } from "@/components/About";
import { BottomNav } from "@/components/BottomNav";
import { Catalog } from "@/components/Catalog";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { StoreLocation } from "@/components/StoreLocation";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pb-24 md:pb-0">
        <Hero />
        <Catalog />
        <About />
        <StoreLocation />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
