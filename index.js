// Основной сервер-приложение
// Берёт файл, обрабатывает, выводит результат на порт 3000

const express = require('express');
const json2html = require('./lib/node-json2html');
const app = express();

const raw1 = require('./src/source1.json');
const raw2 = require('./src/source2.json');
const raw3 = require('./src/source3.json');
const raw41 = require('./src/source4_1.json');
const raw42 = require('./src/source4_2.json');
const raw5 = require('./src/source5.json');
const answers = require('./src/answers');

// На основной странице результаты сверки с ответами из задания
app.get('/', function (req, res) {
  res.send('Здесь будет последовательное решение задачи, словно заказчик вносит правки');
});

app.listen(3000, function () {
  console.log('Сервер поднят на 3000!');
});
