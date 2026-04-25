// main.js — точка входа приложения. Связывает все модули вместе.

import { farms } from './modules/data.js';
import {
  initMap,
  addPlacemarks,
  flyToFarm,
  fitMapToViewport,
  updatePlacemarks,
} from './modules/map.js';
import {
  initUI,
  renderFilteredButtons,
  showDetailPage,
  showMainPage,
  bindEvents,
  initFilterButtons,
} from './modules/ui.js';
import { filterFarms } from './modules/filter.js';
import { getPageContent } from './modules/pages.js';
import { setSearchQuery, applySearch } from './modules/search.js';

/**
 * ИЗМЕНЕНИЯ:
 * 1. updatePlacemarks теперь вызывается без allFarms как первого аргумента —
 *    он принимает только (filteredFarms, onClick). Сигнатура упрощена.
 *
 * 2. fullUpdate — единственная точка обновления: фильтр + поиск → кнопки + карта.
 *    Это гарантирует, что карта и список ВСЕГДА синхронны.
 *
 * 3. Бургер-меню: добавлены обработчики для мобильной навигации.
 */

// DOM-элементы (собираем один раз, передаём в initUI)
const domElements = {
  mainPage:          document.getElementById('main-page'),
  detailPage:        document.getElementById('detail-page'),
  farmButtonsContainer: document.getElementById('farm-buttons-container'),
  detailTitle:       document.getElementById('detail-title'),
  detailDesc:        document.getElementById('detail-desc'),
  detailImg:         document.getElementById('detail-img'),
  detailCoordsSpan:  document.getElementById('detail-coords'),
  productSpan:       document.getElementById('detail-product'),
  backBtn:           document.getElementById('back-to-main-btn'),
  productTel:        document.getElementById('detail-tel'),
  productEmail:      document.getElementById('detail-email'),
  additionalInfo:    document.getElementById('detail-additionalInfo'),
};

initUI(domElements);

const MAP_CENTER = [56.82254252681233, 40.85911659965104];

// ─── Главная функция обновления ───────────────────────────────────────────────
// Применяет фильтр + поиск, затем обновляет и кнопки, и метки на карте.
// Вызывается при любом изменении: смена фильтра, ввод в поиск.
function fullUpdate() {
  let filtered = filterFarms(farms);   // шаг 1: фильтр по категории
  filtered = applySearch(filtered);    // шаг 2: поиск по тексту
  renderFilteredButtons(farms, onFarmButtonClick); // кнопки в сайдбаре
  updatePlacemarks(filtered, onPlacemarkClick);    // метки на карте
}

// ─── Обработчики кликов ────────────────────────────────────────────────────────

// Клик по кнопке фермы в сайдбаре → летим к ней на карте
function onFarmButtonClick(farmId) {
  // Если открыта детальная страница — сначала закрываем её
  if (domElements.detailPage.style.display !== 'none') {
    showMainPage(() => fitMapToViewport());
  }
  flyToFarm(farmId, farms);
}

// Клик по метке на карте → открываем детальную страницу
function onPlacemarkClick(farmId) {
  const farm = farms.find((f) => f.id === farmId);
  if (farm) showDetailPage(farm);
}

// ─── Поиск ───────────────────────────────────────────────────────────────────
const searchInput  = document.querySelector('.search-form input');
const searchButton = document.querySelector('.search-form button');

function handleSearch() {
  setSearchQuery(searchInput.value);
  fullUpdate();
}

searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  handleSearch();
});

searchInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleSearch();
  }
  // Для мгновенного поиска раскомментируй строку ниже:
  // handleSearch();
});

// ─── Навигация: динамические страницы ────────────────────────────────────────
document.querySelectorAll('[data-page]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const pageId = e.currentTarget.dataset.page;

    // Закрываем детальную страницу если открыта
    document.getElementById('detail-page').style.display = 'none';

    // Удаляем старую динамическую страницу
    const old = document.querySelector('.dynamic-page-wrapper');
    if (old) old.remove();

    // Закрываем бургер-меню при переходе (для мобильных)
    closeBurgerMenu();

    if (pageId === 'main') {
      document.getElementById('main-page').style.display = 'flex';
      document.querySelector('.farm-sidebar').style.display = 'flex';
      fitMapToViewport();
    } else {
      document.getElementById('main-page').style.display = 'none';
      document.querySelector('.farm-sidebar').style.display = 'none';

      const app     = document.getElementById('app');
      const wrapper = document.createElement('div');
      wrapper.className = 'dynamic-page-wrapper';
      wrapper.innerHTML = getPageContent(pageId);
      app.appendChild(wrapper);
    }
  });
});

// ─── Бургер-меню (мобильная навигация) ───────────────────────────────────────
const burgerBtn  = document.getElementById('burger-btn');
const mobileMenu = document.getElementById('mobile-menu');
const overlay    = document.getElementById('burger-overlay');

function openBurgerMenu() {
  mobileMenu.classList.add('is-open');
  overlay.classList.add('is-visible');
  burgerBtn.classList.add('is-active');
  document.body.style.overflow = 'hidden'; // запрещаем скролл страницы
}

function closeBurgerMenu() {
  mobileMenu.classList.remove('is-open');
  overlay.classList.remove('is-visible');
  burgerBtn.classList.remove('is-active');
  document.body.style.overflow = '';
}

burgerBtn.addEventListener('click', () => {
  if (mobileMenu.classList.contains('is-open')) {
    closeBurgerMenu();
  } else {
    openBurgerMenu();
  }
});

// Закрытие по клику на затемнение
overlay.addEventListener('click', closeBurgerMenu);

// ─── Запуск приложения ────────────────────────────────────────────────────────
function startApp() {
  ymaps.ready(() => {
    initMap(ymaps, MAP_CENTER, 12);
    addPlacemarks(farms, onPlacemarkClick);
    renderFilteredButtons(farms, onFarmButtonClick);
    initFilterButtons(farms, onFarmButtonClick, fullUpdate);
    bindEvents(
      () => showMainPage(() => fitMapToViewport()),
      () => fitMapToViewport(),
    );
  });
}

document.addEventListener('DOMContentLoaded', startApp);
