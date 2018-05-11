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

// Принимает json, из которых генерируются поля HTML
const convert = json => {
  const obj2HTML = obj => {
    let result = '';
    for (let key in obj) {
      result  += `<${key}>${obj[key]}</${key}>`;
    };
    return result;
  };
  const array2HTML = arr => '<ul>' + arr.map(el => '<li>' + obj2HTML(el) + '</li>').join('') + '</ul>';
  return Array.isArray(json) ? array2HTML(json) : obj2HTML(json)
};

console.log(convert(raw3));
console.log(convert(raw3) === answers.answer3);

// На основной странице результат работы конвертера
app.get('/', function (req, res) {
  res.send(convert(raw3));
});

app.listen(3000, function () {
  console.log('Сервер поднят на 3000!');
});
