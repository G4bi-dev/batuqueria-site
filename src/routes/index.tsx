import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Music2, Users, Sparkles, Building2, Heart, Radio, Landmark, PartyPopper,
  Instagram, Facebook, Youtube, Mail, MapPin, Phone, ArrowRight, Play, X,
  ChevronDown,
} from "lucide-react";

import logoFull from "@/assets/batuqueria-logo-full-transparent.png.asset.json";
import logoMark from "@/assets/batuqueria-mark-transparent.png.asset.json";
import heroVideo from "@/assets/batuqueria-hero.mp4.asset.json";
import dna1 from "@/assets/dna/dna-1.jpg.asset.json";
import dna2 from "@/assets/dna/dna-2.jpg.asset.json";
import dna3 from "@/assets/dna/dna-3.jpg.asset.json";
import dna4 from "@/assets/dna/dna-4.jpg.asset.json";
import gal1 from "@/assets/gallery-new/gal-1.jpg.asset.json";
import gal2 from "@/assets/gallery-new/gal-2.jpg.asset.json";
import gal3 from "@/assets/gallery-new/gal-3.jpg.asset.json";
import gal4 from "@/assets/gallery-new/gal-4.jpg.asset.json";
import gal5 from "@/assets/gallery-new/gal-5.jpg.asset.json";
import gal6 from "@/assets/gallery-new/gal-6.jpg.asset.json";
import ch1a from "@/assets/story/ch1-a.jpg.asset.json";
import ch1b from "@/assets/story/ch1-b.jpg.asset.json";
import ch2a from "@/assets/story/ch2-a.jpg.asset.json";
import ch2b from "@/assets/story/ch2-b.jpg.asset.json";
import ch2c from "@/assets/story/ch2-c.jpg.asset.json";
import ch3a from "@/assets/story/ch3-a.jpg.asset.json";
import ch4a from "@/assets/story/ch4-a.jpg.asset.json";
import ch4b from "@/assets/story/ch4-b.jpg.asset.json";
import ch4c from "@/assets/story/ch4-c.jpg.asset.json";

const heroPoster = dna4.url;

export const Route = createFileRoute("/")({
  component: BatuqueriaHome,
});

