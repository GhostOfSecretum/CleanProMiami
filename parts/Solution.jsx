/* Solution section */

const Solution = () => (
  <section id="solution" className="section">
    <div className="container">
      <div className="s-head" data-reveal>
        <div>
          <p className="eyebrow">Наше решение</p>
          <h2>Скорость + Качество + Контроль = Доверие</h2>
        </div>
        <p className="s-head__right">
          CleanPro — это не «еще один клининг». Это продукт: фиксированное время, фиксированная команда,
          фиксированный чек-лист. Вы знаете, что получите, до того как мы приедем.
        </p>
      </div>

      <div className="features-grid">
        <div className="feature feature--showcase" data-reveal>
          <div className="copy">
            <p className="eyebrow" style={{color: "var(--m-aqua)"}}>Главный триггер</p>
            <h3>1.5 часа — и квартира сияет</h3>
            <p>
              Команда из 3 человек заходит в фиксированный слот, привозит свои химию и оборудование,
              работает по чек-листу и завершает уборку к назначенному времени. Никаких «еще немного,
              мы доделаем».
            </p>
            <div style={{marginTop: "28px", display: "flex", gap: "12px", flexWrap: "wrap"}}>
              <span style={{background: "rgba(255,244,230,0.08)", border: "1px solid rgba(255,244,230,0.15)", padding: "8px 14px", borderRadius: "var(--r-pill)", fontSize: "0.85rem"}}>3 клинера</span>
              <span style={{background: "rgba(255,244,230,0.08)", border: "1px solid rgba(255,244,230,0.15)", padding: "8px 14px", borderRadius: "var(--r-pill)", fontSize: "0.85rem"}}>Свой инвентарь</span>
              <span style={{background: "rgba(255,244,230,0.08)", border: "1px solid rgba(255,244,230,0.15)", padding: "8px 14px", borderRadius: "var(--r-pill)", fontSize: "0.85rem"}}>Эко-химия</span>
              <span style={{background: "rgba(255,244,230,0.08)", border: "1px solid rgba(255,244,230,0.15)", padding: "8px 14px", borderRadius: "var(--r-pill)", fontSize: "0.85rem"}}>Старший на объекте</span>
            </div>
          </div>
          <div className="visual">
            <div className="timer-ring">
              <div className="timer-ring__inner">
                <div className="big">1:38</div>
                <div className="lab">Среднее время</div>
              </div>
            </div>
          </div>
        </div>

        <div className="feature feature--time feature--big" data-reveal>
          <div className="ic-tile">⚡</div>
          <h3>Фиксированный тайм-слот</h3>
          <p>
            Выбираете удобное время — мы приезжаем минута в минуту и заканчиваем за оговоренные
            1–2 часа. Не подбираем «удобное окно дня» — у нас точное расписание.
          </p>
          <div style={{marginTop: "auto", paddingTop: "24px", display: "flex", gap: "8px", flexWrap: "wrap"}}>
            {["09:00", "11:00", "13:00", "15:00", "17:00"].map((t,i) => (
              <span key={i} style={{
                padding: "8px 14px", borderRadius: "var(--r-pill)",
                background: i === 2 ? "linear-gradient(135deg, var(--m-pink), var(--m-coral))" : "var(--bg-soft)",
                color: i === 2 ? "#fff" : "var(--text-soft)",
                fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.85rem",
                border: i === 2 ? "0" : "1px solid var(--line)"
              }}>{t}</span>
            ))}
          </div>
        </div>

        <div className="feature feature--team feature--med" data-reveal>
          <div className="ic-tile">👥</div>
          <h3>Команда из 3</h3>
          <p>Один на кухне, один в санузлах, один в комнатах. Параллельная работа — это и есть скорость.</p>
        </div>

        <div className="feature feature--check feature--med" data-reveal>
          <div className="ic-tile">✓</div>
          <h3>Чек-лист 40+</h3>
          <p>Каждая зона разложена на пункты. Ничего не забывается, ничего не пропускается.</p>
        </div>

        <div className="feature feature--photo feature--sm" data-reveal>
          <div className="ic-tile">📸</div>
          <h3>Фото до/после</h3>
          <p>Видите результат, даже если вас не было дома.</p>
        </div>

        <div className="feature feature--chat feature--sm" data-reveal>
          <div className="ic-tile">💬</div>
          <h3>WhatsApp / Telegram</h3>
          <p>Оплата, согласование доп.услуг, обратная связь — в одном чате.</p>
        </div>

        <div className="feature feature--gear feature--sm" data-reveal>
          <div className="ic-tile">🧴</div>
          <h3>Своя химия</h3>
          <p>Профессиональная, гипоаллергенная, безопасная для детей и питомцев.</p>
        </div>
      </div>
    </div>
  </section>
);

Object.assign(window, { Solution });
