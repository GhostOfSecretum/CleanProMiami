/* Pricing, Process */

const Pricing = ({ tweaks }) => {
  const tiers = [
    {
      title: "Studio / 1-bed",
      name: "Express",
      desc: "До 60 м². Для квартир-студий и одной спальни.",
      price: 129,
      time: "1 час",
      featured: false,
      features: [
        "Команда 3 чел., 1 час",
        "Кухня + 1 санузел + 1 комната",
        "Чек-лист 40+ точек",
        "Фото до/после",
        "Эко-химия и инвентарь"
      ]
    },
    {
      title: "2-bed condo",
      name: "Standard",
      desc: "До 110 м². Самый популярный формат для семей и пар.",
      price: 189,
      time: "1.5 часа",
      featured: true,
      badge: "Хит",
      features: [
        "Команда 3 чел., 1.5 часа",
        "Кухня + 2 санузла + 2 спальни + гостиная",
        "Чек-лист 40+ точек, контроль старшим",
        "Фото до/после, отчет в WhatsApp",
        "Бесплатная замена постельного белья",
        "Гарантия повторной уборки 24ч"
      ]
    },
    {
      title: "3-bed +",
      name: "Premium",
      desc: "Большие квартиры, пентхаусы, после вечеринок и ремонта.",
      price: 279,
      time: "2 часа",
      featured: false,
      features: [
        "Команда 3 чел., 2 часа",
        "Все зоны квартиры",
        "Расширенный чек-лист 60+ точек",
        "Окна и балкон в комплекте",
        "Личный менеджер",
        "Приоритетные слоты в выходные"
      ]
    }
  ];

  return (
    <section id="prices" className="section pricing">
      <div className="container">
        <div className="s-head" data-reveal>
          <div>
            <p className="eyebrow">Тарифы</p>
            <h2>Прозрачные цены без скрытых доплат</h2>
          </div>
          <p className="s-head__right">
            Цена зависит только от площади квартиры. Химия, инвентарь, выезд команды и контроль качества —
            уже включены. Скидка 15% на повторные уборки по подписке.
          </p>
        </div>

        <div className="pricing-grid">
          {tiers.map((t, i) => (
            <div className={"price-card" + (t.featured ? " price-card--featured" : "")} key={i} data-reveal>
              {t.badge && <div className="price-card__badge">{t.badge}</div>}
              <div className="price-card__title">{t.title}</div>
              <div className="price-card__name">{t.name}</div>
              <div className="price-card__desc">{t.desc}</div>
              <div className="price-card__price">
                <span className="cur">$</span>
                <span className="num">{t.price}</span>
                <span className="per">/ {t.time}</span>
              </div>
              <ul className="price-card__list">
                {t.features.map((f, j) => <li key={j}>{f}</li>)}
              </ul>
              <a href="#contact" className={"btn " + (t.featured ? "btn--dark" : "btn--primary")}>
                Забронировать слот
              </a>
            </div>
          ))}
        </div>

        <div data-reveal style={{
          marginTop: "40px",
          background: "#fff",
          border: "1px solid var(--line)",
          borderRadius: "var(--r-xl)",
          padding: "32px",
          display: "grid",
          gridTemplateColumns: "1fr 2fr auto",
          gap: "24px",
          alignItems: "center"
        }}
        className="upsell-strip"
        >
          <div>
            <p className="eyebrow" style={{color: "var(--m-turquoise)"}}>One-stop service</p>
            <h3 style={{fontSize: "1.3rem", marginTop: "8px"}}>Всё в одном чате</h3>
          </div>
          <div style={{display: "flex", flexWrap: "wrap", gap: "10px"}}>
            {[
              { t: "Окна", p: "+$45" },
              { t: "Химчистка дивана", p: "+$80" },
              { t: "Холодильник", p: "+$25" },
              { t: "Духовка", p: "+$30" },
              { t: "Балкон", p: "+$35" },
              { t: "Глажка белья", p: "+$20" },
            ].map((u, i) => (
              <span key={i} style={{
                background: "var(--bg-soft)",
                border: "1px solid var(--line)",
                borderRadius: "var(--r-pill)",
                padding: "10px 16px",
                fontSize: "0.88rem",
                fontWeight: 500,
                display: "inline-flex", gap: "8px", alignItems: "center"
              }}>
                {u.t}
                <span style={{color: "var(--m-pink)", fontFamily: "var(--font-display)", fontWeight: 700}}>{u.p}</span>
              </span>
            ))}
          </div>
          <a href="#contact" className="btn btn--aqua">Добавить</a>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 760px) { .upsell-strip { grid-template-columns: 1fr !important; } }
      `}}/>
    </section>
  );
};

const Process = () => {
  const steps = [
    { n: "01", t: "Заявка в 1 клик", d: "Пишете в WhatsApp/Telegram, указываете адрес и удобный слот. Подтверждение — за 5 минут." },
    { n: "02", t: "Команда приезжает", d: "3 клинера, форменная одежда, свои химия и оборудование. Старший делает фото «до» и запускает таймер." },
    { n: "03", t: "Уборка по чек-листу", d: "Параллельная работа в трёх зонах. 40+ точек контроля. Никаких «забыли» — всё сверяется в приложении." },
    { n: "04", t: "Сдача и оплата", d: "Финальный обход со старшим, фото «после», чек в чат. Оплата картой или Apple Pay по факту." },
  ];
  return (
    <section id="process" className="section">
      <div className="container">
        <div className="s-head" data-reveal>
          <div>
            <p className="eyebrow">Как это работает</p>
            <h2>Четыре шага — от заявки до сияющей квартиры</h2>
          </div>
          <p className="s-head__right">
            Весь процесс занимает максимум 2.5 часа от момента, когда вы написали нам, до того,
            как закрылась дверь за командой. Никаких звонков, никаких «опоздаем на 40 минут».
          </p>
        </div>
        <div className="process-grid">
          {steps.map((s, i) => (
            <div className="step" key={i} data-reveal>
              <div className="step__num">{s.n}</div>
              <h4>{s.t}</h4>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { Pricing, Process });
