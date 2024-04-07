// генерирует случайное число от 1 до 2
function geterateGameNumber() {
  return Math.trunc(Math.random() * 2 + 1);
}

module.exports = geterateGameNumber;
