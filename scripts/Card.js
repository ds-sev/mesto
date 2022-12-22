/* CARD-CLASS */
class Card {
  constructor(template, cardData, handleImageClick) {
    this._handleImageClick = handleImageClick
    this._name = cardData.name
    this._link = cardData.link
    this._template = template
  }

  _getTemplate() {
    return this._template.cloneNode(true)
  }

  _handleTargetCardDelete(evt) {
    evt.target.closest('.card').remove()
  }

  _setEventListeners() {
    //переключатель лайков
    const likeButton = this._element.querySelector('.card__button-like')
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('card__button-like_active')
    })
    //слушатель для кнопки удаления карточки
    const deleteButton = this._element.querySelector('#card-button-delete')
    deleteButton.addEventListener('click', this._handleTargetCardDelete)
    //слушатель для открытия полноэкранного изображения
    this._element.querySelector('.card__photo-container').addEventListener('click', () =>
      this._handleImageClick(this._link, this._name))
  }
  //возврат готовой к отрисовке карточки
  generateCard() {
    this._element = this._getTemplate()
    this._element.querySelector('.card__title').textContent = this._name
    this._element.querySelector('.card__photo-container').style.backgroundImage = `url(${this._link}`
    this._setEventListeners()
    return this._element
  }
}

/* EXPORTS */
export {Card}