/* ---------- Small hooks ---------- */

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function useCountUp(target: number, start: boolean, duration = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.floor(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return value;
}

function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

/* ---------- Global reveal styles injection ---------- */
const revealStyle = `
.reveal { opacity: 0; transform: translateY(28px); transition: opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1); }
.reveal.is-visible { opacity: 1; transform: none; }
.reveal-delay-1 { transition-delay: .08s; }
.reveal-delay-2 { transition-delay: .16s; }
.reveal-delay-3 { transition-delay: .24s; }
.reveal-delay-4 { transition-delay: .32s; }
`;

/* ---------- Nav ---------- */

const NAV = [
  { href: "#home", label: "Home" },
  { href: "#story", label: "Our Story" },
  { href: "#performances", label: "Performances" },
  { href: "/batuquetes", label: "Batuquetes" },
  { href: "#gallery", label: "Gallery" },
  { href: "#agenda", label: "Agenda" },
  { href: "#join", label: "Join Us" },
  { href: "#contact", label: "Contact" },
];

function Nav() {
  const scrolled = useScrolled(60);
  const [open, setOpen] = useState(false);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-black/60 border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#home" className="flex items-center gap-3 group">
          <img src={logoMark.url} alt="Batuqueria" className="h-9 w-9 object-contain transition-transform group-hover:scale-110" />
          <span className="font-display text-2xl tracking-wider text-white">BATUQUERIA</span>
        </a>
        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="relative text-sm uppercase tracking-widest text-white/80 hover:text-white transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-brand after:transition-all hover:after:w-full"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden lg:inline-flex isolate items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_14px_-10px_var(--brand-glow)] hover:shadow-[0_8px_16px_-10px_var(--brand-glow)] transition-shadow"
        >
          Book Us <ArrowRight className="h-4 w-4" />
        </a>
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
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
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-2 text-white/90 uppercase tracking-widest text-sm">
                {n.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white">Book Us</a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- Cinematic Intro ---------- */

function Intro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState(0); // 0 dark, 1 glow, 2 mark visible, 3 pulse, 4 fade out
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 250),   // ambient red glow
      setTimeout(() => setPhase(2), 900),   // diamond + silhouette settle
      setTimeout(() => setPhase(3), 1700),  // soft pulse ripple
      setTimeout(() => setPhase(4), 2400),  // begin fade out
      setTimeout(() => onDone(), 2800),     // reveal hero logo once intro is essentially gone
    ];
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  const particles = Array.from({ length: 14 });

  return (
    <div
      className="fixed inset-0 z-[100] pointer-events-none"
      style={{
        background: "rgba(13,13,13,0.75)",
        opacity: phase >= 4 ? 0 : 1,
        visibility: phase >= 4 ? "hidden" : "visible",
        transition: "opacity 400ms cubic-bezier(.2,.7,.2,1), visibility 400ms",
      }}
      aria-hidden
    >
      {/* ambient volumetric red glow */}
      <div
        className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(0.6 0.24 27 / 0.55) 0%, oklch(0.4 0.2 27 / 0.2) 40%, transparent 70%)",
          transform: "translate(-50%,-50%)",
          opacity: phase >= 1 ? 1 : 0,
          transition: "opacity 900ms ease-out",
          filter: "blur(10px)",
        }}
      />

      {/* floating particles */}
      {phase >= 1 && (
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((_, i) => {
            const left = (i * 41) % 100;
            const delay = (i % 8) * 0.35;
            const size = 2 + (i % 3);
            const px = ((i * 17) % 50) - 25;
            return (
              <span
                key={i}
                className="absolute rounded-full bg-brand/60"
                style={{
                  left: `${left}%`,
                  bottom: "35%",
                  width: `${size}px`,
                  height: `${size}px`,
                  ["--px" as any]: `${px}px`,
                  animation: `particleFloat ${5 + (i % 3)}s ease-out ${delay}s infinite`,
                  filter: "blur(0.5px)",
                }}
              />
            );
          })}
        </div>
      )}

      {/* single soft ripple */}
      {phase >= 3 && (
        <span
          className="absolute left-1/2 top-1/2 h-40 w-40 rounded-full border border-brand/50"
          style={{
            animation: "shockwave 2s cubic-bezier(.2,.7,.2,1) forwards",
          }}
        />
      )}

      {/* logo — diamond fades/scales, silhouette slides in */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="relative h-52 w-52 md:h-64 md:w-64"
          style={{
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? "scale(1)" : "scale(0.8)",
            transition: "opacity 900ms cubic-bezier(.2,.7,.2,1), transform 1100ms cubic-bezier(.2,.7,.2,1)",
          }}
        >
          <div
            className="absolute inset-[-25%] rounded-full"
            style={{
              background: "radial-gradient(circle, oklch(0.66 0.26 27 / 0.4), transparent 65%)",
              filter: "blur(24px)",
            }}
          />
          <img
            src={logoMark.url}
            alt=""
            className="relative h-full w-full object-contain"
            style={{
              filter: "drop-shadow(0 0 40px oklch(0.66 0.26 27 / 0.55))",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- Hero ---------- */

function Hero({ ready }: { ready: boolean }) {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={heroVideo.url}
        poster={heroPoster}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
      <div className="absolute inset-0 bg-noise opacity-40" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 pt-24 text-center">
        {/* Logo — hidden until intro finishes, then fades in */}
        <div
          className="relative mb-10 group"
          style={{
            opacity: ready ? 1 : 0,
            visibility: ready ? "visible" : "hidden",
            transition: "opacity 220ms ease-out",
          }}
          aria-hidden={!ready}
        >
          {/* cinematic red radial light */}
          <div
            className="absolute left-1/2 top-1/2 h-[140%] w-[140%] rounded-full pointer-events-none animate-logo-glow"
            style={{
              background:
                "radial-gradient(circle, oklch(0.66 0.26 27 / 0.55) 0%, oklch(0.55 0.24 27 / 0.25) 35%, transparent 70%)",
              filter: "blur(30px)",
              transform: "translate(-50%,-50%)",
            }}
          />
          <img
            src={logoMark.url}
            alt="Batuqueria"
            className="relative h-44 w-44 md:h-60 md:w-60 object-contain animate-logo-float transition-transform duration-700 group-hover:scale-110"
            style={{
              filter: "drop-shadow(0 0 40px oklch(0.66 0.26 27 / 0.55))",
            }}
          />
        </div>


        <p
          className="mb-4 text-xs md:text-sm uppercase tracking-[0.4em] text-brand"
          style={{
            opacity: 0,
            animation: ready ? "titleRise 900ms cubic-bezier(.2,.7,.2,1) 200ms forwards" : "none",
          }}
        >
          BRAZILIAN PERCUSSION · BELGIUM · SINCE 2002
        </p>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display leading-[1.1] md:leading-[1.02] lg:leading-[1] text-white">
          <span
            className="block"
            style={{
              opacity: 0,
              animation: ready ? "titleRise 1100ms cubic-bezier(.2,.7,.2,1) 500ms forwards" : "none",
            }}
          >
            24 Years of <span className="text-brand">Energy.</span>
          </span>
          <span
            className="block text-outline"
            style={{
              opacity: 0,
              animation: ready ? "titleRise 1100ms cubic-bezier(.2,.7,.2,1) 1400ms forwards" : "none",
            }}
          >
            One Family.
          </span>
        </h1>

        <p
          className="mt-6 max-w-2xl text-base md:text-lg text-white/80 leading-relaxed whitespace-pre-line"
          style={{
            opacity: 0,
            animation: ready ? "titleRise 1000ms cubic-bezier(.2,.7,.2,1) 2200ms forwards" : "none",
          }}
        >
          {"\n"}
        </p>

        <div
          className="mt-12 flex flex-col sm:flex-row items-center gap-5 sm:gap-6"
          style={{
            opacity: 0,
            animation: ready ? "titleRise 1000ms cubic-bezier(.2,.7,.2,1) 2600ms forwards" : "none",
          }}
        >
          <a
            href="#contact"
            className="group inline-flex isolate items-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white shadow-[0_10px_20px_-14px_var(--brand-glow)] hover:shadow-[0_14px_24px_-14px_var(--brand-glow)] transition-all hover:-translate-y-0.5"
          >
            Book Batuqueria <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#story"
            className="inline-flex isolate items-center gap-2 rounded-full border border-white/30 bg-white/5 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white backdrop-blur hover:bg-white/10 transition-colors"
          >
            Discover Our Story
          </a>
        </div>
      </div>

    </section>
  );
}

/* ---------- Ticker ---------- */

function Ticker() {
  const words = ["RHYTHM", "PASSION", "FAMILY", "ENERGY", "MOVEMENT", "AUTHENTICITY", "SAMBA", "SURDO", "REPINIQUE", "CAIXA"];
  const doubled = [...words, ...words];
  return (
    <div className="relative border-y border-white/10 bg-brand text-white py-5 overflow-hidden">
      <div className="flex whitespace-nowrap animate-ticker">
        {doubled.map((w, i) => (
          <span key={i} className="mx-8 font-display text-3xl md:text-5xl tracking-widest flex items-center gap-8">
            {w}
            <span className="inline-block h-2 w-2 rounded-full bg-white" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Story — simple, fluid vertical timeline ---------- */

type StoryChapter = {
  num: string;
  year?: string;
  title: string;
  body: React.ReactNode;
  images: string[];
};

const STORY_CHAPTERS: StoryChapter[] = [
  {
    num: "01",
    year: "2002",
    title: "The Beginning",
    body: (
      <>
        After the Zinneke Parade in 2002, Paulo — already teaching Brazilian
        percussion workshops — decided to create a group capable of sharing
        the raw energy and spirit of Brazilian music.
        <br /><br />
        At that moment, <span className="text-brand">Red1 met Paulo</span>. A
        friendship quickly grew from their shared passion for rhythm.
        Together, they founded Batuqueria.
      </>
    ),
    images: [ch1a.url, ch1b.url],
  },
  {
    num: "02",
    title: "The First Performances",
    body: (
      <>
        Very quickly Batuqueria began performing across Belgium. The group
        developed a reputation for explosive energy, powerful performances
        and an unforgettable atmosphere.
        <br /><br />
        <span className="text-brand">Pili Pili Festival</span> — Liège<br />
        <span className="text-brand">Sfinks Festival</span> — alongside Olodum &amp; Mangueira<br />
        <span className="text-brand">Esperanzah! Festival</span>
      </>
    ),
    images: [ch2a.url, ch2b.url, ch2c.url],
  },
  {
    num: "03",
    title: "Learning from Brazil",
    body: (
      <>
        Driven by the desire to constantly grow, Batuqueria travelled to Brazil
        to train with some of the country's greatest percussion masters — and
        invited renowned Brazilian <span className="text-brand">Mestres</span> to
        Brussels to share their knowledge.
        <br /><br />
        {MESTRES.map((m) => (
          <span key={m.school} className="block text-sm text-white/60 mt-1">
            <span className="text-brand">{m.school}</span> — {m.name}
          </span>
        ))}
      </>
    ),
    images: [ch3a.url],
  },
  {
    num: "04",
    title: "Travelling the World",
    body: (
      <>
        From Brussels to Bahia, from Havana to Marrakech — Batuqueria carries
        the beat across continents.
        <br /><br />
        {DESTINATIONS.map((d) => (
          <span key={d.country} className="inline-flex items-center gap-2 mr-3 mb-2 rounded-full border border-white/15 px-3 py-1 text-xs text-white/80">
            <span>{d.flag}</span> {d.country}
          </span>
        ))}
      </>
    ),
    images: [ch4a.url, ch4b.url, ch4c.url],
  },
];

function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px", ...options },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

function Story() {
  return (
    <section id="story" className="relative bg-black py-24 md:py-32 px-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[40vmin] bg-[radial-gradient(ellipse_at_center_top,oklch(0.55_0.22_27/0.18),transparent_70%)]" />

      <div className="mx-auto max-w-6xl text-center mb-20 md:mb-28">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-brand">Our Story</p>
        <h2 className="mt-5 font-display text-4xl md:text-6xl lg:text-7xl text-white leading-[1.05]">
          24 years, <span className="text-brand">one heartbeat.</span>
        </h2>
      </div>

      <div className="mx-auto max-w-6xl space-y-32 md:space-y-48">
        {STORY_CHAPTERS.map((ch, i) => (
          <StoryRow key={ch.num} chapter={ch} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function StoryRow({ chapter, reverse }: { chapter: StoryChapter; reverse: boolean }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center motion-safe:transition-all motion-safe:duration-[900ms] motion-safe:ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className={`${reverse ? "md:order-2" : ""}`}>
        <div className="flex items-baseline gap-4">
          <span className="font-display text-6xl md:text-8xl text-brand leading-none">{chapter.num}</span>
          {chapter.year && (
            <span className="text-xs uppercase tracking-[0.4em] text-white/50">{chapter.year}</span>
          )}
        </div>
        <h3 className="mt-6 font-display text-3xl md:text-5xl text-white leading-tight">{chapter.title}</h3>
        <div className="mt-4 h-[2px] w-16 bg-brand" />
        <p className="mt-6 text-white/75 text-base md:text-lg leading-relaxed max-w-lg">{chapter.body}</p>
      </div>

      <div className={`${reverse ? "md:order-1" : ""}`}>
        <StoryImages images={chapter.images} />
      </div>
    </div>
  );
}

function StoryImages({ images }: { images: string[] }) {
  if (images.length === 1) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-white/10 aspect-[4/5]">
        <img src={images[0]} alt="" loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
    );
  }
  if (images.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-3">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 aspect-[3/4]">
          <img src={images[0]} alt="" loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-white/10 aspect-[3/4] mt-8">
          <img src={images[1]} alt="" loading="lazy" className="h-full w-full object-cover" />
        </div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-6 gap-3">
      <div className="col-span-4 relative overflow-hidden rounded-2xl border border-white/10 aspect-[4/5]">
        <img src={images[0]} alt="" loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="col-span-2 flex flex-col gap-3">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 aspect-square">
          <img src={images[1]} alt="" loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-white/10 aspect-square">
          <img src={images[2]} alt="" loading="lazy" className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
}


/* ---------- Section heading ---------- */

function SectionHeading({ eyebrow, title, sub, center = true }: { eyebrow: string; title: React.ReactNode; sub?: React.ReactNode; center?: boolean }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${center ? "text-center mx-auto" : ""} max-w-3xl`}>
      <p className="text-xs uppercase tracking-[0.5em] text-brand">{eyebrow}</p>
      <h2 className="mt-4 text-4xl md:text-6xl text-white leading-[1.05]">{title}</h2>
      {sub && <p className="mt-6 text-white/70 text-base md:text-lg leading-relaxed">{sub}</p>}
    </div>
  );
}

/* ---------- DNA ---------- */

const DNA = [
  { title: "We Grow Together", body: "\n", img: dna1.url },
  { title: "We Travel Together", body: "\n", img: dna2.url },
  { title: "We Perform Together", body: "\n", img: dna3.url },
  { title: "We Celebrate Together", body: "\n", img: dna4.url },
];

function DNASection() {
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Our DNA"
          title={<>More than a group. <span className="text-brand">A family.</span></>}
          sub="For more than 24 years, Batuqueria has brought the raw energy of brazilian percussion across the world."
        />
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DNA.map((d, i) => (
            <DNACard key={d.title} d={d} delay={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DNACard({ d, delay }: { d: typeof DNA[number]; delay: number }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal reveal-delay-${(delay % 4) + 1} group relative overflow-hidden rounded-2xl border border-white/10 bg-card`}>
      <div className="aspect-[4/5] overflow-hidden">
        <img src={d.img} alt={d.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-2xl text-white">{d.title}</h3>
        <p className="mt-2 text-sm text-white/80 leading-relaxed whitespace-pre-line">{d.body}</p>
        <div className="mt-3 h-[2px] w-0 bg-brand transition-all duration-500 group-hover:w-16" />
      </div>
    </div>
  );
}

/* ---------- Performances ---------- */

const PERFS = [
  { icon: Music2, title: "Festivals", body: "Main-stage energy that lifts crowds off their feet." },
  { icon: Sparkles, title: "Private Events", body: "Birthdays, launches and celebrations, upgraded." },
  { icon: Building2, title: "Corporate Team Buildings", body: "Percussion workshops that break every ice." },
  { icon: Heart, title: "Weddings", body: "Walk-outs, first dances, unforgettable send-offs." },
  { icon: Radio, title: "Street Performances", body: "Guerilla rhythms in city squares and markets." },
  { icon: Users, title: "Social Projects", body: "Schools, community centers, inclusion through rhythm." },
  { icon: Landmark, title: "Zinneke Parade", body: "A recurring heartbeat of Brussels' iconic parade." },
  { icon: PartyPopper, title: "Community Events", body: "Neighborhood parties, cultural nights, causes we love." },
];

function Performances() {
  return (
    <section id="performances" className="relative py-32 px-6 bg-gradient-to-b from-black to-ink">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Performances"
          title={<>Where we bring <span className="text-brand">the beat.</span></>}
          sub={<>Batuqueria adapts to every stage.{"\n"}From an intimate wedding aisle to a 20,000-strong festival crowd.{"\n"}</>}
        />
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PERFS.map((p, i) => (
            <PerfCard key={p.title} p={p} delay={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PerfCard({ p, delay }: { p: typeof PERFS[number]; delay: number }) {
  const ref = useReveal<HTMLDivElement>();
  const Icon = p.icon;
  return (
    <div
      ref={ref}
      className={`reveal reveal-delay-${(delay % 4) + 1} group relative overflow-hidden rounded-2xl border border-white/10 bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-brand/50`}
    >
      <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-brand/0 blur-3xl transition-all duration-700 group-hover:bg-brand/30" />
      <Icon className="h-8 w-8 text-brand transition-transform duration-500 group-hover:scale-110" />
      <h3 className="mt-6 text-xl text-white">{p.title}</h3>
      <p className="mt-2 text-sm text-white/70 leading-relaxed">{p.body}</p>
      <div className="mt-5 flex items-center gap-2 text-xs uppercase tracking-widest text-brand opacity-0 -translate-x-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
        Ask us <ArrowRight className="h-3.5 w-3.5" />
      </div>
    </div>
  );
}

/* ---------- Numbers ---------- */

const NUMS = [
  { value: 24, suffix: "+", label: "Years" },
  { value: 1000, suffix: "+", label: "Performances" },
  { value: 250, suffix: "K", label: "People Entertained" },
  { value: 1, suffix: "", label: "Family" },
];

function Numbers() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [start, setStart] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setStart(true)), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} className="relative py-24 px-6 border-y border-white/10 bg-black">
      <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-8">
        {NUMS.map((n) => (
          <Counter key={n.label} target={n.value} suffix={n.suffix} label={n.label} start={start} />
        ))}
      </div>
    </section>
  );
}

function Counter({ target, suffix, label, start }: { target: number; suffix: string; label: string; start: boolean }) {
  const v = useCountUp(target, start);
  return (
    <div className="text-center">
      <div className="font-display text-6xl md:text-8xl text-white leading-none">
        {v}
        <span className="text-brand">{suffix}</span>
      </div>
      <div className="mt-3 text-xs md:text-sm uppercase tracking-[0.4em] text-white/70">{label}</div>
    </div>
  );
}

/* ---------- Gallery ---------- */

const GALLERY = [
  { src: gal1.url, span: "row-span-2" },
  { src: gal2.url, span: "" },
  { src: gal3.url, span: "" },
  { src: gal4.url, span: "row-span-2" },
  { src: gal5.url, span: "" },
  { src: gal6.url, span: "" },
];

function Gallery() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section id="gallery" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Gallery"
          title={<>Moments that <span className="text-brand">hit hard.</span></>}
        />
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-4">
          {GALLERY.map((g, i) => (
            <GalleryTile key={i} src={g.src} span={g.span} onOpen={setOpen} />
          ))}
        </div>

        <div className="mt-16 relative rounded-3xl overflow-hidden border border-white/10 group">
          <video
            src={heroVideo.url}
            poster={heroPoster}
            className="w-full aspect-video object-cover"
            controls
            playsInline
          />
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-md flex items-center justify-center p-6 animate-rise-in" onClick={() => setOpen(null)}>
          <button className="absolute top-6 right-6 text-white/80 hover:text-white" onClick={() => setOpen(null)} aria-label="Close">
            <X className="h-8 w-8" />
          </button>
          <img src={open} alt="" className="max-h-[90vh] max-w-[95vw] object-contain rounded-lg shadow-2xl" />
        </div>
      )}
    </section>
  );
}

function GalleryTile({ src, span, onOpen }: { src: string; span: string; onOpen: (s: string) => void }) {
  const ref = useReveal<HTMLButtonElement>();
  return (
    <button
      ref={ref}
      onClick={() => onOpen(src)}
      className={`reveal group relative overflow-hidden rounded-2xl border border-white/10 ${span}`}
    >
      <img src={src} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-3 left-3 flex items-center gap-2 text-xs text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
        <Play className="h-3.5 w-3.5" /> View
      </div>
    </button>
  );
}

/* ---------- Agenda ---------- */

const AGENDA = [
  { date: "Aug 2, 2026", city: "Beauraing, BE", event: "Braderie de Beauraing", tag: "Parade" },
  { date: "Aug 7, 2026", city: "Huy, BE", event: "Foire de Huy", tag: "Festival" },
  { date: "Aug 14, 2026", city: "Belgium", event: "Percusounds Festival", tag: "Festival" },
  { date: "Aug 14, 2026", city: "Brussels, BE", event: "Brussels Dance Festival", tag: "Festival" },
];

function Agenda() {
  return (
    <section id="agenda" className="relative py-32 px-6 bg-ink">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Agenda" title={<>Catch us <span className="text-brand">live.</span></>} />
        <ul className="mt-16 divide-y divide-white/10 border-y border-white/10">
          {AGENDA.map((a, i) => <AgendaRow key={i} a={a} />)}
        </ul>
      </div>
    </section>
  );
}

function AgendaRow({ a }: { a: typeof AGENDA[number] }) {
  const ref = useReveal<HTMLLIElement>();
  return (
    <li ref={ref} className="reveal group grid grid-cols-12 items-center gap-4 py-6 hover:bg-white/5 transition-colors px-2">
      <div className="col-span-4 md:col-span-3 font-display text-xl md:text-2xl text-brand">{a.date}</div>
      <div className="col-span-4 md:col-span-6 text-white">
        <div className="text-lg md:text-xl">{a.event}</div>
        <div className="text-sm text-white/60 flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {a.city}</div>
      </div>
      <div className="col-span-4 md:col-span-3 flex justify-end">
        <span className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-widest text-white/80 group-hover:border-brand group-hover:text-brand transition-colors">{a.tag}</span>
      </div>
    </li>
  );
}

/* ---------- Join Us ---------- */

function Join() {
  return (
    <section id="join" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand/20 via-transparent to-transparent" />
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center relative">
        <div>
          <SectionHeading
            center={false}
            eyebrow="Join Us"
            title={<>Feel the pull? <span className="text-brand">Come drum.</span></>}
            sub={<>{"\n"}</>}
          />
          <a href="#contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-widest text-black hover:bg-brand hover:text-white transition-colors">
            Try a rehearsal <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="relative">
          <img src={logoFull.url} alt="Batuqueria full logo" className="w-full max-w-md mx-auto animate-float-y drop-shadow-[0_0_40px_rgba(225,6,0,0.4)]" />
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative py-32 px-6 bg-black">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contact"
          title={<>Let's make your event <span className="text-brand">unforgettable.</span></>}
          sub="Tell us about your date, your crowd, your dream. We'll bring the drums."
        />
        <div className="mt-16 grid md:grid-cols-5 gap-10">
          <div className="md:col-span-2 space-y-6">
            <InfoRow icon={Mail} label="Email" value="infobatuqueria@gmail.com" />
            <InfoRow icon={Phone} label="Phone" value={"+32 492 91 01 67 (FR / EN)\u00a0\n+32 477 13 11 35 (PT / ES)\n"} />
            <InfoRow icon={MapPin} label="Based in" value="Brussels, Belgium" />
            <div className="pt-6 flex gap-3">
              {[Instagram, Facebook, Youtube].map((I, i) => (
                <a key={i} href="#" className="grid place-items-center h-11 w-11 rounded-full border border-white/20 text-white/80 hover:bg-brand hover:text-white hover:border-brand transition-colors">
                  <I className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <form
            className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4"
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          >
            <Field label="Name" name="name" />
            <Field label="Email" name="email" type="email" />
            <Field label="Event date" name="date" type="date" />
            <Field label="Event type" name="type" />
            <div className="md:col-span-2">
              <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">Tell us more</label>
              <textarea rows={5} className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40 transition" />
            </div>
            <div className="md:col-span-2 flex items-center justify-between">
              <p className="text-xs text-white/50">We usually reply within 48 hours.</p>
              <button type="submit" className="inline-flex isolate items-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white shadow-[0_10px_20px_-14px_var(--brand-glow)] hover:shadow-[0_14px_24px_-14px_var(--brand-glow)] transition-all">
                {sent ? "Thanks!" : "Send message"} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="grid place-items-center h-11 w-11 rounded-full bg-brand/10 border border-brand/30 text-brand">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-widest text-white/50">{label}</div>
        <div className="text-white text-lg whitespace-pre-wrap">{value}</div>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs uppercase tracking-widest text-white/60 mb-2">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40 transition"
      />
    </div>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-10 px-6">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={logoMark.url} alt="" className="h-8 w-8 object-contain" />
          <span className="font-display text-lg tracking-widest text-white">BATUQUERIA</span>
        </div>
        <p className="text-xs text-white/50 whitespace-pre-line text-center md:text-right">
          © {new Date().getFullYear()} Batuqueria — Made with rhythm in Belgium.{"\n"}
          All rights reserved • Designed by Gabriela Rangel{"\n"}
        </p>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */

function BatuqueriaHome() {
  const words = useMemo(() => revealStyle, []);
  const [ready, setReady] = useState(false);
  return (
    <div className="relative bg-black text-white">
      <style>{words}</style>
      <Intro onDone={() => setReady(true)} />
      <Nav />
      <Hero ready={ready} />
      <Ticker />
      <Story />
      <DNASection />
      <Performances />
      <Numbers />
      <Gallery />
      <Agenda />
      <Join />
      <Contact />
      <Footer />
    </div>
  );
}
