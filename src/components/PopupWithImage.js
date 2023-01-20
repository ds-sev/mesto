import {Popup} from './Popup.js'

//Этот класс должен перезаписывать родительский метод open.
// В методе open класса PopupWithImage нужно вставлять в попап
// картинку с src изображения и подписью к картинке.

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  }

  open(link, name) {
    super.open()
    this._popup.querySelector('.image-view__item').src = link
    this._popup.querySelector('.image-view__item').alt = `На фото: ${name}`
    this._popup.querySelector('.image-view__title').textContent = name
  }
}
