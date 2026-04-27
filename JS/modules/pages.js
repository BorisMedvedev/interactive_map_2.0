// pages.js — контент динамических страниц (версия 7.0)

// ─── Данные новостей ──────────────────────────────────────────────────────────
const newsData = [
  {
    id: 1,
    date: '22 апреля 2026',
    title: 'Открытие нового молочного цеха на ферме Артемьевой',
    category: 'Производство',
    categoryColor: '#3b8c4a',
    text: 'ИП КФХ Артемьева М. Н. запустила новый молочный цех с современным оборудованием. Теперь хозяйство производит до 500 литров молока в сутки и расширяет ассортимент до 12 видов молочной продукции.',
  },
  {
    id: 2,
    date: '18 апреля 2026',
    title: 'Лежневский район вошёл в топ-10 агротуристических маршрутов области',
    category: 'Туризм',
    categoryColor: '#d9a13b',
    text: 'По итогам регионального конкурса «Зелёный туризм — 2026» Лежневский район занял 4-е место в рейтинге агротуристических направлений Ивановской области.',
  },
  {
    id: 3,
    date: '10 апреля 2026',
    title: 'Праздник мёда состоится в июле 2026 года',
    category: 'Мероприятия',
    categoryColor: '#e07b39',
    text: 'Традиционный районный фестиваль «Медовая ярмарка» пройдёт 12–13 июля 2026 года. Участие подтвердили 14 пчеловодческих хозяйств района.',
  },
  {
    id: 4,
    date: '3 апреля 2026',
    title: 'Субсидии фермерам: новый раунд поддержки МСП',
    category: 'Поддержка',
    categoryColor: '#2563eb',
    text: 'Отдел экономики и предпринимательства сообщает об открытии приёма заявок на субсидирование процентной ставки по кредитам для фермерских хозяйств. Размер поддержки — до 500 000 рублей.',
  },
  {
    id: 5,
    date: '25 марта 2026',
    title: 'Интерактивная карта АПК обновлена',
    category: 'IT',
    categoryColor: '#7c3aed',
    text: 'Запущена новая версия интерактивной карты агропромышленного комплекса Лежневского района с туристическими маршрутами, страницами новостей и отзывов.',
  },
  {
    id: 6,
    date: '15 марта 2026',
    title: 'Птицефабрика увеличивает производство',
    category: 'Производство',
    categoryColor: '#3b8c4a',
    text: 'ООО «Ивановская птицефабрика» ввела в эксплуатацию новый птичник вместимостью 50 000 голов. Это позволит увеличить производство яйца на 20% к концу 2026 года.',
  },
];

// ─── Данные отзывов ───────────────────────────────────────────────────────────
const reviewsData = [
  {
    id: 1, author: 'Мария К.', date: 'Апрель 2026', rating: 5,
    farm: 'ИП КФХ Артемьева М. Н.',
    text: 'Замечательная ферма! Молоко свежайшее, творог просто тает во рту. Очень приветливая хозяйка. Будем приезжать снова!',
  },
  {
    id: 2, author: 'Дмитрий С.', date: 'Март 2026', rating: 5,
    farm: 'АО Агрофирма «Сабиново»',
    text: 'Взяли говядину оптом для ресторана. Качество превосходное, цена честная, доставка вовремя.',
  },
  {
    id: 3, author: 'Елена Т.', date: 'Март 2026', rating: 4,
    farm: 'ИП КФХ Муртазалиев А. З.',
    text: 'Отличный мёд! Брала гречишный и липовый — оба натуральные, без добавок. Упаковка удобная.',
  },
  {
    id: 4, author: 'Александр П.', date: 'Февраль 2026', rating: 5,
    farm: 'ООО «Ивановская птицефабрика»',
    text: 'Покупаем яйца здесь уже три года. Качество стабильно высокое, цена ниже, чем в магазинах.',
  },
  {
    id: 5, author: 'Надежда В.', date: 'Февраль 2026', rating: 5,
    farm: 'ИП КФХ Демидова М. С.',
    text: 'Попробовали сыры на дегустации — просто восторг! Козий сыр с травами — мой фаворит.',
  },
  {
    id: 6, author: 'Игорь Л.', date: 'Январь 2026', rating: 4,
    farm: 'ИП КФХ Четвериков Р. Е.',
    text: 'Останавливались в гостевом доме на выходные. Чистота, тишина, мастер-класс по сыроделию.',
  },
];

