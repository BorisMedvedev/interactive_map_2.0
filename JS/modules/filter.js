// filter.js — управляет состоянием фильтра и фильтрует массив ферм.

/**
 * ИЗМЕНЕНИЯ:
 * - Удалена дублирующая функция initFilterButtons.
 *   Она существовала и здесь, и в ui.js, что создавало путаницу.
 *   Теперь инициализация кнопок фильтра живёт ТОЛЬКО в ui.js,
 *   потому что это задача интерфейса, а не логики фильтрации.
 *
 * - В filter.js остаётся только чистая логика:
 *     setFilter()       — сменить текущий фильтр
 *     filterFarms()     — отфильтровать массив
 *     getCurrentFilter() — узнать текущий фильтр
 */

let currentFilter = 'all';

/**
 * Устанавливает новый фильтр и визуально выделяет нужную кнопку.
 * @param {string} category - например "Мясо", "Молоко", "all"
 */
export function setFilter(category) {
  currentFilter = category;

  // Обновляем класс .active на кнопках фильтра
  document.querySelectorAll('.filter-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.filter === category);
  });

  return currentFilter;
}

/**
 * Возвращает фермы, соответствующие текущему фильтру.
 * Если фильтр 'all' — возвращает все фермы без изменений.
 * @param {Array} farms — полный массив ферм
 * @returns {Array} отфильтрованный массив
 */
export function filterFarms(farms) {
  if (currentFilter === 'all') return farms;

  return farms.filter((farm) => {
    const productLower = farm.product.toLowerCase();
    const filterLower = currentFilter.toLowerCase();
    return productLower.includes(filterLower);
  });
}

/**
 * Возвращает текущее значение фильтра (для использования в других модулях).
 */
export function getCurrentFilter() {
  return currentFilter;
}
