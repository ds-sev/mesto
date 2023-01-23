export class Section {
  constructor({cardsData, renderer}, containerSelector) {
    this._cardsData = cardsData
    this._renderer = renderer
    this._containerElement = document.querySelector(containerSelector)
  }

  renderItems() {
    this._cardsData.forEach((cardData) => {
      this._renderer(cardData)
    })
  }

  addCard(element) {
    this._containerElement.prepend(element)
  }
}