// ─── SVG-иконки ──────────────────────────────────────────────────────────────
const SVG_ICONS = {
  sitemap:  `<svg viewBox="0 0 512 512" width="36" height="36"><path fill="currentColor" d="M160 32c-17.7 0-32 14.3-32 32v32H64C28.7 96 0 124.7 0 160v96c0 35.3 28.7 64 64 64h128v32H128c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32h256c17.7 0 32-14.3 32-32v-96c0-17.7-14.3-32-32-32H320v-32h128c35.3 0 64-28.7 64-64v-96c0-35.3-28.7-64-64-64h-64V64c0-17.7-14.3-32-32-32H160zM96 192h320v64H96v-64z"/></svg>`,
  card:     `<svg viewBox="0 0 576 512" width="36" height="36"><path fill="currentColor" d="M512 80c8.8 0 16 7.2 16 16v320c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V96c0-8.8 7.2-16 16-16h448zM64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm48 240a64 64 0 1 0 128 0 64 64 0 1 0-128 0zm240-96c-8.8 0-16 7.2-16 16s7.2 16 16 16h128c8.8 0 16-7.2 16-16s-7.2-16-16-16H352zm0 64c-8.8 0-16 7.2-16 16s7.2 16 16 16h128c8.8 0 16-7.2 16-16s-7.2-16-16-16H352zm0 64c-8.8 0-16 7.2-16 16s7.2 16 16 16h128c8.8 0 16-7.2 16-16s-7.2-16-16-16H352z"/></svg>`,
  chart:    `<svg viewBox="0 0 512 512" width="36" height="36"><path fill="currentColor" d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64v336c0 44.2 35.8 80 80 80h400c17.7 0 32-14.3 32-32s-14.3-32-32-32H80c-8.8 0-16-7.2-16-16V64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"/></svg>`,
  map:      `<svg viewBox="0 0 576 512" width="36" height="36"><path fill="currentColor" d="M384 476.1L192 421.2V35.9L384 90.8V476.1zm32-1.2V88.4L543.1 37.5c15.8-6.3 32.9 5.3 32.9 22.3V394.6c0 9.8-6 18.6-15.1 22.3L416 474.9zM15.1 90.4L160 37.2V423.6L32.9 474.5C17.1 480.8 0 469.2 0 452.2V112.6c0-9.8 6-18.6 15.1-22.3z"/></svg>`,
  calendar: `<svg viewBox="0 0 448 512" width="36" height="36"><path fill="currentColor" d="M128 0c17.7 0 32 14.3 32 32v32h128V32c0-17.7 14.3-32 32-32s32 14.3 32 32v32h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192h448v272c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32z"/></svg>`,
  info:     `<svg viewBox="0 0 512 512" width="36" height="36"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>`,
  news:     `<svg viewBox="0 0 512 512" width="36" height="36"><path fill="currentColor" d="M96 96c0-35.3 28.7-64 64-64h256c35.3 0 64 28.7 64 64v256H96V96zM0 192h64v192c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H160c-35.3 0-64 28.7-64 64H0v96zm160-64h192v32H160v-32zm0 80h192v32H160v-32zm0 80h128v32H160v-32z"/></svg>`,
  chat:     `<svg viewBox="0 0 512 512" width="36" height="36"><path fill="currentColor" d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6.6-1 1.1-1.3 1.4l-.3.3c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM128 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1-64 0zm128-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>`,
  question: `<svg viewBox="0 0 320 512" width="36" height="36"><path fill="currentColor" d="M80 160c0-35.3 28.7-64 64-64h32c35.3 0 64 28.7 64 64v3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74v1.4c0 17.7 14.3 32 32 32s32-14.3 32-32v-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7V160c0-70.7-57.3-128-128-128H144C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/></svg>`,
  phone:    `<svg viewBox="0 0 512 512" width="16" height="16"><path fill="currentColor" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C11.9 30.3 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-11.9 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>`,
  mail:     `<svg viewBox="0 0 512 512" width="16" height="16"><path fill="currentColor" d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>`,
  location: `<svg viewBox="0 0 384 512" width="14" height="16"><path fill="currentColor" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>`,
  clock:    `<svg viewBox="0 0 512 512" width="16" height="16"><path fill="currentColor" d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.5 33.3-6.5s4.5-25.9-6.5-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>`,
  fax:      `<svg viewBox="0 0 512 512" width="16" height="16"><path fill="currentColor" d="M128 112c0-8.8 7.2-16 16-16h224c8.8 0 16 7.2 16 16v47.4c0 9 3.6 17.6 10 23.9l41 41c6.4 6.4 10 15 10 23.9V384H384V288H128v96H32V247.3c0-9 3.6-17.6 10-23.9l41-41c6.4-6.4 10-15 10-23.9V112zM0 416H512v32c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V416zM160 320h64v64H160V320zm96 0h64v64H256V320z"/></svg>`,
  person:   `<svg viewBox="0 0 448 512" width="16" height="16"><path fill="currentColor" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>`,
  vk:       `<svg viewBox="0 0 448 512" width="18" height="18"><path fill="currentColor" d="M31.4907 63.4907C0 94.9813 0 145.671 0 247.04V264.96C0 366.329 0 417.019 31.4907 448.509C62.9813 480 113.671 480 215.04 480H232.96C334.329 480 385.019 480 416.509 448.509C448 417.019 448 366.329 448 264.96V247.04C448 145.671 448 94.9813 416.509 63.4907C385.019 32 334.329 32 232.96 32H215.04C113.671 32 62.9813 32 31.4907 63.4907ZM75.6 168.267H126.747C128.427 253.76 166.133 289.973 196 297.44V168.267H244.16V242C273.653 238.827 304.64 205.227 315.093 168.267H363.253C359.313 187.435 351.46 205.583 340.186 221.537C328.913 237.491 314.461 251.898 297.733 263.013C316.41 273.262 332.874 287.482 346.071 304.714C359.268 321.946 369.62 341.791 375.467 363.2H322.987C317.653 342.624 306.4 324.498 291.22 310.916C276.041 297.333 257.765 288.995 238.293 287.04V363.2H232.267C131.093 363.2 78.0267 298.827 75.6 168.267Z"/></svg>`,
  photos:   `<svg viewBox="0 0 512 512" width="32" height="32"><path fill="currentColor" d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>`,
};

