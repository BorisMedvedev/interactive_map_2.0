// search.js — управляет поисковым запросом.

/**
 * ИЗМЕНЕНИЙ НЕ МНОГО — модуль был написан правильно.
 * Добавлена только защита: если searchQuery пустой — возвращаем farms как есть.
 */

let searchQuery = '';

/**
 * Сохраняет поисковый запрос (обрезает пробелы, приводит к нижнему регистру).
 * @param {string} query
 */
export function setSearchQuery(query) {
  searchQuery = query.trim().toLowerCase();
}

/**
 * Фильтрует фермы по поисковому запросу.
 * Ищет совпадение в name, product и description.
 * @param {Array} farms — массив ферм (уже отфильтрованный по категории)
 * @returns {Array}
 */
export function applySearch(farms) {
  if (!searchQuery) return farms;

  return farms.filter(
    (farm) =>
      farm.name.toLowerCase().includes(searchQuery) ||
      farm.product.toLowerCase().includes(searchQuery) ||
      farm.description.toLowerCase().includes(searchQuery),
  );
}

/**
 * Возвращает текущий поисковый запрос (может пригодиться в других модулях).
 */
export function getSearchQuery() {
  return searchQuery;
}
