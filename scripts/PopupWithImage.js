import {Popup} from './Popup.js';

//Этот класс должен перезаписывать родительский метод open.
// В методе open класса PopupWithImage нужно вставлять в попап
// картинку с src изображения и подписью к картинке.

export class PopupWithImage extends Popup {
  constructor(link, name) {
    this._imageLink = link
    this._imageName = name


  }
  // imageViewItem.src = link;
  // imageViewTitle.textContent = name;
  // imageViewItem.alt = `На фото: ${name}`;
  open(link, name) {
    super.open();
  }
}
