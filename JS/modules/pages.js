// pages.js — контент динамических страниц (новости, отзывы и др.)

// ─── Данные новостей (динамически) ───────────────────────────────────────────
const newsData = [
  {
    id: 1,
    date: '22 апреля 2026',
    title: 'Открытие нового молочного цеха на ферме Артемьевой',
    category: 'Производство',
    categoryColor: '#3b8c4a',
    text: 'ИП КФХ Артемьева М. Н. запустила новый молочный цех с современным оборудованием. Теперь хозяйство производит до 500 литров молока в сутки и расширяет ассортимент до 12 видов молочной продукции.',
    img: null,
  },
  {
    id: 2,
    date: '18 апреля 2026',
    title: 'Лежневский район вошёл в топ-10 агротуристических маршрутов области',
    category: 'Туризм',
    categoryColor: '#d9a13b',
    text: 'По итогам регионального конкурса «Зелёный туризм — 2026» Лежневский район занял 4-е место в рейтинге агротуристических направлений Ивановской области. Туристический маршрут «Фермерское кольцо» привлёк более 2 000 гостей за прошлый сезон.',
    img: null,
  },
  {
    id: 3,
    date: '10 апреля 2026',
    title: 'Праздник мёда состоится в июле 2026 года',
    category: 'Мероприятия',
    categoryColor: '#e07b39',
    text: 'Традиционный районный фестиваль «Медовая ярмарка» пройдёт 12–13 июля 2026 года. Участие подтвердили 14 пчеловодческих хозяйств района. На ярмарке можно будет попробовать более 30 сортов мёда, прополис, пергу и другую продукцию пчеловодства.',
    img: null,
  },
  {
    id: 4,
    date: '3 апреля 2026',
    title: 'Субсидии фермерам: новый раунд поддержки МСП',
    category: 'Поддержка',
    categoryColor: '#2563eb',
    text: 'Отдел экономики и предпринимательства сообщает об открытии приёма заявок на субсидирование процентной ставки по кредитам для фермерских хозяйств. Размер поддержки — до 500 000 рублей. Срок подачи заявок — до 30 апреля 2026 года.',
    img: null,
  },
  {
    id: 5,
    date: '25 марта 2026',
    title: 'Интерактивная карта АПК обновлена до версии 6.0',
    category: 'IT',
    categoryColor: '#7c3aed',
    text: 'Запущена новая версия интерактивной карты агропромышленного комплекса Лежневского района. В обновлении: страница туристических маршрутов с построением маршрута по карте, страницы новостей и отзывов, исправлена работа иконок и поиска на мобильных устройствах.',
    img: null,
  },
  {
    id: 6,
    date: '15 марта 2026',
    title: 'Птицефабрика увеличивает производство',
    category: 'Производство',
    categoryColor: '#3b8c4a',
    text: 'ООО «Ивановская птицефабрика» ввела в эксплуатацию новый птичник вместимостью 50 000 голов. Это позволит увеличить производство яйца на 20% к концу 2026 года.',
    img: null,
  },
];

// ─── Данные отзывов (динамически) ────────────────────────────────────────────
const reviewsData = [
  {
    id: 1,
    author: 'Мария К.',
    date: 'Апрель 2026',
    rating: 5,
    farm: 'ИП КФХ Артемьева М. Н.',
    text: 'Замечательная ферма! Молоко свежайшее, творог просто тает во рту. Очень приветливая хозяйка, рассказала всё о производстве. Привезли с собой детей — им очень понравилось. Будем приезжать снова!',
  },
  {
    id: 2,
    author: 'Дмитрий С.',
    date: 'Март 2026',
    rating: 5,
    farm: 'АО Агрофирма «Сабиново»',
    text: 'Взяли говядину оптом для ресторана. Качество превосходное, животные откормлены на натуральных кормах. Цена честная, доставка вовремя. Рекомендую всем шеф-поварам региона.',
  },
  {
    id: 3,
    author: 'Елена Т.',
    date: 'Март 2026',
    rating: 4,
    farm: 'ИП КФХ Муртазалиев А. З.',
    text: 'Отличный мёд! Брала гречишный и липовый — оба натуральные, без добавок. Упаковка удобная, крышки надёжные. Единственный минус — долго ждала ответа на звонок, но в итоге всё оформили быстро.',
  },
  {
    id: 4,
    author: 'Александр П.',
    date: 'Февраль 2026',
    rating: 5,
    farm: 'ООО «Ивановская птицефабрика»',
    text: 'Покупаем яйца здесь уже три года. Качество стабильно высокое, желток тёмно-оранжевый — видно, что куры на хорошем питании. Цена ниже, чем в магазинах, при том же качестве.',
  },
  {
    id: 5,
    author: 'Надежда В.',
    date: 'Февраль 2026',
    rating: 5,
    farm: 'ИП КФХ Демидова М. С.',
    text: 'Попробовали сыры на дегустации — просто восторг! Козий сыр с травами — мой фаворит. Очень приятная атмосфера, хозяйка с удовольствием рассказывает о технологии. Купила набор в подарок — именинница была в восторге!',
  },
  {
    id: 6,
    author: 'Игорь Л.',
    date: 'Январь 2026',
    rating: 4,
    farm: 'ИП КФХ Четвериков Р. Е.',
    text: 'Останавливались в гостевом доме на выходные. Чистота, тишина, свежий воздух. Мастер-класс по сыроделию понравился жене и детям. Рекомендуем для семейного отдыха. Немного далековато ехать, но оно того стоит.',
  },
];

