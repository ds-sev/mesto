import {Popup} from './Popup.js';

//Этот класс должен перезаписывать родительский метод open.
// В методе open класса PopupWithImage нужно вставлять в попап
// картинку с src изображения и подписью к картинке.

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(link, name) {
    document.querySelector('.image-view__item').src = link
    document.querySelector('.image-view__title').textContent = name
    document.querySelector('.image-view__title').alt = `На фото: ${name}`
    super.open()
  }
}
