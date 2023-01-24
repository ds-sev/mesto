/* CARD-CLASS */
class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._templateSelector = templateSelector
    this._handleCardClick = handleCardClick
    this._place = cardData.place
    this._link = cardData.link
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true)
  }

  generateCard() {
    this._element = this._getTemplate()
    this._cardImage = this._element.querySelector('.card__photo-container')
    this._cardImage.style.backgroundImage = `url(${this._link}`
    this._element.querySelector('.card__title').textContent = this._place
    this._setEventListeners()
    return this._element
  }

  _handleRemoveItem() {
    this._element.remove()
    this._element = null
  }

  _handleLikeButtonSwitch() {
    this._likeBtn.classList.toggle('card__button-like_active')
  }

  _setEventListeners() {
    //переключатель лайков
    this._likeBtn = this._element.querySelector('.card__button-like')
    this._likeBtn.addEventListener('click', () => this._handleLikeButtonSwitch())
    //слушатель для кнопки удаления карточки
    const deleteButton = this._element.querySelector('.card__button-delete')
    deleteButton.addEventListener('click', () => this._handleRemoveItem())
    //слушатель для открытия полноэкранного изображения
    this._cardImage.addEventListener('click', () =>
      this._handleCardClick(this._link, this._place))
  }
}
/* EXPORTS */
export {Card}
