const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');

const geterateGameNumber = require('./gameNumber');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (question) => new Promise((resolve) => {
  rl.question(question, resolve);
});

const secretNumber = geterateGameNumber();
console.log('Загадано число в диапазоне от 1 до 2');

const dataLog = new Date().toISOString();

const guessNumber = async () => {
  try {
    const answer = await askQuestion('Введите число: ');
    const num = Number(answer);

    const dir = path.join(__dirname, 'log-folder');
    await fs.mkdir(dir, { recursive: true });
    console.log('Папка "log-folder" создана');

    const file = path.join(dir, `${dataLog}log.txt`);
    await fs.appendFile(file, `${num}\n`);
    console.log(`Файл "${secretNumber}.txt" создан`);

    if (isNaN(num)) {
      console.log('Введите число!');
      await guessNumber();
    } else if (num === secretNumber) {
      console.log('Вы угадали!');
      rl.close();
    } else {
      console.log('Вы не угадали!');
      await guessNumber();
    }
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
};

guessNumber();