// ─── Вспомогательные компоненты ───────────────────────────────────────────────

function contactRow(icon, content) {
  return `<div class="info-contact-row">${SVG_ICONS[icon] || ''}${content}</div>`;
}

function infoCard(title, body) {
  return `<div class="info-card"><h3 class="info-card__title">${title}</h3><div class="info-card__body">${body}</div></div>`;
}

function scheduleRow(text) {
  return contactRow('clock', `<span>${text}</span>`);
}

// ─── ФЕСТИВАЛИ ────────────────────────────────────────────────────────────────
function getFestivalsPage() {
  const albums = [
    { year: '2025', date: '21 июня 2025', url: 'https://vk.com/album-167872724_306061890' },
    { year: '2024', date: '15 июня 2024', url: 'https://vk.com/album-167872724_301541373' },
    { year: '2023', date: '24 июня 2023', url: 'https://vk.com/album-167872724_292610058' },
  ];

  const albumCards = albums.map((a) => `
    <a class="festival-album-card" href="${a.url}" target="_blank" rel="noopener noreferrer">
      <div class="festival-album-card__img-wrap">
        <div class="festival-album-card__placeholder">
          ${SVG_ICONS.photos}
          <span>Фотоальбом ${a.year}</span>
        </div>
        <div class="festival-album-card__overlay">
          ${SVG_ICONS.vk}
          <span>Открыть во ВКонтакте</span>
        </div>
      </div>
      <div class="festival-album-card__info">
        <strong class="festival-album-card__year">${a.year}</strong>
        <span class="festival-album-card__date">${a.date}</span>
        <span class="festival-album-card__link">Смотреть фотографии →</span>
      </div>
    </a>
  `).join('');

  return `
    <div class="dynamic-page">
      <div class="dynamic-page__header">
        <span class="dynamic-page__icon">${SVG_ICONS.calendar}</span>
        <h1>Фестивали</h1>
      </div>
      <div class="dynamic-page__content">

        <div class="festival-hero">
          <div class="festival-hero__badge">Ежегодное мероприятие</div>
          <h2 class="festival-hero__title">Музыкальный фестиваль «Река времени»</h2>
          <p class="festival-hero__desc">
            Открытый музыкальный фестиваль на берегу реки — главное летнее событие
            Лежневского района. Живая музыка, местные угощения, мастер-классы и
            атмосфера настоящего праздника для всей семьи.
          </p>
        </div>

        <h3 class="festival-section-title">
          <span class="festival-section-title__icon">${SVG_ICONS.photos}</span>
          Фотоальбомы прошлых лет
        </h3>
        <p class="festival-albums-note">
          Фотографии хранятся в официальном альбоме ВКонтакте.
          Нажмите на карточку, чтобы перейти к фотографиям.
        </p>

        <div class="festival-albums-grid">
          ${albumCards}
        </div>

        <div class="festival-info-block">
          <div class="festival-info-item">
            <strong>Место проведения:</strong> Лежневский район, берег реки
          </div>
          <div class="festival-info-item">
            <strong>Период:</strong> Ежегодно в июне
          </div>
          <div class="festival-info-item">
            <strong>Формат:</strong> Открытый фестиваль, вход свободный
          </div>
          <div class="festival-info-item">
            <strong>Официальная группа:</strong>
            <a class="festival-vk-link info-link" href="https://vk.com/lezhnevoadm" target="_blank" rel="noopener">
              ${SVG_ICONS.vk} ВКонтакте — Администрация Лежневского района
            </a>
          </div>
        </div>

      </div>
    </div>
  `;
}

