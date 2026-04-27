// routes.js — страница туристических маршрутов
// Выбор КФХ: 1-й = точка отправления, 2-й+ = точки маршрута
// Строит маршрут через Яндекс.Карты MultiRoute

import { farms } from './data.js';
import { getFarmEmoji } from './utils.js';

let routeMap = null;
let multiRoute = null;
let selectedFarms = []; // массив выбранных id КФХ

// ─── Инициализация карты маршрутов ───────────────────────────────────────────
export function initRoutesMap(ymaps, containerId) {
  routeMap = new ymaps.Map(containerId, {
    center: [56.82254252681233, 40.85911659965104],
    zoom: 11,
    controls: ['zoomControl', 'typeSelector', 'fullscreenControl'],
  });
  return routeMap;
}

// ─── Очистить маршрут ─────────────────────────────────────────────────────────
function clearRoute() {
  if (multiRoute) {
    routeMap.geoObjects.remove(multiRoute);
    multiRoute = null;
  }
}

// ─── Построить маршрут по выбранным КФХ ──────────────────────────────────────
function buildRoute(ymaps) {
  clearRoute();
  if (selectedFarms.length < 2) return;

  const points = selectedFarms.map((id) => {
    const farm = farms.find((f) => f.id === id);
    return farm ? farm.coords : null;
  }).filter(Boolean);

  multiRoute = new ymaps.multiRouter.MultiRoute(
    {
      referencePoints: points,
      params: { routingMode: 'auto' },
    },
    {
      boundsAutoApply: true,
      routeActiveStrokeColor: '#3b8c4a',
      routeActiveStrokeWidth: 5,
      wayPointStartIconColor: '#3b8c4a',
      wayPointFinishIconColor: '#d9a13b',
    }
  );
  routeMap.geoObjects.add(multiRoute);
}

// ─── Выбрать/снять КФХ ───────────────────────────────────────────────────────
function toggleFarm(farmId, ymaps) {
  const idx = selectedFarms.indexOf(farmId);
  if (idx === -1) {
    selectedFarms.push(farmId);
  } else {
    selectedFarms.splice(idx, 1);
  }
  updateRouteButtons();
  buildRoute(ymaps);
  updateRouteInfo();

  // Лететь к первому выбранному
  if (selectedFarms.length > 0) {
    const farm = farms.find((f) => f.id === selectedFarms[selectedFarms.length - 1]);
    if (farm) routeMap.setCenter(farm.coords, 13, { duration: 600 });
  }
}

// ─── Обновить внешний вид кнопок ─────────────────────────────────────────────
function updateRouteButtons() {
  document.querySelectorAll('.route-farm-btn').forEach((btn) => {
    const id = btn.dataset.farmId;
    const orderIdx = selectedFarms.indexOf(id);
    if (orderIdx === -1) {
      btn.classList.remove('selected');
      btn.querySelector('.route-order-badge').textContent = '';
      btn.querySelector('.route-order-badge').style.display = 'none';
    } else {
      btn.classList.add('selected');
      const badge = btn.querySelector('.route-order-badge');
      badge.textContent = orderIdx + 1;
      badge.style.display = 'flex';
    }
  });
}

// ─── Обновить информационную панель маршрута ──────────────────────────────────
function updateRouteInfo() {
  const panel = document.getElementById('route-info-panel');
  if (!panel) return;

  if (selectedFarms.length === 0) {
    panel.innerHTML = `<p class="route-hint">Выберите хозяйства ниже для построения маршрута</p>`;
    return;
  }

  const steps = selectedFarms.map((id, i) => {
    const farm = farms.find((f) => f.id === id);
    if (!farm) return '';
    const icon = getFarmEmoji(farm.product);
    return `<div class="route-step">
      <span class="route-step-num">${i + 1}</span>
      <span class="route-step-icon" style="background:${farm.color}">${icon}</span>
      <span class="route-step-name">${farm.name}</span>
    </div>`;
  }).join('<div class="route-step-arrow">→</div>');

  panel.innerHTML = `
    <div class="route-steps">${steps}</div>
    ${selectedFarms.length >= 2
      ? `<p class="route-status">Маршрут строится на карте...</p>`
      : `<p class="route-hint">Добавьте ещё хозяйство для построения маршрута</p>`
    }
    <button class="route-clear-btn" id="route-clear-btn">
      <svg viewBox="0 0 384 512" width="14" height="14"><path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3l105.4 105.3c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256l105.3-105.4z"/></svg>
      Очистить маршрут
    </button>
  `;

  document.getElementById('route-clear-btn')?.addEventListener('click', () => {
    selectedFarms = [];
    clearRoute();
    updateRouteButtons();
    updateRouteInfo();
  });
}

