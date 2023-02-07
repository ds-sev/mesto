/* CARD-CLASS */
class Card {
  constructor(cardData, userId, templateSelector, handleCardClick, {
    handleCardDelete,
    handleCardReaction,
  }) {
    this._templateSelector = templateSelector
    this._handleCardClick = handleCardClick
    this._card = cardData
    this._name = cardData.name
    this._link = cardData.link
    this._likesCounter = cardData.likes
    this._userId = userId
    this._handleCardDelete = handleCardDelete
    this._handleCardReaction = handleCardReaction
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
    if (this._card.owner._id !== this._userId) {
      this._element.querySelector('.card__button-delete').classList.add('card__button-delete_hide')
    }
    this._likesQty()
    this.isCardLiked()
    return this._element
  }

  handleRemoveItem = () => {
    this._element.remove()
    this._element = null
  }

  _likesQty() {
    this._element.querySelector('.likes-container__counter').textContent = this._likesCounter.length
  }

  likesCounter(likesQuantity) {
    this._likesCounter = likesQuantity
    this.isCardLiked()
    this._likesQty()
  }

  isCardLiked() {
    if (this._likesCounter.find(user => user._id === this._userId)) {
      this._likeBtn.classList.add('card__button-like_active')
      return true
    } else {
      this._likeBtn.classList.remove('card__button-like_active')
    }
  }

  _setEventListeners() {
    //переключатель лайков
    this._likeBtn = this._element.querySelector('.likes-container__button')
    this._likeBtn.addEventListener('click', () => this._handleCardReaction(this._card))

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
