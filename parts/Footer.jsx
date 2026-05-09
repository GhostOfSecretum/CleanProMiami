/* CTA banner + Footer */

const CTABanner = () => {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };
  return (
    <section id="contact" className="section--tight">
      <div className="container">
        <div className="cta-banner" data-reveal>
          <div style={{position: "relative", zIndex: 2}}>
            <p className="eyebrow" style={{color: "rgba(255,255,255,0.85)"}}>Ближайший слот · завтра 10:00</p>
            <h2 style={{marginTop: "12px"}}>Закажите уборку — приедем в фиксированный слот за 1.5 часа</h2>
            <p>
              Оставьте телефон — менеджер напишет в WhatsApp за 5 минут, подтвердит время и пришлёт точную
              стоимость. Никаких звонков-роботов и спама.
            </p>
            <div style={{display: "flex", gap: "20px", marginTop: "28px", flexWrap: "wrap", fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "0.92rem"}}>
              <span>✦ Без предоплаты</span>
              <span>✦ Гарантия 24 ч</span>
              <span>✦ Русскоязычный сервис</span>
            </div>
          </div>

          <form className="cta-banner__form" onSubmit={submit}>
            {sent ? (
              <div style={{textAlign: "center", padding: "20px", color: "#fff"}}>
                <div style={{fontSize: "2.5rem", marginBottom: "10px"}}>✓</div>
                <div style={{fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.05rem"}}>Заявка принята!</div>
                <div style={{marginTop: "6px", fontSize: "0.88rem", opacity: 0.85}}>Напишем в WhatsApp за 5 минут</div>
              </div>
            ) : (
              <>
                <input type="text" placeholder="Ваше имя" value={name} onChange={e => setName(e.target.value)} required />
                <input type="tel" placeholder="+1 (305) ___-____" value={phone} onChange={e => setPhone(e.target.value)} required />
                <button type="submit">Получить слот →</button>
                <div className="hint">Нажимая кнопку, вы соглашаетесь с условиями сервиса</div>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="foot">
    <div className="container">
      <div className="foot-grid">
        <div className="foot__about">
          <div className="brand" style={{color: "var(--m-cream)"}}>
            <BrandLogo />
            <span>CleanPro <span style={{color: "var(--m-pink)"}}>Miami</span></span>
          </div>
          <p>
            Клининговый сервис нового формата для квартир в Майами. Скорость, стандарты, контроль —
            и спокойствие в придачу.
          </p>
          <div style={{marginTop: "20px", display: "flex", gap: "10px"}}>
            <a href="#" style={{width: "38px", height: "38px", borderRadius: "50%", background: "rgba(255,244,230,0.08)", display: "grid", placeItems: "center", border: "1px solid rgba(255,244,230,0.1)"}}>✈</a>
            <a href="#" style={{width: "38px", height: "38px", borderRadius: "50%", background: "rgba(255,244,230,0.08)", display: "grid", placeItems: "center", border: "1px solid rgba(255,244,230,0.1)"}}>📱</a>
            <a href="#" style={{width: "38px", height: "38px", borderRadius: "50%", background: "rgba(255,244,230,0.08)", display: "grid", placeItems: "center", border: "1px solid rgba(255,244,230,0.1)"}}>📷</a>
          </div>
        </div>
        <div className="foot__col">
          <h5>Сервис</h5>
          <ul>
            <li><a href="#solution">Базовая уборка</a></li>
            <li><a href="#prices">Тарифы</a></li>
            <li><a href="#prices">Доп. услуги</a></li>
            <li><a href="#">Подписка</a></li>
            <li><a href="#">После ремонта</a></li>
          </ul>
        </div>
        <div className="foot__col">
          <h5>Компания</h5>
          <ul>
            <li><a href="#problem">О нас</a></li>
            <li><a href="#process">Как мы работаем</a></li>
            <li><a href="#checklist">Чек-лист</a></li>
            <li><a href="#">Карьера</a></li>
            <li><a href="#">Партнёрам</a></li>
          </ul>
        </div>
        <div className="foot__col">
          <h5>Связаться</h5>
          <ul>
            <li><a href="#">WhatsApp</a></li>
            <li><a href="#">Telegram</a></li>
            <li><a href="#">+1 (305) 555-0142</a></li>
            <li><a href="#">hello@cleanpro.miami</a></li>
            <li><a href="#">Brickell · MIA</a></li>
          </ul>
        </div>
      </div>
      <div className="foot__bottom">
        <span>© 2026 CleanPro Miami · Сделано для людей, которые ценят время</span>
        <div style={{display: "flex", gap: "20px"}}>
          <a href="#">Политика</a>
          <a href="#">Условия</a>
        </div>
      </div>
    </div>
  </footer>
);

Object.assign(window, { CTABanner, Footer });
