/* Pricing, Process — слоты, допы с суммой, модалка контакт → оплата */

const PRICING_TIERS = [
  {
    name: "Standard",
    price: 160,
    featured: true,
    badge: "Хит",
  },
  {
    name: "General",
    price: 280,
    featured: false,
  },
];

const DISTRICTS = [
  { id: "sunny-isles", label: "Sunny Isles" },
  { id: "aventura", label: "Aventura" },
  { id: "hallandale", label: "Hallandale Beach" },
  { id: "hollywood", label: "Hollywood" },
];

const BED_OPTIONS = [
  { id: "1", label: "1 bed", addOn: 0 },
  { id: "2", label: "2 bed", addOn: 80 },
  { id: "3", label: "3 bed", addOn: 200 },
  { id: "3plus", label: "3+ bed", addOn: 280 },
];

function bedAddOn(bedId) {
  if (!bedId) return 0;
  return BED_OPTIONS.find((b) => b.id === bedId)?.addOn ?? 0;
}

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

function summarizeExtras(extras) {
  const sum = sumExtras(extras);
  const count = EXTRA_SERVICES.filter((e) => extras[e.id]).length;
  if (count === 0) return "Не выбраны";
  return `${count} шт. · +$${sum}`;
}

function formatMoney(n) {
  return `$${n}`;
}

