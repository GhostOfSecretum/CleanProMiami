/* Pricing, Process — слоты, допы с суммой, модалка контакт → оплата */

const PRICING_TIERS = [
  {
    name: "Standard",
    desc: "До 60 м². Для квартир-студий и одной спальни.",
    price: 129,
    time: "1 час",
    featured: false,
  },
  {
    name: "General",
    desc: "До 110 м². Самый популярный формат для семей и пар.",
    price: 189,
    time: "1.5 часа",
    featured: true,
    badge: "Хит",
  },
];

const DISTRICTS = [
  { id: "brickell", label: "Brickell" },
  { id: "edgewater", label: "Edgewater" },
  { id: "wynwood", label: "Wynwood" },
  { id: "mid-beach", label: "Mid-Beach" },
  { id: "south-beach", label: "South Beach" },
  { id: "sunny-isles", label: "Sunny Isles" },
  { id: "aventura", label: "Aventura" },
  { id: "coral-gables", label: "Coral Gables" },
];

const BED_OPTIONS = [
  { id: "1", label: "1 bed" },
  { id: "2", label: "2 bed" },
  { id: "3", label: "3 bed" },
  { id: "3plus", label: "3+ bed" },
];

const TIME_SLOTS = [
  { id: "09:00", label: "09:00" },
  { id: "11:30", label: "11:30" },
  { id: "14:00", label: "14:00" },
  { id: "16:30", label: "16:30" },
];

const EXTRA_SERVICES = [
  { id: "windows", label: "Окна", price: 45 },
  { id: "sofa", label: "Химчистка дивана", price: 80 },
  { id: "fridge", label: "Холодильник", price: 25 },
  { id: "oven", label: "Духовка", price: 30 },
  { id: "balcony", label: "Балкон", price: 35 },
  { id: "ironing", label: "Глажка белья", price: 20 },
];

function emptySlotSelection() {
  return { district: "", beds: "", slot: "", extras: {} };
}

function sumExtras(extras) {
  if (!extras) return 0;
  return EXTRA_SERVICES.reduce((s, e) => (extras[e.id] ? s + e.price : s), 0);
}

function formatMoney(n) {
  return `$${n}`;
}