// ─── SVG-иконки ──────────────────────────────────────────────────────────────
const SVG_ICONS = {
  sitemap: `<svg viewBox="0 0 512 512" width="36" height="36"><path fill="currentColor" d="M160 32c-17.7 0-32 14.3-32 32v32H64C28.7 96 0 124.7 0 160v96c0 35.3 28.7 64 64 64h128v32H128c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32h256c17.7 0 32-14.3 32-32v-96c0-17.7-14.3-32-32-32H320v-32h128c35.3 0 64-28.7 64-64v-96c0-35.3-28.7-64-64-64h-64V64c0-17.7-14.3-32-32-32H160zM96 192h320v64H96v-64z"/></svg>`,
  card: `<svg viewBox="0 0 576 512" width="36" height="36"><path fill="currentColor" d="M512 80c8.8 0 16 7.2 16 16v320c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V96c0-8.8 7.2-16 16-16h448zM64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm48 240a64 64 0 1 0 128 0 64 64 0 1 0-128 0zm240-96c-8.8 0-16 7.2-16 16s7.2 16 16 16h128c8.8 0 16-7.2 16-16s-7.2-16-16-16H352zm0 64c-8.8 0-16 7.2-16 16s7.2 16 16 16h128c8.8 0 16-7.2 16-16s-7.2-16-16-16H352zm0 64c-8.8 0-16 7.2-16 16s7.2 16 16 16h128c8.8 0 16-7.2 16-16s-7.2-16-16-16H352z"/></svg>`,
  chart: `<svg viewBox="0 0 512 512" width="36" height="36"><path fill="currentColor" d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64v336c0 44.2 35.8 80 80 80h400c17.7 0 32-14.3 32-32s-14.3-32-32-32H80c-8.8 0-16-7.2-16-16V64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"/></svg>`,
  map: `<svg viewBox="0 0 576 512" width="36" height="36"><path fill="currentColor" d="M384 476.1L192 421.2V35.9L384 90.8V476.1zm32-1.2V88.4L543.1 37.5c15.8-6.3 32.9 5.3 32.9 22.3V394.6c0 9.8-6 18.6-15.1 22.3L416 474.9zM15.1 90.4L160 37.2V423.6L32.9 474.5C17.1 480.8 0 469.2 0 452.2V112.6c0-9.8 6-18.6 15.1-22.3z"/></svg>`,
  calendar: `<svg viewBox="0 0 448 512" width="36" height="36"><path fill="currentColor" d="M128 0c17.7 0 32 14.3 32 32v32h128V32c0-17.7 14.3-32 32-32s32 14.3 32 32v32h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192h448v272c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32z"/></svg>`,
  info: `<svg viewBox="0 0 512 512" width="36" height="36"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>`,
  news: `<svg viewBox="0 0 512 512" width="36" height="36"><path fill="currentColor" d="M96 96c0-35.3 28.7-64 64-64h256c35.3 0 64 28.7 64 64v256H96V96zM0 192h64v192c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H160c-35.3 0-64 28.7-64 64H0v96zm160-64h192v32H160v-32zm0 80h192v32H160v-32zm0 80h128v32H160v-32z"/></svg>`,
  chat: `<svg viewBox="0 0 512 512" width="36" height="36"><path fill="currentColor" d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6.6-1 1.1-1.3 1.4l-.3.3c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM128 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1-64 0zm128-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>`,
  question: `<svg viewBox="0 0 320 512" width="36" height="36"><path fill="currentColor" d="M80 160c0-35.3 28.7-64 64-64h32c35.3 0 64 28.7 64 64v3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74v1.4c0 17.7 14.3 32 32 32s32-14.3 32-32v-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7V160c0-70.7-57.3-128-128-128H144C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/></svg>`,
};

// ─── Страница новостей ────────────────────────────────────────────────────────
function getNewsPage() {
  const cards = newsData.map((item) => `
    <article class="news-card" data-news-id="${item.id}">
      <div class="news-card__meta">
        <span class="news-card__category" style="background:${item.categoryColor}">${item.category}</span>
        <span class="news-card__date">${item.date}</span>
      </div>
      <h3 class="news-card__title">${item.title}</h3>
      <p class="news-card__text">${item.text}</p>
      <button class="news-card__more" data-news-id="${item.id}">Читать далее →</button>
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
        <div class="news-grid" id="news-grid">
          ${cards}
        </div>
      </div>
    </div>
  `;
}

// ─── Страница отзывов ─────────────────────────────────────────────────────────
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
      <div class="review-card__farm">
        <svg viewBox="0 0 384 512" width="12" height="12"><path fill="currentColor" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
        ${r.farm}
      </div>
      <p class="review-card__text">${r.text}</p>
    </article>
  `).join('');

  // Форма добавления отзыва
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
        <div id="reviews-container">
          <div class="reviews-grid" id="reviews-grid">
            ${cards}
          </div>
        </div>
        ${form}
      </div>
    </div>
  `;
}

