// main.js — точка входа приложения (версия 6.0)

import { farms } from './modules/data.js';
import { initMap, addPlacemarks, flyToFarm, fitMapToViewport, updatePlacemarks } from './modules/map.js';
import { initUI, renderFilteredButtons, showDetailPage, showMainPage, bindEvents, initFilterButtons } from './modules/ui.js';
import { filterFarms } from './modules/filter.js';
import { getPageContent, initReviewsPage } from './modules/pages.js';
import { setSearchQuery, applySearch } from './modules/search.js';
import { getRoutesPageHTML, initRoutesPage } from './modules/routes.js';

// Делаем данные доступными глобально (для формы отзывов)
window._appData = { farms };

const domElements = {
  mainPage:             document.getElementById('main-page'),
  detailPage:           document.getElementById('detail-page'),
  farmButtonsContainer: document.getElementById('farm-buttons-container'),
  detailTitle:          document.getElementById('detail-title'),
  detailDesc:           document.getElementById('detail-desc'),
  detailImg:            document.getElementById('detail-img'),
  detailCoordsSpan:     document.getElementById('detail-coords'),
  productSpan:          document.getElementById('detail-product'),
  backBtn:              document.getElementById('back-to-main-btn'),
  productTel:           document.getElementById('detail-tel'),
  productEmail:         document.getElementById('detail-email'),
  additionalInfo:       document.getElementById('detail-additionalInfo'),
};

initUI(domElements);

const MAP_CENTER = [56.82254252681233, 40.85911659965104];
let ymapsGlobal = null;

function fullUpdate() {
  let filtered = filterFarms(farms);
  filtered = applySearch(filtered);
  renderFilteredButtons(farms, onFarmButtonClick);
  updatePlacemarks(filtered, onPlacemarkClick);
}

function onFarmButtonClick(farmId) {
  if (domElements.detailPage.style.display !== 'none') {
    showMainPage(() => fitMapToViewport());
  }
  flyToFarm(farmId, farms);
}

function onPlacemarkClick(farmId) {
  const farm = farms.find((f) => f.id === farmId);
  if (farm) showDetailPage(farm);
}

// Глобальный обработчик для кнопки "Подробнее" в баллуне карты
window._openFarm = (farmId) => {
  const farm = farms.find((f) => f.id === farmId);
  if (farm) {
    showDetailPage(farm);
    // Скрываем динамическую страницу если была открыта
    const dynWrapper = document.querySelector('.dynamic-page-wrapper');
    if (dynWrapper) dynWrapper.remove();
  }
};

// ─── Поиск — десктоп ──────────────────────────────────────────────────────────
const searchInput  = document.getElementById('search-input');
const searchButton = document.getElementById('search-btn');

function handleSearch(query) {
  setSearchQuery(query);
  // Если мы на главной — обновляем
  if (domElements.mainPage.style.display !== 'none') {
    fullUpdate();
  }
}

searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  handleSearch(searchInput.value);
});

searchInput.addEventListener('input', () => {
  handleSearch(searchInput.value);
});

searchInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleSearch(searchInput.value);
  }
});

// ─── Поиск — мобильный ───────────────────────────────────────────────────────
const mobileSearchInput  = document.getElementById('mobile-search-input');
const mobileSearchButton = document.getElementById('mobile-search-btn');

function handleMobileSearch() {
  const query = mobileSearchInput.value;
  searchInput.value = query; // синхронизируем с десктоп-полем
  handleSearch(query);
  closeBurgerMenu();
  // Переключаемся на главную чтобы показать результаты
  if (domElements.mainPage.style.display === 'none') {
    navigateToPage('main');
  }
}

mobileSearchButton.addEventListener('click', (e) => {
  e.preventDefault();
  handleMobileSearch();
});

mobileSearchInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleMobileSearch();
  }
});

// ─── Навигация ────────────────────────────────────────────────────────────────
function navigateToPage(pageId) {
  document.getElementById('detail-page').style.display = 'none';
  const old = document.querySelector('.dynamic-page-wrapper');
  if (old) old.remove();

  closeBurgerMenu();

  if (pageId === 'main') {
    document.getElementById('main-page').style.display = 'flex';
    document.querySelector('.farm-sidebar').style.display = 'flex';
    fitMapToViewport();
    return;
  }

  document.getElementById('main-page').style.display = 'none';
  document.querySelector('.farm-sidebar').style.display = 'none';

  const app     = document.getElementById('app');
  const wrapper = document.createElement('div');
  wrapper.className = 'dynamic-page-wrapper';

  if (pageId === 'routes') {
    wrapper.innerHTML = getRoutesPageHTML();
    app.appendChild(wrapper);
    if (ymapsGlobal) {
      initRoutesPage(ymapsGlobal);
    }
  } else {
    wrapper.innerHTML = getPageContent(pageId);
    app.appendChild(wrapper);

    // Постинициализация для страниц с интерактивностью
    if (pageId === 'reviews') {
      initReviewsPage();
    }
  }
}

document.querySelectorAll('[data-page]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    navigateToPage(e.currentTarget.dataset.page);
  });
});

// ─── Бургер-меню ─────────────────────────────────────────────────────────────
const burgerBtn  = document.getElementById('burger-btn');
const mobileMenu = document.getElementById('mobile-menu');
const overlay    = document.getElementById('burger-overlay');

function openBurgerMenu() {
  mobileMenu.classList.add('is-open');
  overlay.classList.add('is-visible');
  burgerBtn.classList.add('is-active');
  document.body.style.overflow = 'hidden';
  // Фокус на поле поиска в мобильном меню
  setTimeout(() => mobileSearchInput?.focus(), 350);
}

function closeBurgerMenu() {
  mobileMenu.classList.remove('is-open');
  overlay.classList.remove('is-visible');
  burgerBtn.classList.remove('is-active');
  document.body.style.overflow = '';
}

burgerBtn.addEventListener('click', () => {
  mobileMenu.classList.contains('is-open') ? closeBurgerMenu() : openBurgerMenu();
});

overlay.addEventListener('click', closeBurgerMenu);
document.getElementById('mobile-menu-close').addEventListener('click', closeBurgerMenu);

// ─── Запуск приложения ────────────────────────────────────────────────────────
function startApp() {
  ymaps.ready(() => {
    ymapsGlobal = ymaps;
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
