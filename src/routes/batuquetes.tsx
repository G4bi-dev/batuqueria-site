import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, X, Music, Building2, Heart, PartyPopper, Landmark, Flag, Users2 } from "lucide-react";
import hero from "@/assets/batuquetes/hero.png.asset.json";
import dancerRed from "@/assets/batuquetes/dancer-red.png.asset.json";
import dancerPurple from "@/assets/batuquetes/dancer-purple.png.asset.json";
import dancerWhite from "@/assets/batuquetes/dancer-white.png.asset.json";
import dancersWhiteRed from "@/assets/batuquetes/dancers-white-red.png.asset.json";
import logoBatuquetes from "@/assets/batuquetes/logo-batuquetes.png.asset.json";
import logoMark from "@/assets/batuqueria-mark-transparent.png.asset.json";

export const Route = createFileRoute("/batuquetes")({
  head: () => ({
    meta: [
      { title: "Batuquetes — The Dancers of Batuqueria" },
      { name: "description", content: "The Batuquetes are the official dance ensemble of Batuqueria — the visual heartbeat of Brazilian percussion in Belgium." },
      { property: "og:title", content: "Batuquetes — The Dancers of Batuqueria" },
      { property: "og:description", content: "More than dancers. The visual heartbeat of Batuqueria." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: hero.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: hero.url },
    ],
  }),
  component: BatuquetesPage,
});

const GALLERY = [
  { src: hero.url, span: "md:col-span-2 md:row-span-2" },
  { src: dancerRed.url, span: "" },
  { src: dancerPurple.url, span: "md:row-span-2" },
  { src: dancerWhite.url, span: "" },
  { src: dancersWhiteRed.url, span: "md:col-span-2" },
];

const PERFORMANCES = [
  { icon: Music, title: "Festivals", body: "Feathered explosions on the world's biggest open-air stages." },
  { icon: Building2, title: "Corporate Events", body: "Elegant Brazilian glamour for premium brand moments." },
  { icon: Heart, title: "Weddings", body: "Unforgettable entrances, ceremonial dances, and pure joy." },
  { icon: PartyPopper, title: "Private Parties", body: "Intimate rooms turned into vibrant Rio-style celebrations." },
  { icon: Landmark, title: "Cultural Events", body: "Ambassadors of Brazilian heritage and Afro-Latin roots." },
  { icon: Flag, title: "Parades", body: "Choreographed processions leading the Batuqueria drums." },
  { icon: Users2, title: "Team Buildings", body: "Immersive dance workshops that unite groups through rhythm." },
];

function BatuquetesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <About />
      <Gallery />
      <Performances />
      <Contact />
      <Footer />
    </div>
  );
}

