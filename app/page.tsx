import { About } from "@/components/About";
import { BottomNav } from "@/components/BottomNav";
import { Catalog } from "@/components/Catalog";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { StoreLocation } from "@/components/StoreLocation";
import { getProducts } from "@/lib/products-db";

export const revalidate = 60;

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <Header />
      <main className="pb-24 md:pb-0">
        <Hero />
        <Catalog products={products} />
        <About />
        <StoreLocation />
        <Contact />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
