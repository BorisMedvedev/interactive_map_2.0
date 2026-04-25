// utils.js — вспомогательные функции

/**
 * Возвращает эмодзи по полю product фермы, а не по названию.
 * Это надёжнее: не зависит от написания имён.
 *
 * БЫЛО: длинный список закомментированных if (name.includes(...))
 *       + возвращал <i class="fa-wheat-alt"></i> как строку текста —
 *       в шаблоне map.js она отображалась как текст, а не иконка.
 *
 * СТАЛО: чистая таблица соответствий product → эмодзи.
 *         Возвращаем обычный символ эмодзи — он корректно
 *         отображается в div-шаблоне Яндекс.Карт.
 */
export function getFarmEmoji(product) {
  if (!product) return '🌾';

  const p = product.toLowerCase();

  if (p.includes('цвет')) return '🌸';
  if (p.includes('мясо') || p.includes('мясн')) return '🥩';
  if (p.includes('молок') || p.includes('молочн')) return '🥛';
  if (p.includes('яйц')) return '🥚';
  if (p.includes('овощ')) return '🥕';
  if (p.includes('пчел') || p.includes('мёд') || p.includes('мед')) return '🍯';
  if (p.includes('ягод')) return '🫐';
  if (p.includes('фрукт')) return '🍎';
  if (p.includes('зерн')) return '🌾';
  if (p.includes('рыб')) return '🐟';
  if (p.includes('кролик') || p.includes('кроликов')) return '🐇';
  if (p.includes('птиц') || p.includes('курин')) return '🐔';

  return '🌿'; // эмодзи по умолчанию
}