const Pricing = () => {
  const [selections, setSelections] = React.useState(() =>
    PRICING_TIERS.map(() => emptySlotSelection())
  );
  const [cardErrors, setCardErrors] = React.useState(() => PRICING_TIERS.map(() => ""));
  const [modal, setModal] = React.useState(null);
  const [modalStep, setModalStep] = React.useState(1);
  const [contact, setContact] = React.useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
  });
  const [modalError, setModalError] = React.useState("");

  const setSel = React.useCallback((tierIndex, patch) => {
    setSelections((prev) => {
      const next = [...prev];
      next[tierIndex] = { ...next[tierIndex], ...patch };
      return next;
    });
    setCardErrors((prev) => {
      const next = [...prev];
      next[tierIndex] = "";
      return next;
    });
  }, []);

  const toggleExtra = React.useCallback((tierIndex, id) => {
    setSelections((prev) => {
      const next = [...prev];
      const ex = { ...next[tierIndex].extras };
      if (ex[id]) delete ex[id];
      else ex[id] = true;
      next[tierIndex] = { ...next[tierIndex], extras: ex };
      return next;
    });
  }, []);

  const closeModal = React.useCallback(() => {
    setModal(null);
    setModalStep(1);
    setModalError("");
  }, []);

  React.useEffect(() => {
    if (!modal) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [modal, closeModal]);

  const openBooking = (tierIndex) => {
    const s = selections[tierIndex];
    if (!s.district || !s.beds || !s.slot) {
      setCardErrors((prev) => {
        const next = [...prev];
        next[tierIndex] = "Выберите район, размер квартиры и время слота.";
        return next;
      });
      return;
    }
    setModal({ tierIndex });
    setModalStep(1);
    setModalError("");
  };

  const goToPaymentStep = () => {
    const { firstName, lastName, address, phone } = contact;
    if (!firstName.trim() || !lastName.trim() || !address.trim() || !phone.trim()) {
      setModalError("Заполните все поля.");
      return;
    }
    setModalError("");
    setModalStep(2);
  };

  const activeTier = modal != null ? PRICING_TIERS[modal.tierIndex] : null;
  const activeSel = modal != null ? selections[modal.tierIndex] : null;
  const activeExtrasSum = modal != null ? sumExtras(activeSel.extras) : 0;
  const activeTotal = modal != null ? activeTier.price + activeExtrasSum : 0;

  const districtLabel = (id) => DISTRICTS.find((d) => d.id === id)?.label || id;
  const bedLabel = (id) => BED_OPTIONS.find((b) => b.id === id)?.label || id;

  return (
    <section id="prices" className="section pricing pricing--hero">
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
          {PRICING_TIERS.map((t, i) => {
            const s = selections[i];
            const extraSum = sumExtras(s.extras);
            const total = t.price + extraSum;
            return (
              <div
                className={"price-card" + (t.featured ? " price-card--featured" : "")}
                key={i}
                data-reveal
              >
                {t.badge && <div className="price-card__badge">{t.badge}</div>}
                <div className="price-card__name">{t.name}</div>
                <div className="price-card__desc">{t.desc}</div>
                <div className="price-card__price">
                  <span className="cur">$</span>
                  <span className="num">{total}</span>
                  <span className="per">/ {t.time}</span>
                </div>
                {extraSum > 0 && (
                  <p className="price-card__price-note">
                    База ${t.price} + доп. ${extraSum}
                  </p>
                )}

                <div className="slot-picker">
                  <div className="slot-picker__group">
                    <div className="slot-picker__legend">Район</div>
                    <div className="slot-picker__opts slot-picker__opts--scroll">
                      {DISTRICTS.map((d) => (
                        <label key={d.id} className="slot-opt">
                          <input
                            type="radio"
                            name={`district-${i}`}
                            checked={s.district === d.id}
                            onChange={() => setSel(i, { district: d.id })}
                          />
                          <span>{d.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="slot-picker__group">
                    <div className="slot-picker__legend">Размер кв.</div>
                    <div className="slot-picker__opts slot-picker__opts--row">
                      {BED_OPTIONS.map((b) => (
                        <label key={b.id} className="slot-opt slot-opt--compact">
                          <input
                            type="radio"
                            name={`beds-${i}`}
                            checked={s.beds === b.id}
                            onChange={() => setSel(i, { beds: b.id })}
                          />
                          <span>{b.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="slot-picker__group">
                    <div className="slot-picker__legend">Тайм-слот</div>
                    <div className="slot-picker__opts slot-picker__opts--row">
                      {TIME_SLOTS.map((tm) => (
                        <label key={tm.id} className="slot-opt slot-opt--compact">
                          <input
                            type="radio"
                            name={`slot-${i}`}
                            checked={s.slot === tm.id}
                            onChange={() => setSel(i, { slot: tm.id })}
                          />
                          <span>{tm.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="slot-picker__group">
                    <div className="slot-picker__legend">Доп. услуги</div>
                    <div className="slot-picker__opts slot-picker__opts--stack">
                      {EXTRA_SERVICES.map((ex) => (
                        <label key={ex.id} className="slot-opt slot-opt--extra">
                          <input
                            type="checkbox"
                            checked={!!s.extras[ex.id]}
                            onChange={() => toggleExtra(i, ex.id)}
                          />
                          <span className="slot-opt__label-text">{ex.label}</span>
                          <span className="slot-opt__price">+${ex.price}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {cardErrors[i] && <p className="price-card__pick-error">{cardErrors[i]}</p>}

                <button
                  type="button"
                  className={"btn " + (t.featured ? "btn--dark" : "btn--primary")}
                  onClick={() => openBooking(i)}
                  style={{ marginTop: "auto", width: "100%", justifyContent: "center" }}
                >
                  Забронировать слот
                </button>
              </div>
            );
          })}
        </div>

        <div
          data-reveal
          style={{
            marginTop: "40px",
            background: "var(--surface-raised)",
            border: "1px solid var(--line)",
            borderRadius: "var(--r-xl)",
            padding: "32px",
            display: "grid",
            gridTemplateColumns: "1fr 2fr auto",
            gap: "24px",
            alignItems: "center",
          }}
          className="upsell-strip"
        >
          <div>
            <p className="eyebrow" style={{ color: "var(--m-turquoise)" }}>
              One-stop service
            </p>
            <h3 style={{ fontSize: "1.3rem", marginTop: "8px" }}>Всё в одном чате</h3>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {EXTRA_SERVICES.map((u) => (
              <span
                key={u.id}
                style={{
                  background: "var(--bg-soft)",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--r-pill)",
                  padding: "10px 16px",
                  fontSize: "0.88rem",
                  fontWeight: 500,
                  display: "inline-flex",
                  gap: "8px",
                  alignItems: "center",
                }}
              >
                {u.label}
                <span style={{ color: "var(--m-pink)", fontFamily: "var(--font-display)", fontWeight: 700 }}>
                  +${u.price}
                </span>
              </span>
            ))}
          </div>
          <a href="#contact" className="btn btn--aqua">
            Добавить
          </a>
        </div>
      </div>

      {modal != null && activeTier && activeSel && (
        <div
          className="booking-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
        >
          <button type="button" className="booking-modal__backdrop" aria-label="Закрыть" onClick={closeModal} />
          <div className="booking-modal__panel">
            <div className="booking-modal__head">
              <h3 id="booking-modal-title">Бронирование · {activeTier.name}</h3>
              <button type="button" className="booking-modal__close" onClick={closeModal} aria-label="Закрыть">
                ×
              </button>
            </div>

            <div className="booking-modal__steps">
              <span className={modalStep === 1 ? "is-active" : ""}>1. Контакты</span>
              <span className="booking-modal__steps-sep">→</span>
              <span className={modalStep === 2 ? "is-active" : ""}>2. Оплата</span>
            </div>

            <div className="booking-modal__summary">
              <div>
                <strong>{districtLabel(activeSel.district)}</strong> · {bedLabel(activeSel.beds)} · слот{" "}
                {activeSel.slot}
              </div>
              <div className="booking-modal__summary-extras">
                {EXTRA_SERVICES.filter((e) => activeSel.extras[e.id]).length === 0
                  ? "Без дополнительных услуг"
                  : EXTRA_SERVICES.filter((e) => activeSel.extras[e.id])
                      .map((e) => `${e.label} (+$${e.price})`)
                      .join(" · ")}
              </div>
              <div className="booking-modal__summary-total">К оплате: {formatMoney(activeTotal)}</div>
            </div>

            {modalStep === 1 && (
              <div className="booking-modal__form">
                <div className="booking-modal__row2">
                  <label className="booking-field">
                    <span>Имя</span>
                    <input
                      value={contact.firstName}
                      onChange={(e) => setContact((c) => ({ ...c, firstName: e.target.value }))}
                      autoComplete="given-name"
                      placeholder="Иван"
                    />
                  </label>
                  <label className="booking-field">
                    <span>Фамилия</span>
                    <input
                      value={contact.lastName}
                      onChange={(e) => setContact((c) => ({ ...c, lastName: e.target.value }))}
                      autoComplete="family-name"
                      placeholder="Иванов"
                    />
                  </label>
                </div>
                <label className="booking-field">
                  <span>Адрес</span>
                  <input
                    value={contact.address}
                    onChange={(e) => setContact((c) => ({ ...c, address: e.target.value }))}
                    autoComplete="street-address"
                    placeholder="Улица, дом, кв., подъезд"
                  />
                </label>
                <label className="booking-field">
                  <span>Телефон</span>
                  <input
                    value={contact.phone}
                    onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="+1 …"
                  />
                </label>
                {modalError && <p className="booking-modal__error">{modalError}</p>}
                <div className="booking-modal__actions">
                  <button type="button" className="btn btn--ghost" onClick={closeModal}>
                    Отмена
                  </button>
                  <button type="button" className="btn btn--primary" onClick={goToPaymentStep}>
                    Далее к оплате
                  </button>
                </div>
              </div>
            )}

            {modalStep === 2 && (
              <div className="booking-modal__form">
                <div className="booking-pay-placeholder">
                  <p>
                    Здесь будет форма оплаты: интеграция со Stripe, PayPal или другим эквайрингом — подключим на
                    следующем этапе.
                  </p>
                  <div className="booking-pay-placeholder__card">
                    <span className="booking-pay-placeholder__chip" />
                    <span>···· ···· ···· ····</span>
                  </div>
                </div>
                <p className="booking-modal__total-again">Сумма заказа: {formatMoney(activeTotal)}</p>
                <div className="booking-modal__actions">
                  <button type="button" className="btn btn--ghost" onClick={() => setModalStep(1)}>
                    Назад
                  </button>
                  <button type="button" className="btn btn--primary" disabled title="Платёжный сервис подключается позже">
                    Оплатить
                  </button>
                </div>
                <p className="booking-modal__hint">Кнопка «Оплатить» станет активной после подключения провайдера.</p>
              </div>
            )}
          </div>
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media (max-width: 760px) { .upsell-strip { grid-template-columns: 1fr !important; } }
      `,
        }}
      />
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
