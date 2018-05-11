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
    const noHTML = html => html
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    const parceTag = key => {
      const regClass = /\.[a-zA-Z0-9-]+/g;
      const regId = /#[a-zA-Z0-9-]+/g;
      const regTag = /^[a-zA-Z0-9-]+/g;
      const parced = {
        tag: key.match(regTag)[0],
        id: key.match(regId) && 'id="'+key.match(regId)[0].slice(1)+'"',
        class: key.match(regClass) && 'class="'+key.match(regClass).map(item => item.slice(1)).join(' ')+'"'
      };
      return {
        open: Object.values(parced).reduce((prev, curr) => curr ? prev.concat(` ${curr}`): prev),
        close: parced.tag
      };
    };
    let result = '';
    for (let key in obj) {
      const value = obj[key];
      const checkList = item => Array.isArray(item);
      const tag = parceTag(key);
      result  += `<${tag.open}>${checkList(value) ? convert(value) : noHTML(value)}</${tag.close}>`;
    };
    return result;
  };

  const array2HTML = arr => '<ul>' + arr.map(el => '<li>' + obj2HTML(el) + '</li>').join('') + '</ul>';

  return Array.isArray(json) ? array2HTML(json) : obj2HTML(json)
};


console.log(convert(raw3));
console.log(convert(raw3) === answers.answer3);
console.log(convert(raw41));
console.log(convert(raw41) === answers.answer41);
console.log(convert(raw42));
console.log(convert(raw42) === answers.answer42);
console.log(convert(raw5));
console.log(convert(raw5) === answers.answer5);

// На основной странице результат работы конвертера
app.get('/', function (req, res) {
  res.send(convert(raw5));
});

app.listen(3000, function () {
  console.log('Сервер поднят на 3000!');
});
