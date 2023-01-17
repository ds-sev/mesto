/* ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПА */
export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
  }
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose)
  }
  close() {
    this._popup.classList.remove('popup_opened');
  }
  //метод закрытия по Esc
  _handleEscClose(evt) {
    if (evt.code === 'Escape' && document.querySelector('.popup_opened')) {
      document.querySelector('.popup_opened').classList.remove('popup_opened');
    }
  }
  //слушатель клика иконки закрытия попапа + оверлей
  setEventsListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget || evt.target.classList.contains('button_type_close')) {
        this.close();
      }
    })
  }
}


