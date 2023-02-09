# Проект: Место
_Спринт 5: Практическая работа 4_
___
![logo_white](src/images/logo/logo_black.png)![logo_black](src/images/logo/logo.svg)
### Содержание

* Задание
* Описание проекта
* Примененные технологии
* [Ссылка на GitHub Pages](https://ds-sev.github.io/mesto)

**Задание**

Сверстать проект по макету в Figma. Реализовать модальное окно. Работать с ветками Git. Для проекта сделать ссылку на GitHub Pages.

**Описание проекта**

Проект Mesto - сайт, где пользователь может просматривать свои и загруженные другими людьми изображения, ставить или
убирать реакции к понравившемуся контенту. Пользователь может редактировать свою информацию, включая имя, род занятий
и аватар. Также, есть возможность удалять с сервера свои изображения. Для всех полей ввода в формах присутствует
валидация с проверкой введенных данных и подсказками об ошибках на случай некорректного заполнения. Верстка адаптивная
и выглядит лаконично и в едином стиле как на больших мониторах, так и на экранах смартфонов с малой диагональю.

**Примененные технологии**

* HTML (структура, верстка, семантика)
* Позиционирование элементов
* Flexbox
* Grid Layout
* Анимация и трансформация с использованием CSS
* БЭМ-методология
* Файловая структура (Nested BEM)
* Git
* JavaScript (Асинхронный JS, ООП, работа с сервером, API)
* настройка и сборка Webpack
* React JS
* Функциональные компоненты
* Валидация форм с использованием JS

**Ссылка на GitHub Pages:** https://ds-sev.github.io/mesto/

___

_UPD 20.12.22 Спринт 7: Практическая работа 7. ООП_

**Задание**

Продолжение работы над проектом Mesto. Рефакторинг ранее созданного кода.

**Описание проекта**

В ходе выполнения работы были применены знания, полученные в теоретической части об объектно-ориентированном программировании и модулях JS.
Произведен рефакторинг кода согласно концепции ООП.

_UPD 20.01.23 Спринт 8: Продолжение изучения ООП. Сборка проекта Webpack_

**Задание**

Продолжение работы над проектом Mesto.

**Описание проекта**

В ходе выполнения задания был произведен рефакторинг кода согласно ООП. Были созданы новые классы и настроены связи между ними.
Во второй части задания настроили сборку Вебпаком. Научились конфигурировать скрипты, работать с плагинами и подключать их, запускать проект на локальном сервере.
По итогу выполнения есть готовый рабочий проект. Ошибок в консоли не зафиксировано.

_UPD 07.02.23 Спринт 9: Подключение проекта к серверу_

**Задание**

Продолжение работы над проектом Mesto. Работа с запросами к серверу.

**Описание проекта**

В ходе выполнения работы было реализовано подключение к серверу. Был реализован функционал для
отправки и получения данных о пользователе, фото его профиля. Также изменено получение карточек.
Теперь они подгружаются не с локального хранилища или файла со ссылками, а сети. Изменена логика
работы удаления карточек и постановки/снятия лайков. Теперь пользователь может удалять только свои
карточки, а также просматривать лайки от других пользователей. Для удаления карточки была подготовлена
новая форма с подтверждением удаления. Также, при отправке новых данных на сервер теперь изменяется
текст кнопки. Для всех запросов к серверу добавлена обработка ошибок с выводом их в консоль.
