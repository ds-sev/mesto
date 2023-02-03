/** REQUESTS TO THE SERVER **/
import {name, about, avatar} from '../pages';


class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl
    this._headers = headers
  }

  getUserInfo() {
      fetch(`${this._baseUrl}/users/me/`, {
        headers: this._headers
      })
        .then(res => {
          if (res.ok) {
            return res.json()
          } else {
            return Promise.reject(`Ошибка: ${res.status}`)
          }
        })
        .then((result) => {
          name.textContent = result.name
            about.textContent = result.about
            avatar.src = result.avatar
        })
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards/`, {
      headers: this._headers,
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(err => console.log(err))
  }

  postNewCard(newCardData) {
    fetch(`${this._baseUrl}/cards/`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: newCardData.name,
        link: newCardData.link
      })
    })
      .catch(err => console.log(err.message))
  }








  setUserInfo(newData) {
    fetch(`${this._baseUrl}/users/me/`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newData.name,
        about: newData.job
      })
    })
      .catch(err => console.log(err.message))
       // .then(res => console.log(res.status));


  }







}







// export const api = new Api({
//   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
//   headers: {
//     authorization: 'c4ab66aa-531d-4641-bb6a-e0dfe4dabae8',
//     'Content-Type': 'application/json',
//   },
// })
export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {authorization: 'c4ab66aa-531d-4641-bb6a-e0dfe4dabae8',
    'Content-Type': 'application/json'
  }
})

api.getUserInfo()




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
