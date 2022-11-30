/* ПОЛЯ ПРОФИЛЯ НА СТРАНИЦЕ */
const nameOnPage = document.querySelector('.profile__name');                                //отображаемое на сайте имя
const jobOnPage = document.querySelector('.profile__about');                                //отображаемое на сайте занятие
/* РЕДАКТИРОВАНИЕ ПРОФИЛЯ */
const profileEditButton = document.querySelector('.profile__button-edit');                  //кнопка редактирования профиля
const profileEditPopup = document.querySelector('#profile-edit-popup');                     //форма редактирования профиля
const nameInput = document.querySelector('.edit-form__field_get_name');                     //значения поля имени в форме
const jobInput = document.querySelector('.edit-form__field_get_job');                       //значение поля ввода занятия в форме
const profilePopupButtonClose = document.querySelector('#profile-edit-form-button-close');  //кнопка закрытия формы редактирования профиля
/* ДОБАВЛЕНИЕ МЕСТА */
const addCardButton = document.querySelector('.profile__button-add')                        //кнопка добавления новой карточки
const addCardPopup = document.querySelector('#add-card-popup');                             //форма добавления нового места
const cardPopupButtonClose = document.querySelector('#add-card-form-button-close');         //кнопка закрытия формы добавления нового места

const popup = document.querySelector('.popup');
const profileEditForm = popup.querySelector('#profile-edit-form');

/* ОТКРЫТИЕ ПОПАПА РЕДАКТИРОВАНИЯ ПРОФИЛЯ */
const profileEditOpenPopup = function () {
  profileEditPopup.classList.add('popup_opened');
  nameInput.value = nameOnPage.textContent;
  jobInput.value = jobOnPage.textContent;
}

/* ОТКРЫТИЕ ПОПАПА ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ */
const addCardOpenPopup = function () {
  addCardPopup.classList.add('popup_opened');
  placeInput.value = '';
  linkInput.value = '';
}

/* ЗАКРЫТИЕ ПОПАПОВ */
const closePopup = function () {
  profileEditPopup.classList.remove('popup_opened');
  addCardPopup.classList.remove('popup_opened');
  imageViewPopup.classList.remove('popup_opened');
}

/* ПОЛУЧЕНИE ДАННЫХ ИЗ ФОРМЫ РЕДАКТИРОВАНИЯ ПРОФИЛЯ */
function formSubmitHandler(evt) {
  evt.preventDefault();
  nameOnPage.textContent = nameInput.value;
  jobOnPage.textContent = jobInput.value;
  closePopup();
}

profileEditButton.addEventListener('click', profileEditOpenPopup);
profilePopupButtonClose.addEventListener('click', closePopup);
cardPopupButtonClose.addEventListener('click', closePopup);
addCardButton.addEventListener('click', addCardOpenPopup);
profileEditForm.addEventListener('submit', formSubmitHandler);

/* МАССИВ ПРЕДЗАГРУЖЕННЫХ КАРТОЧЕК */
const initialCards = [
  {
    name: 'Севастополь',
    link: 'https://images.unsplash.com/photo-1598177183267-28a7765536de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Коктебель',
    link: 'https://images.unsplash.com/photo-1644745585878-2617e61fff00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Бахчисарай',
    link: 'https://images.unsplash.com/photo-1598707206160-0a6b20211774?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80'
  },
  {
    name: 'Алупка',
    link: 'https://images.unsplash.com/photo-1601204057702-0bf266c98ca9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Белогорск',
    link: 'https://images.unsplash.com/photo-1623527859001-8010a15cf790?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Ялта',
    link: 'https://images.unsplash.com/photo-1624571149875-59a402116d88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  }
];

/* DOM-УЗЛЫ ДЛЯ РАБОТЫ С КАРТОЧКАМИ */
const cardsSection = document.querySelector('.cards');
const addCardForm = addCardPopup.querySelector('#add-card-form');
const placeInput = addCardPopup.querySelector('.edit-form__field_get_place-name');                             //значения поля ввода названия места
const linkInput = addCardPopup.querySelector('.edit-form__field_get_link');                                    //значение поля ввода ссылки на изображение

/* УДАЛЕНИЕ КАРТОЧКИ */
const deleteCard = (event) => {
  event.target.closest('.card').remove();
}

const imageViewPopup = document.querySelector('#image-view-popup');
const imageViewItem = document.querySelector('.image-view__item');
const imageViewTitle = document.querySelector('.image-view__title');
const imageViewCloseButton = document.querySelector('#image-view-button-close');
imageViewCloseButton.addEventListener('click', closePopup);

/* ФУНКЦИЯ СОЗДАНИЯ КАРТОЧКИ */
const generateCard = (cardData) => {
  const cardTemplate = document.querySelector('#card').content.querySelector('.card');
  const cardElement = cardTemplate.cloneNode(true);
  const cardName = cardElement.querySelector('.card__title');
  const cardLink = cardElement.querySelector('.card__photo-container');
  cardName.textContent = cardData.name;
  cardLink.style.backgroundImage = `url(${cardData.link})`;
  //функция переключения активности Лайков
  const switchLikeButton = () => {
    const likeButton = cardElement.querySelector('#card__button-like');
    likeButton.addEventListener('click', (event) => {
      event.target.classList.toggle('card__button-like_active');
    })
  }
  switchLikeButton();
  const deleteCardButton = cardElement.querySelector('#card-button-delete');
  //вызов функции удаления карточки
  deleteCardButton.addEventListener('click', deleteCard);
  //просмотр полноэкранного изображения выбранной карточки
  const imageCard = cardElement.querySelector('#image-card');
  const imageViewOpen = () => {
    imageViewPopup.classList.add('popup_opened');
    imageViewItem.src = cardData.link;
    imageViewTitle.textContent = cardName.textContent;
  }
  imageCard.addEventListener('click', imageViewOpen);
  return cardElement;
}

/* ФУНКЦИЯ ДОБАВЛЕНИЯ КАРТОЧКИ В РАЗМЕТКУ */
const renderCard = (cardData) => {
  cardsSection.prepend(generateCard(cardData));
}

/* ПЕРЕБОР МАССИВА ПРЕДЗАГРУЖЕННЫХ КАРТОЧКЕК И ПЕРЕДАЧА КАЖДОГО ЭЛЕМЕНТА В ФУНКЦИЮ СОЗДАНИЯ НОВОЙ КАРТОЧКИ */
initialCards.slice().reverse()
  .forEach((cardData) => {
    renderCard(cardData);
  });

/* ФУНКЦИЯ ДОБАВЛЕНИЯ КАРТОЧКИ В РАЗМЕТКУ */
const handleSubmitAddCardForm = (event) => {
  event.preventDefault();
  renderCard({name: placeInput.value, link: linkInput.value});
  closePopup();
}
addCardForm.addEventListener('submit', handleSubmitAddCardForm);




