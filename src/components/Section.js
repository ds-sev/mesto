import {userId} from '../pages';

export class Section {
  constructor(containerSelector, renderer) {
    this._renderer = renderer
    this._containerElement = document.querySelector(containerSelector)
  }

  renderItems(initialCardsData) {
    initialCardsData.reverse().forEach(cardData => {
      this._renderer(cardData)
      if (cardData.owner._id !== userId.textContent) {
        document.querySelector('.card__button-delete').classList.add('card__button-delete_hide')
      }
    })
  }


  addCard(element) {
    this._containerElement.prepend(element)
  }
}
