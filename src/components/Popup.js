/* OPEN AND CLOSE POPUP */
export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._handleEscClose = this._handleEscClose.bind(this)
    document.addEventListener('keydown', this._handleEscClose)
  }

  close() {
    this._popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleEscClose)
  }
  //close popup by press Esc-button
  _handleEscClose(evt) {
    if (evt.code === 'Escape') {
      this.close()
    }
  }
  //listener for close popup by click on close icon or click on overlay
  setEventsListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget || evt.target.classList.contains('button_type_close')) {
        this.close();
      }
    })
  }
}


