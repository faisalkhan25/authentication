import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <HeroSection />
    </div>
  );
};

export default Home;
