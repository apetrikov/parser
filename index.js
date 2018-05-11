// Основной сервер-приложение
// Берёт файл, обрабатывает, выводит результат на порт 3000

const express = require('express');
const app = express();

const raw1 = require('./src/source1.json');
const raw2 = require('./src/source2.json');
const raw3 = require('./src/source3.json');
const raw41 = require('./src/source4_1.json');
const raw42 = require('./src/source4_2.json');
const raw5 = require('./src/source5.json');
const answers = require('./src/answers');

// Принимает json-массив объектов, из которых генерируются поля HTML
const convert = arr => arr.map(el => {
  const pairs = Object.entries(el);
  return `<${pairs[0][0]}>${pairs[0][1]}</${pairs[0][0]}><${pairs[1][0]}>${pairs[1][1]}</${pairs[1][0]}>`;
}).join('');

// На основной странице результат работы конвертера
app.get('/', function (req, res) {
  res.send(convert(raw2));
});

app.listen(3000, function () {
  console.log('Сервер поднят на 3000!');
});
