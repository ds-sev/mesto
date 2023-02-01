/** REQUESTS TO THE SERVER **/
import {name, about, avatar} from '../pages/index.js';


export class Api {



  getUserInfo() {
      fetch('https://mesto.nomoreparties.co/v1/cohort-59/users/me/', {
        headers: {
          authorization: 'c4ab66aa-531d-4641-bb6a-e0dfe4dabae8',
          'Content-Type': 'application/json',
        },
      })
        .then(res => {
          if (res.ok) {
            return res.json()
          } else {
            return Promise.reject(`Ошибка: ${res.status}`)
          }
        })

      .then((result) => {
        name.textContent = result.name,
          about.textContent = result.about,
          avatar.src = result.avatar
      });
  }


  getInitialCards(result) {

    return fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards/', {
      headers: {
        authorization: 'c4ab66aa-531d-4641-bb6a-e0dfe4dabae8',
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return Promise.reject(`Ошибка: ${res.status}`)
        }
      })

      .then((result) => {
        return result

      });
  }
}


// export const api = new Api({
//   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
//   headers: {
//     authorization: 'c4ab66aa-531d-4641-bb6a-e0dfe4dabae8',
//     'Content-Type': 'application/json',
//   },
// })
export const api = new Api

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


api.getUserInfo()

// api.getInitialCards()
