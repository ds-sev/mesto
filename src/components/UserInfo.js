/* MANAGING OF DISPLAY USER INFORMATION AT PAGE  */
export class UserInfo {
  constructor(userNameOnPageSelector, userJobOnPageSelector, avatarSelector) {
    this._userName = document.querySelector(userNameOnPageSelector)
    this._userJob = document.querySelector(userJobOnPageSelector)
    this._avatar = document.querySelector(avatarSelector)
  }

  //return object with user data. This method will be used when open form
  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._userJob.textContent,
      avatar: this._avatar.src,
    }
  }

  getUserId() {
    return this._userId
  }

  //receive new user data and send it to page
  setUserInfo(userData) {
    this._userName.textContent = userData.name
    this._userJob.textContent = userData.about
    this._avatar.style.backgroundImage = `url(${userData.avatar}`
    this._userId = userData._id
  }
}
