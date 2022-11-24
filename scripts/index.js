const profileEditButton = document.querySelector('.profile__button-edit');
const nameOnPage = document.querySelector('.profile__name');         //отображаемое на сайте имя
const jobOnPage = document.querySelector('.profile__about');         //отображаемое на сайте занятие

const popup = document.querySelector('.popup');
const formElement = popup.querySelector('.profile-edit-form');
const popupCloseButton = document.querySelector('.profile-edit-form__button-close');
const nameInput = document.querySelector('.profile-edit-form__field_get_name');                   //поле ввода имени формы
const jobInput = document.querySelector('.profile-edit-form__field_get_job');                     //поле ввода занятия формы



const openPopup = function () {                                                //функция открытия попап
  popup.classList.add('popup_opened');
  nameInput.value = nameOnPage.textContent;
  jobInput.value = jobOnPage.textContent;
}

const closePopup = function () {                                               //функция закрытия попап
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {                                               //функция получения данных из формы
  evt.preventDefault();
  nameOnPage.textContent = nameInput.value;
  jobOnPage.textContent = jobInput.value;
  closePopup();
}

                                                             //переключатель кнопки Лайк
profileEditButton.addEventListener('click', openPopup);                     //открыть попап
popupCloseButton.addEventListener('click', closePopup);                     //закрыть попап
formElement.addEventListener('submit', formSubmitHandler);                  //отправка формы по нажатию кнопки Сохранить


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
    link: 'https://images.unsplash.com/photo-1621953231638-78df098abfb8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
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


const cardTemplate = document.querySelector('#card').content;
const cardsSection = document.querySelector('.cards');
for (let i = 0; i < initialCards.length; i++) {                                                      //Добавление в DOM карточек из массива
  const cardName = initialCards[i].name;
  const cardPhoto = initialCards[i].link;
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__photo-container').style.backgroundImage = `url(${cardPhoto})`;
  cardElement.querySelector('.card__title').textContent = cardName;
  cardsSection.append(cardElement);
}


/* LIKES */
const likeButton = document.querySelectorAll('#card__button-like');

const switchLikeButton = () => {
  likeButton.forEach(like => {
    like.addEventListener('click', (event) => {
      event.target.classList.toggle('card__button-like_active');
    })
  })
}

switchLikeButton();