// ─── ОТДЕЛ ЭКОНОМИКИ ─────────────────────────────────────────────────────────
function getEconomyPage() {
  return `
    <div class="dynamic-page">
      <div class="dynamic-page__header">
        <span class="dynamic-page__icon">${SVG_ICONS.chart}</span>
        <h1>Отдел экономики и предпринимательства</h1>
      </div>
      <div class="dynamic-page__content">
        <p class="page-intro">
          Отдел экономики занимается развитием предпринимательства, поддержкой малого и среднего бизнеса,
          инвестиционной политикой района и ведёт работу в области развития АПК района.
        </p>

        ${infoCard('Руководство и специалисты', `
          ${contactRow('person', '<span><strong>Начальник отдела</strong> — Медведева Ольга Александровна</span>')}
          ${contactRow('person', '<span><strong>Ведущий специалист</strong> — Молькова Оксана Леонидовна</span>')}
          ${contactRow('person', '<span><strong>Ведущий специалист</strong> — Пушкина Екатерина Сергеевна</span>')}
        `)}

        ${infoCard('Контактная информация', `
          ${contactRow('phone', `<span>
            <a class="info-link" href="tel:+74935722139">8&nbsp;(49357)&nbsp;2-21-39</a>
            &ensp;/&ensp;
            <a class="info-link" href="tel:+79106815235">8&nbsp;910&nbsp;681-52-35</a>
          </span>`)}
          ${contactRow('mail', `<a class="info-link" href="mailto:economika27@mail.ru">economika27@mail.ru</a>`)}
        `)}

        ${infoCard('Часы работы', `
          ${scheduleRow('Понедельник – Четверг: с 8:00 до 17:00')}
          ${scheduleRow('Пятница: с 8:00 до 15:45')}
          ${scheduleRow('Перерыв на обед: с 12:00 до 12:45')}
          ${scheduleRow('Суббота, Воскресенье: выходные дни')}
        `)}
      </div>
    </div>
  `;
}

