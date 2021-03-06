# Динамическая таблица

Данные для таблицы загружаются динамически из demo.json файла

В каждой колонке таблицы есть поле поиска по тексту и кнопка сортировки по алфавиту

Результат:
https://e-v-pavlova.github.io/dynamic-table/release/index.html

---

Js библиотеки не используются

Stack: Js ES6, Sass, Gulp, Eslint

---

Так как в задаче предполагается сортировка данных,
то можно реализовать 2 подхода: 
взаимодействовать напрямую с DOM, либо 
выполнять сортировку массива, хранящего данные таблицы,
а затем перестраивать таблицу полностью.

Второй способ более гибкий.
Например, легче реализовать учет типа данных при сортировке.
Недостакок подхода в том, что при каждом изменении массива даных будет 
происходить удаление предыдущей таблицы из DOM,
что влечет более частый вызов сборщика мусора,
а так же опасность утечки памяти при наличии ссылок на узлы.

Первый способ имеет преимущество в скорости.
В действиях, связанных с точечным изменением таблицы,
это преимущество становится существенным.
Недостаток подхода в том, что код сложно поддерживать.