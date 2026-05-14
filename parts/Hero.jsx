/* CleanPro — Hero, Topbar, Marquee */

const BrandLogo = () => (
  <span className="brand__logo-wrap" aria-hidden="true">
    <img className="brand__logo-img" src="logo.png?v=2" alt="" width={36} height={36} decoding="async" />
  </span>
);

const Topbar = () => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={"topbar" + (scrolled ? " scrolled" : "")}>
      <div className="container topbar__inner">
        <a href="#prices" className="brand">
          <BrandLogo />
          <span>CleanPro <span style={{color: "var(--m-pink)"}}>Miami</span></span>
        </a>
        <nav className="nav">
          <a href="#problem">Проблема</a>
          <a href="#solution">Решение</a>
          <a href="#prices">Цены</a>
          <a href="#process">Процесс</a>
          <a href="#checklist">Чек-лист</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="topbar__cta">
          <a href="tel:+79689608888" className="topbar__phone">+7(968)960-88-88</a>
          <a href="#contact" className="btn btn--primary" style={{padding: "12px 22px"}}>Заказать</a>
        </div>
      </div>
    </header>
  );
};

const Hero = () => (
  <section id="intro" className="hero">
    <div className="container hero__grid">
      <div data-reveal>
        <div className="hero__eyebrow">
          <span className="dot"></span>
          <span>Принимаем заказы на эту неделю · Майами</span>
        </div>
        <h1 className="hero__title">
          Идеальная чистота за <span className="underline">1–2 часа</span>.
        </h1>
        <p className="hero__sub">
          CleanPro — клининг нового формата для квартир в Майами. Команда из 3 человек,
          фиксированный тайм-слот, чек-лист на 40+ точек и фото до/после. Вы получаете
          предсказуемый результат, а не «как получится».
        </p>
        <div className="hero__ctas">
          <a href="#contact" className="btn btn--primary">Забронировать слот →</a>
          <a href="#process" className="btn btn--ghost">Как мы убираем</a>
        </div>
        <div className="hero__stats">
          <div className="hero__stat">
            <div className="num">1–2 ч</div>
            <div className="label">Время уборки</div>
          </div>
          <div className="hero__stat">
            <div className="num">40+</div>
            <div className="label">Точек контроля</div>
          </div>
          <div className="hero__stat">
            <div className="num">3</div>
            <div className="label">Клинера на объект</div>
          </div>
          <div className="hero__stat">
            <div className="num">4.9★</div>
            <div className="label">Рейтинг 320+ отзывов</div>
          </div>
        </div>
      </div>

      {/* Visual: phone mock + floating cards */}
      <div className="hero__visual" data-reveal>
        <div className="hero__shape">
          <div className="hero__blob"></div>
        </div>

        <div className="hero__phone">
          <div className="phone-screen">
            <div className="phone-header">
              <div className="greet">
                Привет, Анна
                <small>Сегодня · 14:30</small>
              </div>
              <div className="avatar"></div>
            </div>

            <div className="phone-card__hero">
              <h4>Команда уже в пути</h4>
              <p>3 клинера · приедут к 15:00 · 2-bed condo</p>
              <span className="price">Слот · 1.5 часа</span>
              <div className="bubble"></div>
            </div>

            <div className="phone-row">
              <div className="phone-pill">
                <div className="icon pink">⚡</div>
                Standard
              </div>
              <div className="phone-pill">
                <div className="icon aqua">🪟</div>
                Окна
              </div>
              <div className="phone-pill">
                <div className="icon sun">🛏️</div>
                Бельё
              </div>
            </div>

            <div className="phone-list">
              <div className="phone-list__head">
                <span>Чек-лист сегодня</span>
                <span className="more">42 точки</span>
              </div>
              <div className="phone-list__row">
                <div className="check">✓</div> Кухня — техника, фасады
              </div>
              <div className="phone-list__row">
                <div className="check">✓</div> Ванная — стекло, плитка
              </div>
              <div className="phone-list__row">
                <div className="check">✓</div> Спальня — пыль, бельё
              </div>
              <div className="phone-list__row">
                <div className="check" style={{background: "var(--m-pink)", color: "#fff"}}>•</div>
                <span style={{color: "var(--m-pink)"}}>Контроль старшим…</span>
              </div>
            </div>
          </div>
        </div>

        <div className="float-card float-card--rating">
          <div className="ic" style={{background: "linear-gradient(135deg, var(--m-sunset), var(--m-lemon))", color: "var(--m-deep)"}}>★</div>
          <div>
            <div className="label">Рейтинг команды</div>
            <div className="value">4.9 · 327 отз.</div>
          </div>
        </div>

        <div className="float-card float-card--booking">
          <div className="ic" style={{background: "linear-gradient(135deg, var(--m-aqua), var(--m-turquoise))", color: "var(--m-deep)"}}>📅</div>
          <div>
            <div className="label">Ближайший слот</div>
            <div className="value">Завтра, 10:00</div>
          </div>
        </div>

        <div className="float-card float-card--time">
          <div className="ic" style={{background: "linear-gradient(135deg, var(--m-pink), var(--m-coral))"}}>⏱</div>
          <div>
            <div className="label">Среднее время</div>
            <div className="value">1 ч 38 мин</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Marquee = () => {
  const items = [
    { t: "Brickell" }, { t: "Edgewater" }, { t: "Wynwood" }, { t: "Mid-Beach" },
    { t: "South Beach" }, { t: "Sunny Isles" }, { t: "Aventura" }, { t: "Coral Gables" },
    { t: "Coconut Grove" }, { t: "Bay Harbor" },
  ];
  const all = [...items, ...items];
  return (
    <section className="marquee">
      <div className="marquee__track">
        {all.map((it, i) => (
          <span className="marquee__item" key={i}>
            <span className="marquee__star">✦</span>
            <span>{it.t}</span>
          </span>
        ))}
      </div>
    </section>
  );
};

Object.assign(window, { Topbar, Hero, Marquee, BrandLogo });
