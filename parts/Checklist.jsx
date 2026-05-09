/* Checklist (tabbed), Testimonials, FAQ */

const Checklist = () => {
  const zones = [
    { key: "input", label: "Входной контроль", count: 5, items: [
      "Осмотр квартиры со старшим", "Фиксация объёма работ", "Фото «до» каждой зоны",
      "Согласование доп. услуг", "Запуск таймера и распределение зон"
    ]},
    { key: "kitchen", label: "Кухня", count: 10, items: [
      "Очистка столешниц и фартука", "Плита и вытяжка", "Фасады кухонных шкафов",
      "Микроволновка снаружи и внутри", "Раковина, смеситель и слив",
      "Ручки и выключатели (дезинфекция)", "Обеденный стол и стулья",
      "Вынос мусора, замена пакета", "Холодильник снаружи (внутри — опция)",
      "Мытьё пола"
    ]},
    { key: "bath", label: "Ванная", count: 9, items: [
      "Унитаз — снаружи, внутри, основание", "Раковина и смеситель",
      "Душ / ванна, от налёта и плесени", "Стекло душевой — без разводов",
      "Зеркала и стеклянные поверхности", "Плитка — стены и швы",
      "Полки, держатели, дозаторы", "Пол, плинтусы и углы",
      "Контроль запаха и проветривание"
    ]},
    { key: "rooms", label: "Комнаты", count: 8, items: [
      "Удаление пыли со всех поверхностей", "Заправка кровати, расправление пледов",
      "Подоконники и рамы (внутри)", "Зеркала и стеклянные двери",
      "Декор, рамки, лампы — без разводов", "Дезинфекция выключателей и ручек",
      "Уборка под кроватью и диваном", "Вынос мусора"
    ]},
    { key: "floor", label: "Полы и финал", count: 6, items: [
      "Пылесос всех зон, включая ковры", "Мытьё пола профсредством",
      "Углы, плинтусы, под мебелью", "Устранение разводов и капель",
      "Обработка следов от обуви у входа", "Контроль сухости перед сдачей"
    ]},
    { key: "final", label: "Финальный контроль", count: 5, items: [
      "Обход старшим — проверка всех зон", "Сверка по чек-листу 40+",
      "Фото «после» каждой зоны", "Контроль запаха и свежести",
      "Подтверждение готовности клиенту"
    ]},
  ];

  const [active, setActive] = React.useState("kitchen");
  const current = zones.find(z => z.key === active);

  return (
    <section id="checklist" className="section checklist">
      <div className="container">
        <div className="s-head" data-reveal>
          <div>
            <p className="eyebrow" style={{color: "var(--m-aqua)"}}>Стандарт качества</p>
            <h2>40+ точек контроля. Без «забыли».</h2>
          </div>
          <p className="s-head__right">
            Каждая уборка идет по одному и тому же чек-листу. Старший проверяет каждый пункт перед сдачей —
            если что-то пропущено, мы возвращаемся бесплатно. Это не маркетинг, это операционка.
          </p>
        </div>

        <div className="checklist-tabs" data-reveal>
          {zones.map(z => (
            <button key={z.key} className={"checklist-tab" + (active === z.key ? " active" : "")}
              onClick={() => setActive(z.key)}>
              {z.label}
              <span className="count">{z.count}</span>
            </button>
          ))}
        </div>

        <div className="checklist-content" key={active}>
          {current.items.map((it, i) => (
            <div className="checklist-item" key={i} style={{animation: `fadeUp 0.4s ${i * 0.04}s both`}}>
              <div className="check">✓</div>
              <span>{it}</span>
            </div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}}/>
    </section>
  );
};

const Testimonials = () => {
  const items = [
    { stars: 5, q: "Сначала не верила, что за 1.5 часа три человека успеют всё. Успели. И ещё фото отчитались — впервые видела такое в Майами.",
      name: "Анна К.", meta: "Brickell · 2-bed condo", a: "a1", initials: "АК" },
    { stars: 5, q: "Заказывали после переезда — квартира выглядела как после ремонта. CleanPro вернули её в состояние «можно жить». Всё чётко, в WhatsApp.",
      name: "Дмитрий В.", meta: "Sunny Isles · 3-bed", a: "a2", initials: "ДВ" },
    { stars: 5, q: "Подписка на еженедельную уборку — лучшее решение этого года. Слот всегда в одно время, команда уже знает мои нюансы. Минус одна забота.",
      name: "Елена М.", meta: "Aventura · pent­house", a: "a3", initials: "ЕМ" },
  ];
  return (
    <section className="section testimonials">
      <div className="container">
        <div className="s-head" data-reveal>
          <div>
            <p className="eyebrow">Отзывы</p>
            <h2>Клиенты возвращаются — и приводят соседей</h2>
          </div>
          <p className="s-head__right">
            4.9 из 5 на основе 327 отзывов. 68% клиентов переходят на подписку после первой уборки.
            Мы работаем в Майами с 2023 года и обслужили 4200+ квартир.
          </p>
        </div>
        <div className="testimonials-grid">
          {items.map((t, i) => (
            <div className="testimonial" key={i} data-reveal>
              <div className="stars">{"★".repeat(t.stars)}</div>
              <p className="quote">«{t.q}»</p>
              <div className="author">
                <div className={"avatar " + t.a}>{t.initials}</div>
                <div>
                  <div className="name">{t.name}</div>
                  <div className="meta">{t.meta}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const items = [
    { q: "Сколько реально длится уборка?",
      a: "Studio / 1-bed — 1 час, 2-bed — 1.5 часа, 3-bed+ — 2 часа. Это не «примерное время», а зафиксированный слот. Старший запускает таймер на входе и сдаёт квартиру строго в окно." },
    { q: "А если за это время не успеете?",
      a: "Доделываем за свой счёт. Это часть стандарта — клиент не платит за наши просчёты. На практике опаздываем меньше чем в 2% случаев, чаще всего из-за непредвиденных загрязнений после ремонта." },
    { q: "Что если мне не понравится результат?",
      a: "Сообщаете в чат в течение 24 часов — приезжаем повторно бесплатно и доделываем именно те зоны, к которым есть вопросы. Деньги не возвращаем — но переуборка обычно решает всё." },
    { q: "Своя химия — обязательно?",
      a: "Да. У нас профессиональная гипоаллергенная химия, безопасная для детей и питомцев. Если у вас есть свои средства, которые вы предпочитаете — используем их без вопросов." },
    { q: "Можно ли убрать без меня дома?",
      a: "Конечно. Большинство наших клиентов так и делают — оставляют код от двери в защищённом чате. Вы получаете фото «до» и «после» каждой зоны, плюс live-чек по чек-листу." },
    { q: "Подписка — это что?",
      a: "Регулярные уборки (раз в неделю, две недели или месяц) с фиксированным слотом и скидкой 15%. Та же команда, тот же чек-лист. Можно поставить на паузу или отменить в любой момент." },
    { q: "Работаете в моём районе?",
      a: "Brickell, Edgewater, Wynwood, Mid-Beach, South Beach, Sunny Isles, Aventura, Coral Gables, Coconut Grove, Bay Harbor. Если вашего района нет в списке — уточните в WhatsApp, часто можем подъехать." },
  ];
  const [open, setOpen] = React.useState(0);
  return (
    <section id="faq" className="section faq">
      <div className="container">
        <div className="s-head" data-reveal>
          <div>
            <p className="eyebrow">Вопросы</p>
            <h2>Что обычно спрашивают перед заказом</h2>
          </div>
          <p className="s-head__right">
            Если что-то осталось непонятным — напишите в WhatsApp, ответим за 5 минут.
            Мы стараемся объяснять всё «на берегу», чтобы у вас не было сюрпризов.
          </p>
        </div>
        <div className="faq-list">
          {items.map((it, i) => (
            <div className={"faq-item" + (open === i ? " open" : "")} key={i}
              onClick={() => setOpen(open === i ? -1 : i)}>
              <div className="faq-item__head">
                <div className="faq-item__q">{it.q}</div>
                <div className="faq-item__plus">+</div>
              </div>
              <div className="faq-item__a">{it.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { Checklist, Testimonials, FAQ });