// ─── Генерация HTML страницы маршрутов ────────────────────────────────────────
export function getRoutesPageHTML() {
  // Кнопки КФХ такие же как на главной
  const farmButtons = farms.map((farm) => {
    const icon = getFarmEmoji(farm.product);
    return `
      <button class="route-farm-btn farm-btn" data-farm-id="${farm.id}" title="${farm.product}">
        <span class="route-order-badge" style="display:none"></span>
        ${farm.name}
        <span class="color-dot" style="background-color:${farm.color}"></span>
      </button>
    `;
  }).join('');

  return `
    <div class="routes-page">
      <div class="dynamic-page__header">
        <span class="dynamic-page__icon">
          <svg viewBox="0 0 576 512" width="36" height="36"><path fill="currentColor" d="M384 476.1L192 421.2V35.9L384 90.8V476.1zm32-1.2V88.4L543.1 37.5c15.8-6.3 32.9 5.3 32.9 22.3V394.6c0 9.8-6 18.6-15.1 22.3L416 474.9zM15.1 90.4L160 37.2V423.6L32.9 474.5C17.1 480.8 0 469.2 0 452.2V112.6c0-9.8 6-18.6 15.1-22.3z"/></svg>
        </span>
        <h1>Туристические маршруты</h1>
      </div>
      <p class="routes-description">
        Выбирайте фермерские хозяйства из списка — маршрут будет строиться автоматически.
        Первый выбор — точка старта, каждый следующий добавляет остановку.
      </p>

      <div class="routes-layout">

        <!-- Сайдбар с фермами -->
        <div class="routes-sidebar">
          <!-- Инфопанель маршрута -->
          <div id="route-info-panel" class="route-info-panel">
            <p class="route-hint">Выберите хозяйства ниже для построения маршрута</p>
          </div>

          <!-- Фильтр (те же кнопки что на главной) -->
          <div class="sidebar-filter">
            <h3 class="sidebar-filter__title">Фильтр</h3>
            <div class="sidebar-filter__buttons" id="route-filter-buttons">
              <button class="filter-btn active" data-route-filter="all">Все</button>
              <button class="filter-btn" data-route-filter="Мясо">Мясо</button>
              <button class="filter-btn" data-route-filter="Молоко">Молочное</button>
              <button class="filter-btn" data-route-filter="Яйца">Яйца</button>
              <button class="filter-btn" data-route-filter="Овощи">Овощи</button>
              <button class="filter-btn" data-route-filter="Пчеловодство">Мёд</button>
              <button class="filter-btn" data-route-filter="Ягоды">Ягоды</button>
              <button class="filter-btn" data-route-filter="Фрукты">Фрукты</button>
              <button class="filter-btn" data-route-filter="Зерно">Зерно</button>
            </div>
          </div>

          <!-- Список КФХ -->
          <div class="farm-buttons" id="route-farm-buttons">
            ${farmButtons}
          </div>
        </div>

        <!-- Карта маршрутов -->
        <div class="map-wrapper">
          <div id="routes-map"></div>
        </div>

      </div>
    </div>
  `;
}

// ─── Инициализация страницы маршрутов после вставки HTML ──────────────────────
export function initRoutesPage(ymaps) {
  selectedFarms = [];

  // Ждём пока DOM будет готов
  setTimeout(() => {
    initRoutesMap(ymaps, 'routes-map');

    // Клики по кнопкам КФХ
    document.querySelectorAll('.route-farm-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        toggleFarm(btn.dataset.farmId, ymaps);
      });
    });

    // Фильтрация в маршрутах
    document.querySelectorAll('[data-route-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.routeFilter;

        // Активный класс
        document.querySelectorAll('[data-route-filter]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Показываем/скрываем кнопки
        document.querySelectorAll('.route-farm-btn').forEach((farmBtn) => {
          const farmId = farmBtn.dataset.farmId;
          const farm = farms.find(f => f.id === farmId);
          if (!farm) return;
          const show = filter === 'all' || farm.product.toLowerCase().includes(filter.toLowerCase());
          farmBtn.style.display = show ? '' : 'none';
        });
      });
    });

    updateRouteInfo();
  }, 100);
}