const Pricing = () => {
  const [selections, setSelections] = React.useState(() =>
    PRICING_TIERS.map(() => emptySlotSelection())
  );
  const [openSlotGroup, setOpenSlotGroup] = React.useState(() =>
    PRICING_TIERS.map(() => null)
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

  const toggleSlotPanel = React.useCallback((tierIndex, groupId) => {
    setOpenSlotGroup((prev) => {
      const next = [...prev];
      next[tierIndex] = prev[tierIndex] === groupId ? null : groupId;
      return next;
    });
  }, []);

  const closeSlotPanel = React.useCallback((tierIndex) => {
    setOpenSlotGroup((prev) => {
      const next = [...prev];
      next[tierIndex] = null;
      return next;
    });
  }, []);

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

  const pickDistrict = React.useCallback(
    (tierIndex, id) => {
      setSel(tierIndex, { district: id });
      closeSlotPanel(tierIndex);
    },
    [setSel, closeSlotPanel]
  );

  const toggleExtra = React.useCallback((tierIndex, id) => {
    setSelections((prev) => {
      const next = [...prev];
      const ex = { ...next[tierIndex].extras };
      if (ex[id]) delete ex[id];
      else ex[id] = true;
      next[tierIndex] = { ...next[tierIndex], extras: ex };
      return next;
    });
    setCardErrors((prev) => {
      const next = [...prev];
      next[tierIndex] = "";
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
    return () => {
      document.body.style.overflow = prev;
    };
  }, [modal]);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (modal) closeModal();
      else setOpenSlotGroup(PRICING_TIERS.map(() => null));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
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
    setOpenSlotGroup(PRICING_TIERS.map(() => null));
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
  const activeBedAdd = modal != null ? bedAddOn(activeSel.beds) : 0;
  const activeTotal =
    modal != null ? activeTier.price + activeBedAdd + activeExtrasSum : 0;

  const districtLabel = (id) => DISTRICTS.find((d) => d.id === id)?.label || id;
  const bedLabel = (id) => BED_OPTIONS.find((b) => b.id === id)?.label || id;

  return (
    <section id="prices" className="section pricing pricing--hero">
      <div className="container">
        <div className="s-head" data-reveal>
          <div>
            <h2>
              Идеальная чистота за<br />
              <span className="underline">2 часа</span>.
            </h2>
          </div>
          <p className="s-head__right hero__sub">
            CleanPro — клининг нового формата для квартир в Майами. Команда из 3 человек,
            фиксированный тайм-слот, чек-лист на 40+ точек и фото до/после. Вы получаете
            предсказуемый результат, а не «как получится».
          </p>
        </div>

        <div className="pricing-grid">
          {PRICING_TIERS.map((t, i) => {
            const s = selections[i];
            const open = openSlotGroup[i];
            return (
              <div
                className={"price-card" + (t.featured ? " price-card--featured" : "")}
                key={i}
                data-reveal
              >
                {t.badge && <div className="price-card__badge">{t.badge}</div>}
                <div className="price-card__name">{t.name}</div>
                <div className="price-card__price">
                  <span className="cur">$</span>
                  <span className="num">{t.price}</span>
                </div>

                <div className="slot-picker">
                  <div className="slot-picker__group slot-picker__group--inline">
                    <div className="slot-picker__legend-inline">Тайм-слот</div>
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

                  <div className="slot-picker__group slot-picker__group--inline">
                    <div className="slot-picker__legend-inline">Размер кв.</div>
                    <div className="slot-picker__opts slot-picker__opts--row">
                      {BED_OPTIONS.map((b) => (
                        <label key={b.id} className="slot-opt slot-opt--compact slot-opt--bed">
                          <input
                            type="radio"
                            name={`beds-${i}`}
                            checked={s.beds === b.id}
                            onChange={() => setSel(i, { beds: b.id })}
                          />
                          <span className="slot-opt__label-text">{b.label}</span>
                          <span className="slot-opt__price">{b.addOn === 0 ? "+0" : `+$${b.addOn}`}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className={"slot-picker__group" + (open === "district" ? " is-open" : "")}>
                    <button
                      type="button"
                      className="slot-picker__trigger"
                      aria-expanded={open === "district"}
                      aria-controls={`slot-panel-district-${i}`}
                      id={`slot-trigger-district-${i}`}
                      onClick={() => toggleSlotPanel(i, "district")}
                    >
                      <span className="slot-picker__trigger-meta">
                        <span className="slot-picker__trigger-label">Район</span>
                        <span className="slot-picker__trigger-value">
                          {s.district ? districtLabel(s.district) : "Выбрать"}
                        </span>
                      </span>
                      <span className="slot-picker__chev" aria-hidden>
                        ▾
                      </span>
                    </button>
                    {open === "district" && (
                      <div
                        className="slot-picker__panel"
                        id={`slot-panel-district-${i}`}
                        role="region"
                        aria-labelledby={`slot-trigger-district-${i}`}
                      >
                        <div className="slot-picker__opts slot-picker__opts--scroll">
                          {DISTRICTS.map((d) => (
                            <label key={d.id} className="slot-opt">
                              <input
                                type="radio"
                                name={`district-${i}`}
                                checked={s.district === d.id}
                                onChange={() => pickDistrict(i, d.id)}
                              />
                              <span>{d.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={"slot-picker__group" + (open === "extras" ? " is-open" : "")}>
                    <button
                      type="button"
                      className="slot-picker__trigger"
                      aria-expanded={open === "extras"}
                      aria-controls={`slot-panel-extras-${i}`}
                      id={`slot-trigger-extras-${i}`}
                      onClick={() => toggleSlotPanel(i, "extras")}
                    >
                      <span className="slot-picker__trigger-meta">
                        <span className="slot-picker__trigger-label">Доп. услуги</span>
                        <span className="slot-picker__trigger-value">{summarizeExtras(s.extras)}</span>
                      </span>
                      <span className="slot-picker__chev" aria-hidden>
                        ▾
                      </span>
                    </button>
                    {open === "extras" && (
                      <div
                        className="slot-picker__panel"
                        id={`slot-panel-extras-${i}`}
                        role="region"
                        aria-labelledby={`slot-trigger-extras-${i}`}
                      >
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
                        <button
                          type="button"
                          className="slot-picker__done"
                          onClick={() => closeSlotPanel(i)}
                        >
                          Готово
                        </button>
                      </div>
                    )}
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
              <div className="booking-modal__summary-breakdown">
                {activeBedAdd > 0 || activeExtrasSum > 0 ? (
                  <>
                    <div>Базовый тариф: {formatMoney(activeTier.price)}</div>
                    {activeBedAdd > 0 && (
                      <div>
                        Размер кв. ({bedLabel(activeSel.beds)}): +${activeBedAdd}
                      </div>
                    )}
                    {activeExtrasSum > 0 && (
                      <div>Доп. услуги: {formatMoney(activeExtrasSum)}</div>
                    )}
                    <div className="booking-modal__summary-total">Итого: {formatMoney(activeTotal)}</div>
                  </>
                ) : (
                  <div className="booking-modal__summary-total">К оплате: {formatMoney(activeTotal)}</div>
                )}
              </div>
            </div>

            {modalStep === 1 && (
              <div className="booking-modal__form">
                <div className="booking-modal__row2">
                  <label className="booking-field">
                    <span>First name</span>
                    <input
                      value={contact.firstName}
                      onChange={(e) => setContact((c) => ({ ...c, firstName: e.target.value }))}
                      autoComplete="given-name"
                      placeholder="John"
                    />
                  </label>
                  <label className="booking-field">
                    <span>Last name</span>
                    <input
                      value={contact.lastName}
                      onChange={(e) => setContact((c) => ({ ...c, lastName: e.target.value }))}
                      autoComplete="family-name"
                      placeholder="Garcia"
                    />
                  </label>
                </div>
                <label className="booking-field">
                  <span>Address</span>
                  <input
                    value={contact.address}
                    onChange={(e) => setContact((c) => ({ ...c, address: e.target.value }))}
                    autoComplete="street-address"
                    placeholder="e.g. 1450 Brickell Ave, Unit 3204, Miami, FL 33131"
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
