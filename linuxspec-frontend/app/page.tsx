import HeroCarousel from "./components/HeroCarousel";
import TrustBar from "./components/TrustBar";
import Services from "./components/Services";
import AnimatedMetrics from "./components/AnimatedMetrics";
import About from "./components/About";
import ProcessSteps from "./components/ProcessSteps";
import Testimonials from "./components/Testimonials";
import BlogPreview from "./components/BlogPreview";
import CtaBanner from "./components/CtaBanner";
import LeadForm from "./components/LeadForm";

export default function Home() {
  return (
    <main>
      <HeroCarousel />
      <TrustBar />
      <Services />
      <AnimatedMetrics />
      <About />
      <ProcessSteps />
      <Testimonials />
      <BlogPreview />
      <CtaBanner />
      <section id="contact" className="bg-surface py-20 md:py-28">
        <div className="section-container">
          <div className="text-center">
            <p className="section-subtitle">Contact</p>
            <h2 className="section-title mt-3">Get in Touch</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Ready to test your systems before hackers do? Fill out the form and our
              security team will respond within 24 hours.
            </p>
          </div>
          <div className="mt-12">
            <LeadForm />
          </div>
        </div>
      </section>
    </main>
  );
}