// ─── АДМИНИСТРАЦИЯ ────────────────────────────────────────────────────────────
function getAdminPage() {
  return `
    <div class="dynamic-page">
      <div class="dynamic-page__header">
        <span class="dynamic-page__icon">${SVG_ICONS.card}</span>
        <h1>Администрация</h1>
      </div>
      <div class="dynamic-page__content">

        ${infoCard('Руководство', `
          ${contactRow('person', '<span><strong>Глава Лежневского муниципального района</strong> — Парунов Владислав Андреевич</span>')}
        `)}

        ${infoCard('Реквизиты', `
          ${contactRow('location', '<span>155120, Ивановская область, п. Лежнево, ул. Октябрьская, д. 32</span>')}
          ${contactRow('phone',    `<a class="info-link" href="tel:+74935721204">8&nbsp;(49357)&nbsp;2-12-04</a>`)}
          ${contactRow('fax',      `<span>Факс:&ensp;<a class="info-link" href="tel:+74935721895">8&nbsp;(49357)&nbsp;2-18-95</a></span>`)}
          ${contactRow('mail',     `<a class="info-link" href="mailto:info.lezhnevo@ivreg.ru">info.lezhnevo@ivreg.ru</a>`)}
        `)}

        ${infoCard('Часы работы', `
          ${scheduleRow('Понедельник – Четверг: с 8:00 до 17:00')}
          ${scheduleRow('Пятница: с 8:00 до 15:45')}
          ${scheduleRow('Перерыв на обед: с 12:00 до 12:45')}
          ${scheduleRow('Суббота, Воскресенье: выходные дни')}
        `)}
      </div>
    </div>
  `;
}

// ─── ОРГАНЫ УПРАВЛЕНИЯ ────────────────────────────────────────────────────────
function getOrgansPage() {
  return `
    <div class="dynamic-page">
      <div class="dynamic-page__header">
        <span class="dynamic-page__icon">${SVG_ICONS.sitemap}</span>
        <h1>Органы управления</h1>
      </div>
      <div class="dynamic-page__content">
        <p class="page-intro">
          Органы государственного управления в сфере сельского хозяйства и АПК Ивановской области.
        </p>

        ${infoCard('Департамент сельского хозяйства и продовольствия Ивановской области', `
          ${contactRow('location', '<span>153012, Ивановская область, г. Иваново, ул. Суворова, д. 44</span>')}
          ${contactRow('phone', `<span>
            Тел.:&ensp;<a class="info-link" href="tel:+74932327128">(4932)&nbsp;32-71-28</a>
          </span>`)}
          ${contactRow('fax', `<span>
            Факс:&ensp;<a class="info-link" href="tel:+74932329694">(4932)&nbsp;32-96-94</a>
          </span>`)}
          ${contactRow('mail', `<a class="info-link" href="mailto:dshp@ivanovoobl.ru">dshp@ivanovoobl.ru</a>`)}
          ${scheduleRow('Пн–Чт: 09:00–18:00 &nbsp;|&nbsp; Пт: 09:00–16:45 &nbsp;|&nbsp; Перерыв: 13:00–13:45 &nbsp;|&nbsp; Сб, Вс — выходной')}
        `)}

        ${infoCard('БГУ Ивановской области «Ивановская городская СББЖ»', `
          ${contactRow('location', '<span>153016, Ивановская область, г. Иваново, ул. Танкиста Белороссова, д. 30-А</span>')}
          ${contactRow('phone', `<span>
            <a class="info-link" href="tel:+74932235257">8&nbsp;(4932)&nbsp;23-52-57</a>,&ensp;
            <a class="info-link" href="tel:+74932294498">29-44-98</a>,&ensp;
            <a class="info-link" href="tel:+74932236129">23-61-29&nbsp;(ф)</a>
          </span>`)}
          ${contactRow('mail', `<a class="info-link" href="mailto:ivgorvet@mail.ru">ivgorvet@mail.ru</a>`)}
        `)}

        ${infoCard('Служба ветеринарии Ивановской области', `
          <p style="color:var(--text-secondary);font-size:.9rem;margin:0">
            Государственный орган, осуществляющий ветеринарный надзор, контроль качества
            и безопасности продовольственного сырья животного происхождения на территории
            Ивановской области.
          </p>
        `)}
      </div>
    </div>
  `;
}

