// Основной сервер-приложение
// Берёт файл, обрабатывает, выводит результат на порт 3000

const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Сервер поднят на 3000!');
});
