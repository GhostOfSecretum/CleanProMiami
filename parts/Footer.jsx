/* Footer */

const Footer = () => (
  <footer id="contact" className="foot">
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
            <li><a href="#solution">О нас</a></li>
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
            <li><a href="tel:+13054648888">+1(305)464-8888</a></li>
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

Object.assign(window, { Footer });
