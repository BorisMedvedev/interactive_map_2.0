// Возвращает эмодзи в зависимости от названия фермы
export function getFarmEmoji(name) {
  if (name.includes('Сабиново')) return '🌾';
  if (name.includes('Пигуля')) return '🐄';
  if (name.includes('Столяренко')) return '🐑';
  if (name.includes('Морозов')) return '🌾';
  if (name.includes('Артемьева')) return '🐑';
  if (name.includes('Сабиновский')) return '🌾';
  if (name.includes('птицефабрика»')) return '🐔';
  return '🚜';
}