// ─── Инициализация страницы отзывов (форма + динамика) ───────────────────────
export function initReviewsPage() {
  // Заполняем select с фермами
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

  // Интерактивные звёзды в форме
  let selectedRating = 0;
  document.querySelectorAll('.star-btn').forEach((star) => {
    star.addEventListener('mouseenter', () => {
      const val = +star.dataset.value;
      document.querySelectorAll('.star-btn').forEach((s, i) => {
        s.classList.toggle('hovered', i < val);
      });
    });
    star.addEventListener('mouseleave', () => {
      document.querySelectorAll('.star-btn').forEach((s) => s.classList.remove('hovered'));
    });
    star.addEventListener('click', () => {
      selectedRating = +star.dataset.value;
      const ratingNames = ['', 'Плохо', 'Удовлетворительно', 'Хорошо', 'Отлично', 'Превосходно'];
      document.getElementById('form-rating-text').textContent = ratingNames[selectedRating];
      document.querySelectorAll('.star-btn').forEach((s, i) => {
        s.classList.toggle('active', i < selectedRating);
      });
    });
  });

  // Отправка отзыва
  document.getElementById('review-submit-btn')?.addEventListener('click', () => {
    const author = document.getElementById('review-author').value.trim();
    const farmId = document.getElementById('review-farm').value;
    const text = document.getElementById('review-text').value.trim();
    const msg = document.getElementById('review-form-msg');

    if (!author || !farmId || !text || !selectedRating) {
      msg.textContent = 'Пожалуйста, заполните все поля и выберите оценку.';
      msg.className = 'review-form-msg error';
      msg.style.display = 'block';
      return;
    }

    const farmName = farms ? (farms.find(f => f.id === farmId)?.name || farmId) : farmId;
    const newReview = {
      id: Date.now(),
      author,
      date: 'Сейчас',
      rating: selectedRating,
      farm: farmName,
      text,
    };

    // Добавляем карточку в начало сетки
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
        <div class="review-card__stars">${Array.from({ length: 5 }, (_, i) => `<span class="star ${i < selectedRating ? 'filled' : ''}">★</span>`).join('')}</div>
      </div>
      <div class="review-card__farm">
        <svg viewBox="0 0 384 512" width="12" height="12"><path fill="currentColor" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
        ${farmName}
      </div>
      <p class="review-card__text">${text}</p>
    `;
    grid.prepend(card);

    // Очищаем форму
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

// ─── Страницы-заглушки ────────────────────────────────────────────────────────
function getSimplePage(pageId) {
  const pages = {
    organs: {
      title: 'Органы управления',
      icon: 'sitemap',
      desc: 'Информация об органах местного самоуправления Лежневского района. Здесь вы найдёте структуру администрации, полномочия отделов и контактные данные должностных лиц.',
    },
    admin: {
      title: 'Администрация',
      icon: 'card',
      desc: 'Администрация Лежневского муниципального района. Адрес, режим работы, приём граждан. Список подведомственных учреждений и актуальные нормативные документы.',
    },
    economy: {
      title: 'Отдел экономики и предпринимательства',
      icon: 'chart',
      desc: 'Отдел экономики занимается развитием предпринимательства, поддержкой малого и среднего бизнеса, инвестиционной политикой района.',
    },
    festivals: {
      title: 'Фестивали',
      icon: 'calendar',
      desc: 'Календарь ежегодных фестивалей и праздников в районе: День района, Праздник урожая, Фестиваль мёда и другие события.',
    },
    about: {
      title: 'О районе',
      icon: 'info',
      desc: 'История, природа и культура Лежневского района. Общие сведения о муниципальном образовании. Лежнево — городское поселение в Ивановской области.',
    },
  };

  const p = pages[pageId] || { title: 'Страница не найдена', icon: 'question', desc: 'Страница отсутствует.' };

  return `
    <div class="dynamic-page">
      <div class="dynamic-page__header">
        <span class="dynamic-page__icon">${SVG_ICONS[p.icon] || SVG_ICONS.question}</span>
        <h1>${p.title}</h1>
      </div>
      <div class="dynamic-page__content">
        <p>${p.desc}</p>
        <p>Здесь вы можете разместить любой дополнительный материал: фотографии, списки, таблицы.</p>
        <p><em>Заготовка — замените текст на актуальный.</em></p>
      </div>
    </div>
  `;
}

// ─── Экспорт ──────────────────────────────────────────────────────────────────
export function getPageContent(pageId) {
  if (pageId === 'news') return getNewsPage();
  if (pageId === 'reviews') return getReviewsPage();
  return getSimplePage(pageId);
}
