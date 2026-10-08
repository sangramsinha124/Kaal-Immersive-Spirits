import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Ingredients from "@/components/sections/Ingredients";
import Distillery from "@/components/sections/Distillery";
import Product from "@/components/sections/Product";
import Cocktails from "@/components/sections/Cocktails";
import Story from "@/components/sections/Story";
import Footer from "@/components/sections/Footer";
import Navbar from "@/components/navigation/Navbar";
// import Craft from "@/components/sections/Craft";

export default function Home() {
  return (
    <main className="min-w-0 overflow-x-clip bg-black">
      <Navbar />
      <Hero />

      <Manifesto />

      <Ingredients />

      <Distillery />

      <Product />

      <Cocktails />

      {/* <Craft /> */}

      <Story />

      <Footer />
    </main>
  );
}