function useScrolled(threshold = 40) {
  const [s, setS] = useState(false);
  useEffect(() => {
    const on = () => setS(window.scrollY > threshold);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [threshold]);
  return s;
}

function Nav() {
  const scrolled = useScrolled(60);
  const [open, setOpen] = useState(false);
  const links = [
    { to: "/", label: "Home" },
    { to: "/#story", label: "Our Story" },
    { to: "/#performances", label: "Performances" },
    { to: "/batuquetes", label: "Batuquetes" },
    { to: "/#gallery", label: "Gallery" },
    { to: "/#agenda", label: "Agenda" },
    { to: "/#contact", label: "Contact" },
  ];
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-xl bg-black/60 border-b border-white/10" : "bg-transparent"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-3 group">
          <img src={logoMark.url} alt="Batuqueria" className="h-9 w-9 object-contain transition-transform group-hover:scale-110" />
          <span className="font-display text-2xl tracking-wider text-white">BATUQUERIA</span>
        </a>
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((n) => (
            <a key={n.to} href={n.to} className={`relative text-sm uppercase tracking-widest transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-brand after:transition-all hover:after:w-full ${n.label === "Batuquetes" ? "text-white after:w-full" : "text-white/80 hover:text-white"}`}>
              {n.label}
            </a>
          ))}
        </nav>
        <a href="/#contact" className="hidden lg:inline-flex isolate items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_14px_-10px_var(--brand-glow)] hover:shadow-[0_8px_16px_-10px_var(--brand-glow)] transition-shadow">
          Book Us <ArrowRight className="h-4 w-4" />
        </a>
        <button className="lg:hidden text-white p-2" onClick={() => setOpen(v => !v)} aria-label="Toggle menu">
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-6 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-white/10 bg-black/90 backdrop-blur-xl">
          <div className="flex flex-col px-6 py-4 gap-3">
            {links.map((n) => (
              <a key={n.to} href={n.to} onClick={() => setOpen(false)} className="py-2 text-white/90 uppercase tracking-widest text-sm">
                {n.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center scale-110 transition-transform duration-[6000ms] ease-out"
        style={{ backgroundImage: `url(${hero.url})`, transform: mounted ? "scale(1)" : "scale(1.15)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div className={`mb-6 flex items-center gap-3 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
          <span className="h-px w-12 bg-brand" />
          <span className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-white/80">The Dancers of Batuqueria</span>
          <span className="h-px w-12 bg-brand" />
        </div>

        <img
          src={logoBatuquetes.url}
          alt=""
          className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] max-w-[80vw] opacity-[0.06] mix-blend-screen transition-opacity duration-[2000ms] ${mounted ? "opacity-[0.09]" : "opacity-0"}`}
        />

        <h1 className={`font-display text-[18vw] md:text-[12vw] lg:text-[10vw] leading-[0.95] md:leading-[0.92] tracking-tight text-white transition-all duration-1000 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          BATU<span className="text-brand">QUETES</span>
        </h1>

        <p className={`mt-10 max-w-2xl text-lg md:text-xl text-white/85 font-light leading-relaxed transition-all duration-1000 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          More than dancers. <span className="text-white">They are the visual heartbeat of Batuqueria.</span>
        </p>

        <div className={`mt-12 flex flex-wrap items-center justify-center gap-5 sm:gap-6 transition-all duration-1000 delay-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <a href="#contact" className="group inline-flex isolate items-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white shadow-[0_10px_20px_-14px_var(--brand-glow)] hover:shadow-[0_14px_24px_-14px_var(--brand-glow)] transition-all hover:-translate-y-0.5">
            Book a Performance <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#gallery" className="inline-flex isolate items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white hover:border-white/60 hover:bg-white/5 transition-all">
            See the Gallery
          </a>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60">
          <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
          <div className="relative h-10 w-px bg-white/20 overflow-hidden">
            <span className="absolute inset-x-0 top-0 h-4 bg-white/90 animate-scroll-hint" />
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" />
      <div className="mx-auto max-w-6xl grid gap-16 lg:grid-cols-12 items-center">
        <div className="lg:col-span-7 relative">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-[oklch(0.78_0.16_85)]" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-[oklch(0.78_0.16_85)]">Who they are</span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.1] md:leading-[1.05] lg:leading-[1.02] text-white">
            The visual <span className="text-brand">heartbeat</span> of every performance.
          </h2>
          <div className="mt-10 space-y-6 text-white/75 text-lg leading-relaxed max-w-2xl">
            <p>
              The <span className="text-white">Batuquetes</span> are the official dance ensemble of Batuqueria. They embody the joy, elegance and vibrant spirit of Brazilian culture.
            </p>
            <p>
              Every choreography is designed to interact with the percussionists, creating an immersive experience where <span className="text-white">rhythm and dance become one</span>.
            </p>
            <p>
              Whether at festivals, corporate events, private celebrations or cultural parades, the Batuquetes captivate audiences with their energy, smiles and passion.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg">
            {[
              { k: "Elegance", v: "01" },
              { k: "Energy", v: "02" },
              { k: "Expression", v: "03" },
            ].map((s) => (
              <div key={s.k} className="border-l border-[oklch(0.78_0.16_85)]/40 pl-3">
                <div className="font-display text-2xl text-[oklch(0.85_0.14_85)]">{s.v}</div>
                <div className="text-xs uppercase tracking-widest text-white/60 mt-1">{s.k}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
            <img src={dancerRed.url} alt="Batuquete dancer" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-6 -left-6 w-40 aspect-square overflow-hidden rounded-sm border-4 border-background hidden md:block">
            <img src={dancerPurple.url} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="absolute -top-6 -right-6 hidden md:flex items-center gap-2 rounded-full border border-[oklch(0.78_0.16_85)]/50 bg-black/60 backdrop-blur px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-[oklch(0.85_0.14_85)] animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-white/90">Live &amp; unforgettable</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section id="gallery" className="relative py-32 px-6 bg-gradient-to-b from-background via-[oklch(0.08_0_0)] to-background">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <div className="text-[10px] uppercase tracking-[0.5em] text-brand mb-4">Gallery</div>
          <h2 className="font-display text-5xl md:text-7xl text-white">Feathers, light, <span className="text-brand">rhythm.</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[260px] gap-3">
          {GALLERY.map((g, i) => (
            <button
              key={i}
              onClick={() => setOpen(g.src)}
              className={`group relative overflow-hidden rounded-sm ${g.span}`}
            >
              <img
                src={g.src}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
              <div className="absolute inset-0 border border-transparent group-hover:border-brand/60 transition-colors" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs uppercase tracking-widest text-white/90">View</span>
                <span className="h-px flex-1 mx-3 bg-white/40" />
                <span className="text-[10px] text-white/70">{String(i + 1).padStart(2, "0")}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {open && <Lightbox src={open} onClose={() => setOpen(null)} />}
    </section>
  );
}

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const on = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", on);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", on); document.body.style.overflow = ""; };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur flex items-center justify-center p-6 animate-fade-in" onClick={onClose}>
      <button onClick={onClose} className="absolute top-6 right-6 text-white/80 hover:text-white p-2" aria-label="Close">
        <X className="h-8 w-8" />
      </button>
      <img src={src} alt="" className="max-h-full max-w-full object-contain animate-scale-in" />
    </div>
  );
}

function Performances() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl mb-16">
          <div className="text-[10px] uppercase tracking-[0.5em] text-brand mb-4">Where they perform</div>
          <h2 className="font-display text-5xl md:text-7xl text-white leading-[1.1] md:leading-[1.02]">
            Every stage. <br /><span className="text-outline">Every celebration.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PERFORMANCES.map((p, i) => (
            <div
              key={p.title}
              className="group relative overflow-hidden rounded-sm border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-8 hover:border-brand/60 transition-all duration-500 hover:-translate-y-1"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-brand/10 via-transparent to-[oklch(0.78_0.16_85)]/10" />
              <div className="absolute -right-16 -top-16 w-40 h-40 rounded-full bg-brand/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative">
                <div className="flex items-center justify-between mb-8">
                  <div className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-brand group-hover:bg-brand/10 transition-all">
                    <p.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-display text-2xl text-white/20 group-hover:text-[oklch(0.85_0.14_85)] transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-white mb-3">{p.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{p.body}</p>
                <div className="mt-8 flex items-center gap-2 text-xs uppercase tracking-widest text-brand opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
                  Book this <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.3 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return (
    <section id="contact" ref={ref} className="relative py-40 px-6 overflow-hidden">
      <div className="absolute inset-0">
        <img src={dancersWhiteRed.url} alt="" className="h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>
      <div className={`relative mx-auto max-w-4xl text-center transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="text-[10px] uppercase tracking-[0.6em] text-[oklch(0.85_0.14_85)] mb-6">Booking</div>
        <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-[0.95]">
          Bring rhythm, <span className="text-brand">elegance</span> <br />
          and Brazilian energy <br />
          <span className="text-outline">to your event.</span>
        </h2>
        <p className="mt-8 max-w-xl mx-auto text-white/70 text-lg">
          From intimate weddings to open-air festivals — the Batuqueria family is ready to make your moment unforgettable.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a href="/#contact" className="group inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white shadow-[0_8px_24px_-10px_var(--brand-glow)] hover:shadow-[0_12px_32px_-8px_var(--brand-glow)] transition-all hover:-translate-y-0.5">
            Book Batuqueria <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="/#contact" className="group inline-flex items-center gap-2 rounded-full border-2 border-[oklch(0.85_0.14_85)] bg-[oklch(0.85_0.14_85)]/5 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-[oklch(0.9_0.12_85)] hover:bg-[oklch(0.85_0.14_85)]/15 transition-all hover:-translate-y-0.5">
            Book Batuquetes <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="mt-16 flex items-center justify-center gap-6 text-white/50 text-xs uppercase tracking-widest">
          <span>Belgium</span><span className="h-px w-8 bg-white/20" />
          <span>Europe</span><span className="h-px w-8 bg-white/20" />
          <span>Worldwide</span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-6">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={logoMark.url} alt="" className="h-8 w-8 object-contain" />
          <span className="font-display text-lg tracking-wider text-white">BATUQUERIA · BATUQUETES</span>
        </div>
        <Link to="/" className="text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors">
          ← Back to home
        </Link>
      </div>
    </footer>
  );
}
