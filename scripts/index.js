const likeButton = document.querySelectorAll('.card__button-like');

const profileEditButton = document.querySelector('.profile__button-edit');
const nameOnPage = document.querySelector('.profile__name');         //отображаемое на сайте имя
const jobOnPage = document.querySelector('.profile__about');         //отображаемое на сайте занятие

const formElement = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.profile-edit-form__button-close');
const nameInput = document.getElementById('name');                   //поле ввода имени формы
const jobInput = document.getElementById('job');                     //поле ввода занятия формы

const likeButtonSwitch = () => {                                               //функция переключения активности кнопки Лайк
    likeButton.forEach(like => {
        like.addEventListener('click', (event) => {
            event.target.classList.toggle('card__button-like_active');
        })
    })
}

const openPopup = function () {                                                //функция открытия попап
    formElement.classList.add('popup_opened');
    nameInput.value = nameOnPage.textContent;
    jobInput.value = jobOnPage.textContent;
}

const closePopup = function () {                                               //функция закрытия попап
    formElement.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {                                               //функция получения данных из формы
    evt.preventDefault();
    let name = nameInput.value;
    let job = jobInput.value;
    nameOnPage.textContent = name;
    jobOnPage.textContent = job;
    closePopup();
}

likeButtonSwitch();                                                              //переключатель кнопки Лайк
profileEditButton.addEventListener('click', openPopup);                     //открыть попап
popupCloseButton.addEventListener('click', closePopup);                     //закрыть попап
formElement.addEventListener('submit', formSubmitHandler);                  //отправка формы по нажатию кнопки Сохранить













