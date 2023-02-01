import {Popup} from './Popup.js'
/**
 * Этот класс должен перезаписывать родительский метод open.
 * Метод open класса PopupWithImage нужно вставлять в попап
 * картинку с src изображения и подписью к картинке.
 */
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popupImageElement = this._popup.querySelector('.image-view__item')
    this._popupImageTitleElement = this._popup.querySelector('.image-view__title')
  }
  open(link, name) {
    super.open()
    this._popupImageElement.src = link
    this._popupImageElement.alt = `На фото: ${name}`
    this._popupImageTitleElement.textContent = name
  }
}
