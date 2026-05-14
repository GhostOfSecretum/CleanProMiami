/* App root + Tweaks */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "miami",
  "showFloatCards": true
}/*EDITMODE-END*/;

const PALETTES = {
  miami:  { pink: "#ff5e9c", coral: "#ff7a59", sunset: "#ffb347", aqua: "#6ee2d8", turq: "#2ec4c4", lemon: "#ffe066", navy: "#1a2b4a", ink: "#2a1a3e", deep: "#0f1d36", bg: "#fff7ee", soft: "#ffeede" },
  sunset: { pink: "#ff4f7a", coral: "#ff6b3d", sunset: "#ffa552", aqua: "#ffd089", turq: "#ff8a5c", lemon: "#ffd9a8", navy: "#2a1830", ink: "#3d2048", deep: "#241338", bg: "#fff3ed", soft: "#ffe5d3" },
  ocean:  { pink: "#3aa9ff", coral: "#26d6c4", sunset: "#7eecd1", aqua: "#a8f0e5", turq: "#1e8fb8", lemon: "#c8ecff", navy: "#0a1d36", ink: "#152a42", deep: "#0a1d36", bg: "#f0f8ff", soft: "#dff0fa" },
  neon:   { pink: "#ff2d95", coral: "#ff5fb5", sunset: "#ffb800", aqua: "#00f0c8", turq: "#00b8a4", lemon: "#ffe566", navy: "#12081f", ink: "#1e0f32", deep: "#0a0514", bg: "#0a0612", soft: "#120a1e" },
};

const PALETTE_BY_PINK = { "#ff5e9c": "miami", "#ff4f7a": "sunset", "#3aa9ff": "ocean", "#ff2d95": "neon" };

const THEME_LABELS = [
  { id: "miami", name: "Майами" },
  { id: "sunset", name: "Закат" },
  { id: "ocean", name: "Океан" },
  { id: "neon", name: "Неон" },
];

function loadTweakDefaults() {
  try {
    const saved = localStorage.getItem("cleanpro-palette");
    if (saved && PALETTES[saved]) return { ...TWEAK_DEFAULTS, palette: saved };
  } catch (_) {}
  return TWEAK_DEFAULTS;
}

const ThemeSwitcher = ({ paletteId, onSelect }) => (
  <div className="theme-switcher" role="group" aria-label="Цветовая схема сайта">
    <span className="theme-switcher__label">Тема</span>
    <div className="theme-switcher__opts">
      {THEME_LABELS.map(({ id, name }) => {
        const p = PALETTES[id];
        return (
          <button
            key={id}
            type="button"
            className={"theme-switcher__btn" + (paletteId === id ? " is-active" : "")}
            aria-pressed={paletteId === id}
            title={name}
            onClick={() => onSelect(id)}
          >
            <span
              className="theme-switcher__swatch"
              style={{
                background: `linear-gradient(135deg, ${p.pink}, ${p.turq})`,
              }}
            />
          </button>
        );
      })}
    </div>
  </div>
);

const App = () => {
  const [tweaks, setTweak] = useTweaks(loadTweakDefaults());

  const paletteVal = (() => {
    const p = PALETTES[tweaks.palette] || PALETTES.miami;
    return [p.pink, p.turq, p.sunset];
  })();

  React.useEffect(() => {
    const p = PALETTES[tweaks.palette] || PALETTES.miami;
    const r = document.documentElement;
    r.style.setProperty("--m-pink", p.pink);
    r.style.setProperty("--m-coral", p.coral);
    r.style.setProperty("--m-sunset", p.sunset);
    r.style.setProperty("--m-aqua", p.aqua);
    r.style.setProperty("--m-turquoise", p.turq);
    r.style.setProperty("--m-lemon", p.lemon);
    r.style.setProperty("--m-navy", p.navy);
    r.style.setProperty("--m-ink", p.ink);
    r.style.setProperty("--m-deep", p.deep);
    r.style.setProperty("--bg-base", p.bg);
    r.style.setProperty("--bg-soft", p.soft);

    const isNeonDark = tweaks.palette === "neon";
    if (isNeonDark) {
      r.style.setProperty("--text-main", "#f3eeff");
      r.style.setProperty("--text-soft", "rgba(243, 238, 255, 0.78)");
      r.style.setProperty("--text-muted", "rgba(243, 238, 255, 0.5)");
      r.style.setProperty("--bg-card", "rgba(255, 255, 255, 0.06)");
      r.style.setProperty("--surface-raised", "rgba(255, 255, 255, 0.07)");
      r.style.setProperty("--line", "rgba(255, 255, 255, 0.1)");
      r.style.setProperty("--line-strong", "rgba(255, 255, 255, 0.18)");
      r.style.setProperty("color-scheme", "dark");
    } else {
      r.style.setProperty("--text-main", "#1a2b4a");
      r.style.setProperty("--text-soft", "#4a5b7a");
      r.style.setProperty("--text-muted", "#7d8aa3");
      r.style.setProperty("--bg-card", "#ffffff");
      r.style.setProperty("--surface-raised", "#ffffff");
      r.style.setProperty("--line", "rgba(26, 43, 74, 0.08)");
      r.style.setProperty("--line-strong", "rgba(26, 43, 74, 0.16)");
      r.style.removeProperty("color-scheme");
    }
  }, [tweaks.palette]);

  React.useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });

  React.useEffect(() => {
    document.querySelectorAll(".float-card").forEach(el => {
      el.style.display = tweaks.showFloatCards ? "flex" : "none";
    });
  }, [tweaks.showFloatCards]);

  const applyPalette = React.useCallback((v) => {
    let key = Array.isArray(v) ? PALETTE_BY_PINK[v[0]] || "miami" : v;
    if (!PALETTES[key]) key = "miami";
    setTweak("palette", key);
    try {
      localStorage.setItem("cleanpro-palette", key);
    } catch (_) {}
  }, [setTweak]);

  return (
    <>
      <Topbar />
      <main>
        <Pricing />
        <Hero />
        <Marquee />
        <Problems />
        <Solution />
        <Process />
        <Checklist />
        <Testimonials />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />

      <ThemeSwitcher paletteId={tweaks.palette in PALETTES ? tweaks.palette : "miami"} onSelect={applyPalette} />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Палитра Майами">
          <TweakColor
            label="Цветовая схема"
            value={paletteVal}
            onChange={applyPalette}
            options={[
              ["#ff5e9c", "#2ec4c4", "#ffb347"],
              ["#ff4f7a", "#ff6b3d", "#ffa552"],
              ["#3aa9ff", "#1e8fb8", "#7eecd1"],
              ["#ff2d95", "#00cfb6", "#ffd400"],
            ]}
          />
        </TweakSection>
        <TweakSection title="Hero">
          <TweakToggle
            label="Floating-карточки"
            value={tweaks.showFloatCards}
            onChange={v => setTweak("showFloatCards", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
