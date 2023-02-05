/* CARD-CLASS */
class Card {
  constructor(cardData, templateSelector, handleCardClick, { handleCardDelete }) {
    this._templateSelector = templateSelector
    this._handleCardClick = handleCardClick
    this._card = cardData
    this._name = cardData.name
    this._link = cardData.link

    // this._cardId = cardData._id


    this._handleCardDelete = handleCardDelete
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
    this._element.querySelector('.card__title').textContent = this._name
    this._setEventListeners()
    // this._card._id = 'fffggg999'
    return this._element
  }

  handleRemoveItem = () => {
    this._element.remove()
    console.log(this._element)
    this._element = null
  }

  _handleLikeButtonSwitch() {
    this._likeBtn.classList.toggle('card__button-like_active')
  }

  _setEventListeners() {
    //переключатель лайков
    this._likeBtn = this._element.querySelector('.likes-container__button')
    this._likeBtn.addEventListener('click', () => this._handleLikeButtonSwitch())
    //слушатель для кнопки удаления карточки
    const deleteButton = this._element.querySelector('.card__button-delete')
    deleteButton.addEventListener('click', () => this._handleCardDelete(this._card))


    //слушатель для открытия полноэкранного изображения
    this._cardImage.addEventListener('click', () =>
      this._handleCardClick(this._link, this._name))
  }
}
/* EXPORTS */
export {Card}
