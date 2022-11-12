const formElement = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__button-edit');
const popupCloseButton = document.querySelector('.profile-edit-form__button-close');
const likeButton = document.querySelectorAll('.card__button-like');
const nameOnPage = document.querySelector('.profile__name');
const jobOnPage = document.querySelector('.profile__about');

const nameInput = document.getElementById('name');
const jobInput = document.getElementById('job');

const likeButtonSwitch = () => {
    likeButton.forEach(like => {
        like.addEventListener('click', (event) => {
            event.target.classList.toggle('card__button-like_active');
        })
    })
}

const openPopup = function () {
    formElement.classList.add('popup_opened');
}

const closePopup = function () {
    formElement.classList.remove('popup_opened');
    document.querySelector('.profile-edit-form').reset();
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    let name = nameInput.value;
    let job = jobInput.value;
    nameOnPage.textContent = name;
    jobOnPage.textContent = job;
    closePopup();
}

likeButtonSwitch();
profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);