// ─── НОВОСТИ ──────────────────────────────────────────────────────────────────
function getNewsPage() {
  const cards = newsData.map((item) => `
    <article class="news-card">
      <div class="news-card__meta">
        <span class="news-card__category" style="background:${item.categoryColor}">${item.category}</span>
        <span class="news-card__date">${item.date}</span>
      </div>
      <h3 class="news-card__title">${item.title}</h3>
      <p class="news-card__text">${item.text}</p>
      <button class="news-card__more">Читать далее →</button>
    </article>
  `).join('');

  return `
    <div class="dynamic-page">
      <div class="dynamic-page__header">
        <span class="dynamic-page__icon">${SVG_ICONS.news}</span>
        <h1>Новости</h1>
      </div>
      <div class="dynamic-page__content">
        <p class="page-intro">Актуальные события агропромышленного комплекса Лежневского района</p>
        <div class="news-grid">${cards}</div>
      </div>
    </div>
  `;
}

// ─── ОТЗЫВЫ ───────────────────────────────────────────────────────────────────
function getReviewsPage() {
  function stars(rating) {
    return Array.from({ length: 5 }, (_, i) =>
      `<span class="star ${i < rating ? 'filled' : ''}">★</span>`
    ).join('');
  }

  const cards = reviewsData.map((r) => `
    <article class="review-card">
      <div class="review-card__header">
        <div class="review-avatar">${r.author[0]}</div>
        <div class="review-card__author-info">
          <strong class="review-card__author">${r.author}</strong>
          <span class="review-card__date">${r.date}</span>
        </div>
        <div class="review-card__stars">${stars(r.rating)}</div>
      </div>
      <div class="review-card__farm">${SVG_ICONS.location} ${r.farm}</div>
      <p class="review-card__text">${r.text}</p>
    </article>
  `).join('');

  const form = `
    <div class="review-form-wrap">
      <h2 class="review-form-title">Оставить отзыв</h2>
      <div class="review-form" id="review-form">
        <div class="review-form__row">
          <input type="text" id="review-author" placeholder="Ваше имя" class="review-input">
          <select id="review-farm" class="review-input review-select">
            <option value="">Выберите хозяйство...</option>
          </select>
        </div>
        <div class="review-form__stars-row">
          <span class="review-form__stars-label">Оценка:</span>
          <div class="review-form__stars" id="form-stars">
            <span class="star-btn" data-value="1">★</span>
            <span class="star-btn" data-value="2">★</span>
            <span class="star-btn" data-value="3">★</span>
            <span class="star-btn" data-value="4">★</span>
            <span class="star-btn" data-value="5">★</span>
          </div>
          <span id="form-rating-text">не выбрана</span>
        </div>
        <textarea id="review-text" placeholder="Ваш отзыв..." class="review-textarea" rows="4"></textarea>
        <button class="review-submit-btn" id="review-submit-btn">Отправить отзыв</button>
        <div id="review-form-msg" class="review-form-msg" style="display:none"></div>
      </div>
    </div>
  `;

  return `
    <div class="dynamic-page">
      <div class="dynamic-page__header">
        <span class="dynamic-page__icon">${SVG_ICONS.chat}</span>
        <h1>Отзывы</h1>
      </div>
      <div class="dynamic-page__content">
        <p class="page-intro">Мнения жителей и гостей района о наших фермерских хозяйствах</p>
        <div class="reviews-grid" id="reviews-grid">${cards}</div>
        ${form}
      </div>
    </div>
  `;
}

