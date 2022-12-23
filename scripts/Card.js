/* CARD-CLASS */
class Card {
  constructor(cardData, templateSelector, handleImageClick) {
    this._templateSelector = templateSelector
    this._handleImageClick = handleImageClick
    this._name = cardData.name
    this._link = cardData.link
  }

  _getTemplate() {
    return this._templateSelector
      .content
      .querySelector('.card')
      .cloneNode(true)
  }

  generateCard() {
    this._element = this._getTemplate()
    this._cardImage = this._element.querySelector('.card__photo-container')
    this._cardImage.style.backgroundImage = `url(${this._link}`
    this._element.querySelector('.card__title').textContent = this._name
    this._setEventListeners()
    return this._element
  }

  _remove() {
    this._element.remove()
  }

  _like() {
    this._likeBtn.classList.toggle('card__button-like_active')
  }

  _setEventListeners() {
    //переключатель лайков
    this._likeBtn = this._element.querySelector('.card__button-like')
    this._likeBtn.addEventListener('click', () => this._like())
    //слушатель для кнопки удаления карточки
    const deleteButton = this._element.querySelector('.card__button-delete')
    deleteButton.addEventListener('click', () => this._remove())
    //слушатель для открытия полноэкранного изображения
    this._cardImage.addEventListener('click', () =>
      this._handleImageClick(this._link, this._name))
  }
}

/* EXPORTS */
export {Card}
