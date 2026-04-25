// ui.js — всё, что касается интерфейса: кнопки ферм, детальная страница, события

import { setFilter, filterFarms } from './filter.js';
import { applySearch } from './search.js';

/**
 * ИЗМЕНЕНИЯ:
 * 1. initFilterButtons теперь живёт ТОЛЬКО здесь (удалена из filter.js).
 *
 * 2. renderFilteredButtons теперь применяет и фильтр, и поиск одновременно.
 *    БЫЛО: вызывал только filterFarms() — кнопки и карта не совпадали при поиске.
 *    СТАЛО: вызывает filterFarms() + applySearch() — кнопки всегда соответствуют карте.
 *
 * 3. showDetailPage: добавлен fallback для photo (если нет фото — показываем none.png).
 *    БЫЛО: detailImg.src = farm.photo → если поле пустое, картинка ломалась.
 *
 * 4. Импорт updatePlacemarks из map.js убран — теперь initFilterButtons
 *    принимает onUpdateMap как колбэк из main.js. Это чище архитектурно.
 */

// Ссылки на DOM-элементы (заполняются через initUI один раз при старте)
let mainPage, detailPage, farmButtonsContainer;
let detailTitle, detailDesc, detailImg, detailCoordsSpan, productSpan, backBtn;
let productTel, productEmail, additionalInfo;

/**
 * Сохраняет ссылки на DOM-элементы.
 * Вызывается один раз в main.js перед стартом приложения.
 */
export function initUI(elements) {
  mainPage            = elements.mainPage;
  detailPage          = elements.detailPage;
  farmButtonsContainer = elements.farmButtonsContainer;
  detailTitle         = elements.detailTitle;
  detailDesc          = elements.detailDesc;
  detailImg           = elements.detailImg;
  detailCoordsSpan    = elements.detailCoordsSpan;
  productSpan         = elements.productSpan;
  backBtn             = elements.backBtn;
  productTel          = elements.productTel;
  productEmail        = elements.productEmail;
  additionalInfo      = elements.additionalInfo;
}

/**
 * Перерисовывает кнопки ферм в боковой панели.
 * Применяет и фильтр, и текущий поисковый запрос.
 *
 * @param {Array}    allFarms    — полный список ферм
 * @param {Function} onFarmClick — обработчик клика по кнопке фермы
 */
export function renderFilteredButtons(allFarms, onFarmClick) {
  // ИСПРАВЛЕНИЕ: теперь применяем и фильтр, и поиск
  // Раньше был только filterFarms — кнопки и карта расходились при поиске
  let filtered = filterFarms(allFarms);
  filtered = applySearch(filtered);

  farmButtonsContainer.innerHTML = '';

  filtered.forEach((farm) => {
    const btn = document.createElement('button');
    btn.className = 'farm-btn';
    btn.setAttribute('data-farm-id', farm.id);

    // Цветная точка (индикатор категории)
    const dotSpan = document.createElement('span');
    dotSpan.className = 'color-dot';
    dotSpan.style.backgroundColor = farm.color;

    btn.appendChild(document.createTextNode(farm.name));
    btn.appendChild(dotSpan);

    btn.addEventListener('click', () => onFarmClick(farm.id));
    farmButtonsContainer.appendChild(btn);
  });
}

/**
 * Инициализирует кнопки фильтра (сайдбар) и ссылки в футере.
 * ПЕРЕНЕСЕНА СЮДА из filter.js — там её быть не должно
 * (filter.js отвечает за логику, ui.js — за интерфейс).
 *
 * @param {Array}    allFarms    — полный список ферм
 * @param {Function} onFarmClick — клик по кнопке фермы
 * @param {Function} onUpdateMap — полное обновление (карта + кнопки)
 */
export function initFilterButtons(allFarms, onFarmClick, onUpdateMap) {
  // Кнопки фильтра в сайдбаре
  document.querySelectorAll('.filter-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const category = e.currentTarget.dataset.filter;
      setFilter(category);
      onUpdateMap(); // обновляет и кнопки, и карту
    });
  });

  // Ссылки в футере (Молочная, Мясная, …)
  document.querySelectorAll('.footer-filter-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const category = e.currentTarget.dataset.filter;
      setFilter(category);
      onUpdateMap();
      // Прокрутка к карте, чтобы пользователь увидел результат
      document.getElementById('yandex-map').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Активируем кнопку "Все" по умолчанию
  const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
  if (allBtn) allBtn.classList.add('active');
}

/**
 * Показывает детальную страницу фермы.
 * ИСПРАВЛЕНИЕ: добавлен fallback для фото — если поле пустое, показываем none.png.
 */
export function showDetailPage(farm) {
  detailTitle.textContent    = farm.name;
  detailDesc.textContent     = farm.description;
  detailImg.src              = farm.photo || './images/none.png'; // ИСПРАВЛЕНО
  detailImg.alt              = farm.name;
  detailCoordsSpan.textContent = `${farm.coords[0].toFixed(4)}, ${farm.coords[1].toFixed(4)}`;
  productSpan.textContent    = farm.product;
  productTel.textContent     = farm.phone  || 'Не указан';
  productEmail.textContent   = farm.email  || 'Не указан';
  additionalInfo.textContent = farm.additionalInfo || '';

  mainPage.style.display  = 'none';
  detailPage.style.display = 'flex';
  detailPage.scrollTop    = 0;
}

/**
 * Возвращает на главную страницу (карту + сайдбар).
 */
export function showMainPage(onMapFit) {
  detailPage.style.display = 'none';

  const dynWrapper = document.querySelector('.dynamic-page-wrapper');
  if (dynWrapper) dynWrapper.remove();

  mainPage.style.display = 'flex';
  document.querySelector('.farm-sidebar').style.display = 'flex';

  if (onMapFit) onMapFit();
}

/**
 * Подписывается на кнопку «Назад» и ресайз окна.
 */
export function bindEvents(onBackClick, onResizeFit) {
  backBtn.addEventListener('click', onBackClick);

  window.addEventListener('resize', () => {
    if (mainPage.style.display !== 'none') onResizeFit();
  });
}