// ─── Инициализация страницы отзывов ──────────────────────────────────────────
export function initReviewsPage() {
  const { farms } = window._appData || {};
  const select = document.getElementById('review-farm');
  if (select && farms) {
    farms.forEach((f) => {
      const opt = document.createElement('option');
      opt.value = f.id;
      opt.textContent = f.name;
      select.appendChild(opt);
    });
  }

  let selectedRating = 0;
  document.querySelectorAll('.star-btn').forEach((star) => {
    star.addEventListener('mouseenter', () => {
      const val = +star.dataset.value;
      document.querySelectorAll('.star-btn').forEach((s, i) => s.classList.toggle('hovered', i < val));
    });
    star.addEventListener('mouseleave', () => {
      document.querySelectorAll('.star-btn').forEach((s) => s.classList.remove('hovered'));
    });
    star.addEventListener('click', () => {
      selectedRating = +star.dataset.value;
      const names = ['', 'Плохо', 'Удовлетворительно', 'Хорошо', 'Отлично', 'Превосходно'];
      document.getElementById('form-rating-text').textContent = names[selectedRating];
      document.querySelectorAll('.star-btn').forEach((s, i) => s.classList.toggle('active', i < selectedRating));
    });
  });

  document.getElementById('review-submit-btn')?.addEventListener('click', () => {
    const author = document.getElementById('review-author').value.trim();
    const farmId = document.getElementById('review-farm').value;
    const text   = document.getElementById('review-text').value.trim();
    const msg    = document.getElementById('review-form-msg');

    if (!author || !farmId || !text || !selectedRating) {
      msg.textContent = 'Пожалуйста, заполните все поля и выберите оценку.';
      msg.className = 'review-form-msg error';
      msg.style.display = 'block';
      return;
    }

    const farmName = farms ? (farms.find(f => f.id === farmId)?.name || farmId) : farmId;
    const grid = document.getElementById('reviews-grid');
    const card = document.createElement('article');
    card.className = 'review-card review-card--new';
    card.innerHTML = `
      <div class="review-card__header">
        <div class="review-avatar">${author[0]}</div>
        <div class="review-card__author-info">
          <strong class="review-card__author">${author}</strong>
          <span class="review-card__date">Сейчас</span>
        </div>
        <div class="review-card__stars">${Array.from({length:5},(_,i)=>`<span class="star ${i<selectedRating?'filled':''}">★</span>`).join('')}</div>
      </div>
      <div class="review-card__farm">${SVG_ICONS.location} ${farmName}</div>
      <p class="review-card__text">${text}</p>
    `;
    grid.prepend(card);

    document.getElementById('review-author').value = '';
    document.getElementById('review-farm').value = '';
    document.getElementById('review-text').value = '';
    selectedRating = 0;
    document.querySelectorAll('.star-btn').forEach(s => s.classList.remove('active'));
    document.getElementById('form-rating-text').textContent = 'не выбрана';

    msg.textContent = 'Спасибо! Ваш отзыв добавлен.';
    msg.className = 'review-form-msg success';
    msg.style.display = 'block';
    setTimeout(() => { msg.style.display = 'none'; }, 3000);
  });
}

// ─── О РАЙОНЕ ─────────────────────────────────────────────────────────────────
function getAboutPage() {
  return `
    <div class="dynamic-page">
      <div class="dynamic-page__header">
        <span class="dynamic-page__icon">${SVG_ICONS.info}</span>
        <h1>О районе</h1>
      </div>
      <div class="dynamic-page__content">
        <p>История, природа и культура Лежневского района. Общие сведения о муниципальном образовании. Лежнево — городское поселение в Ивановской области.</p>
        <p>Здесь вы можете разместить любой дополнительный материал: фотографии, списки, таблицы.</p>
        <p><em>Заготовка — замените текст на актуальный.</em></p>
      </div>
    </div>
  `;
}

// ─── Экспорт ──────────────────────────────────────────────────────────────────
export function getPageContent(pageId) {
  if (pageId === 'news')      return getNewsPage();
  if (pageId === 'reviews')   return getReviewsPage();
  if (pageId === 'festivals') return getFestivalsPage();
  if (pageId === 'economy')   return getEconomyPage();
  if (pageId === 'admin')     return getAdminPage();
  if (pageId === 'organs')    return getOrgansPage();
  if (pageId === 'about')     return getAboutPage();
  return `<div class="dynamic-page"><div class="dynamic-page__header"><span class="dynamic-page__icon">${SVG_ICONS.question}</span><h1>Страница не найдена</h1></div></div>`;
}
