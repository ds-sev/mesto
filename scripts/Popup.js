export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector
  }
  open() {
    document.querySelector(this._popupSelector).classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose)
  }
  close() {
    document.querySelector(this._popupSelector).classList.remove('popup_opened');
  }
  _handleEscClose(e) {
    if (e.code === 'Escape') {
      document.querySelector('.popup_opened').classList.remove('popup_opened');
    }
  }
  setEventsListeners() {            //слушатель клика иконки закрытия попапа
    document.querySelector(this._popupSelector).addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget || evt.target.classList.contains('button_type_close')) {
        this.close();
      }
    })
  }
}


