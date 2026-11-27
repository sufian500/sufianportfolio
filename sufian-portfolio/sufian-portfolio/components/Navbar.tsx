"use client";
import { useEffect, useRef, useState } from "react";
import { Download, Menu, Search, X } from "lucide-react";
import { profile } from "@/data/profile";

export const navItems = [
  { href: "#home", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#row-ba", label: "Business Analysis" },
  { href: "#row-bi", label: "Data Analytics" },
  { href: "#row-systems", label: "Systems & Technology" },
  { href: "#about", label: "About Me" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar({ query, setQuery }: { query: string; setQuery: (q: string) => void }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("#home");
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const ids = navItems.map((n) => n.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive("#" + e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (query && !open) setOpen(true);
  }, [query, open]);

  const toggleSearch = () => {
    const next = !open;
    setOpen(next);
    if (next) setTimeout(() => input.current?.focus(), 50);
    else setQuery("");
  };

  const onSearchChange = (v: string) => {
    setQuery(v);
    if (v) document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className={`nav ${solid || menu ? "solid" : ""}`}>
      <div className="nav-in gut">
        <a className="wordmark" href="#home" aria-label="SUFIAN. home">
          SUFIAN<span className="dot">.</span>
        </a>
        <nav aria-label="Main">
          <ul className="nav-links">
            {navItems.map((n) => (
              <li key={n.href}>
                <a href={n.href} className={active === n.href ? "active" : ""} aria-current={active === n.href ? "true" : undefined}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav-right">
          <div className={`search ${open ? "open" : ""}`} role="search">
            <button className="icon-btn" type="button" onClick={toggleSearch} aria-label={open ? "Close search" : "Search projects and skills"} aria-expanded={open}>
              {open ? <X size={20} /> : <Search size={20} />}
            </button>
            <label htmlFor="site-search" className="sr-only">
              Search projects, technologies, skills and careers
            </label>
            <input
              id="site-search"
              ref={input}
              type="search"
              placeholder="Power BI, AWS, Business Analyst"
              value={query}
              onChange={(e) => onSearchChange(e.target.value)}
              tabIndex={open ? 0 : -1}
            />
          </div>
          {profile.resumePdf && (
            <a className="btn btn-red btn-sm hide-sm" href={profile.resumePdf} download="Sufian_Sayed_Resume.pdf">
              <Download size={16} /> Resume
            </a>
          )}
          <a className="avatar hide-sm" href="#about" aria-label="About Sufian">
            SS
          </a>
          <button className="icon-btn menu-btn" type="button" aria-label="Menu" aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu(!menu)}>
            {menu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      <div id="mobile-menu" className={`mobile-menu ${menu ? "open" : ""}`}>
        {navItems.map((n) => (
          <a key={n.href} href={n.href} onClick={() => setMenu(false)}>
            {n.label}
          </a>
        ))}
        {profile.resumePdf && (
          <a href={profile.resumePdf} download="Sufian_Sayed_Resume.pdf" onClick={() => setMenu(false)}>
            Download resume
          </a>
        )}
      </div>
    </header>
  );
}
