import {userId} from '../pages';

export class Section {
  constructor(containerSelector, renderer) {
    this._renderer = renderer
    this._containerElement = document.querySelector(containerSelector)
  }

  renderItems(initialCardsData) {
    initialCardsData.reverse().forEach(cardData => {
      this._renderer(cardData)

    })
  }


  addCard(element) {
    this._containerElement.prepend(element)
  }
}
