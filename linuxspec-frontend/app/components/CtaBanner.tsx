import MatrixRain from "./MatrixRain";

export default function CtaBanner() {
  return (
    <section className="section-container py-12">
      <div className="relative overflow-hidden rounded-sm border border-red-900/20 bg-black">
        <div className="absolute inset-0 opacity-30">
          <MatrixRain />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/70" />

        <div className="relative px-8 py-14 text-center md:px-14 md:py-16">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Is your business vulnerable to cyber threats?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">
            In the digital world, cybersecurity is no longer optional - it is a basic
            necessity. Learn the importance of vulnerability identification before it is
            too late.
          </p>
          <a
            href="#contact"
            className="mt-8 inline-flex items-center justify-center rounded-sm bg-accent px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-accent-hover"
          >
            Request Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
