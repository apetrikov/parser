// Основной сервер-приложение
// Берёт файл, обрабатывает, выводит результат на порт 3000

const express = require('express');
const json2html = require('node-json2html');
const app = express();

const raw1 = require('./src/source1.json');
const raw2 = require('./src/source2.json');
const raw3 = require('./src/source3.json');
const raw41 = require('./src/source4_1.json');
const raw42 = require('./src/source4_2.json');
const raw5 = require('./src/source5.json');
const answers = require('./src/answers');

function task1(arr) {
  const resArr = [];
  const h1 = {'<>':'h1','html':'${title}'};
  const p = {'<>':'p','html':'${body}'};
  arr.forEach(item => Object.entries(item).map(row => resArr.push({ [row[0]]: row[1] })));
  const parse = (obj) => {
    switch (Object.keys(obj)[0]){
      case 'title':
        return json2html.transform(JSON.stringify(obj), h1);
      case 'body':
        return json2html.transform(JSON.stringify(obj), p);
    }
  }
  return resArr.map(item => parse(item)).join('');
}

function task2(arr) {
  const resArr = [];
  arr.forEach(item => Object.entries(item).map(row => resArr.push({ [row[0]]: row[1] })));
  const parse = (obj) => {
    const key = Object.keys(obj)[0];
    const rule = {'<>':key,'html':'${' + key + '}'};
    return json2html.transform(JSON.stringify(obj), rule);
  }
  return resArr.map(item => parse(item)).join('');
}

function task3(arr) {
  const resArr = arr.map(item => Object.entries(item).map(row => ({ [row[0]]: row[1] })));
  return '<ul>' + resArr.map(item => '<li>' + task2(item) + '</li>').join('') + '</ul>';
}

function task4(item) {
  const parse = (obj) => {
    const key = Object.keys(obj)[0];
    const rule = {'<>':key,'html':'${' + key + '}'};
    return json2html.transform(JSON.stringify(obj), rule);
  }
  function makeList(arr) {
    const resArr = [];
    arr.forEach(item => Object.entries(item).map(row => {
      const body = Array.isArray(row[1]) ? task4(row[1]) : row[1];
      return resArr.push({ [row[0]]: body });
    }));
    return resArr.map(item => parse(item)).join('');
  }
  if(!Array.isArray(item)) return parse(item);
  const resArr = item.map(item => Object.entries(item).map(row => ({ [row[0]]: row[1] })));
  return '<ul>' + resArr.map(item => '<li>' + makeList(item) + '</li>').join('') + '</ul>';
}

const html1 = task1(raw1);
const html2 = task2(raw2);
const html3 = task3(raw3);
const html41 = task4(raw41);
const html42 = task4(raw42);

app.get('/', function (req, res) {
  const tests = () => html1 === answers.answer1
    && html2 === answers.answer2
    && html3 === answers.answer3
    && html41 === answers.answer41
    && html42 === answers.answer42;
  res.send(tests());
});

app.get('/1', function (req, res) {
  res.send(html1);
});

app.get('/2', function (req, res) {
  res.send(html2);
});

app.get('/3', function (req, res) {
  res.send(html3);
});

app.get('/41', function (req, res) {
  res.send(html41);
});

app.get('/42', function (req, res) {
  res.send(html42);
});

app.listen(3000, function () {
  console.log('Сервер поднят на 3000!');
});
