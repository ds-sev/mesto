/** REQUESTS TO THE SERVER **/
export class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl
    this._headers = headers
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me/`, {
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return Promise.reject(`Ошибка: ${res.status}`)
        }
      })
      .catch(err => console.log(err))
  }

  setUserInfo(newData) {
    return fetch(`${this._baseUrl}/users/me/`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newData.name,
        about: newData.job
      })
    })
      .catch(err => console.log(err.message))
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards/`, {
      headers: this._headers,
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(err => console.log(err))
  }

  postNewCard(newCardData) {
    return fetch(`${this._baseUrl}/cards/`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: newCardData.name,
        link: newCardData.link
      })
    })
      .catch(err => console.log(err.message))
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => res.ok ? res.json() : Promise.reject())
  }


  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(res => res.ok ? res.json() : Promise.reject())
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => res.ok ? res.json() : Promise.reject())
  }

  // getNewCardData(cardData) {
  //   fetch(`${this._baseUrl}/cards/${cardId}`,
  // }

}







// export const api = new Api({
//   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
//   headers: {
//     authorization: 'c4ab66aa-531d-4641-bb6a-e0dfe4dabae8',
//     'Content-Type': 'application/json',
//   },
// })


// let userId = 123








// api.getInitialCards()



// fetch('https://mesto.nomoreparties.co/v1/cohort-59/users/me/', {
//   headers: {
//     authorization: 'c4ab66aa-531d-4641-bb6a-e0dfe4dabae8',
//     'Content-Type': 'application/json'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   });

// fetch('https://mesto.nomoreparties.co/v1/cohort-59/users/me/avatar', {
//   method: 'PATCH',
//   headers: {
//     authorization: 'c4ab66aa-531d-4641-bb6a-e0dfe4dabae8',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     avatar: 'https://b.radikal.host/2023/01/31/IMG_0148.md.jpg'
//   })
// })
// api.getUserInfo()




// api.getInitialCards()
