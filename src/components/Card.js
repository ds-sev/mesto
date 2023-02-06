/* CARD-CLASS */
class Card {
  constructor(cardData, templateSelector, handleCardClick, handleCardLike, { handleCardDelete }) {
    this._templateSelector = templateSelector
    this._handleCardClick = handleCardClick
    this._card = cardData
    this._name = cardData.name
    this._link = cardData.link
    this._likesArr = cardData.likes
    this._handleCardDelete = handleCardDelete
    this._handleCardLike = handleCardLike
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
    this._element.querySelector('.likes-container__counter').textContent = this._likesArr.length
    this._setEventListeners()




    this.handleLikeButtonSwitch()



    return this._element
  }

  handleRemoveItem = () => {
    this._element.remove()
    console.log(this._element)
    this._element = null
  }


  isCardLiked () {
    if (this._likesArr._id) {
      console.log('неть:(')
    }
    console.log(this._likesArr.find(obj => obj._id === '09275283f6304291261babaa'))
      }

  handleLikeButtonSwitch() {
    // this._likeBtn.classList.toggle('card__button-like_active')
    if (this._likesArr.find(obj => obj._id === '09275283f6304291261babaa')) {
      this._likeBtn.classList.add('card__button-like_active')
      this._handleCardLike(this._card._id)
    } else {
      this._likeBtn.classList.remove('card__button-like_active')
      this._handleCardLike(this._card._id)
    }
  }

  _setEventListeners() {
    //переключатель лайков
    this._likeBtn = this._element.querySelector('.likes-container__button')
    this._likeBtn.addEventListener('click', () => this.handleLikeButtonSwitch())
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
