import About from "../components/home/About";
import Achievements from "../components/home/Achievements";
import Gallery from "../components/home/Gallery";
import Hero from "../components/home/Hero";
import Team from "../components/home/Team";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

function HomePage() {
    return (
        <main className="min-h-screen bg-kc-bg">
            <Navbar />
            <Hero />
            <Team />
            <About />
            <Achievements />
            <Gallery />
            <Footer />
        </main>
    );
}

export default HomePage;