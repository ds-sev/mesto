/* MANAGING OF DISPLAY USER INFORMATION AT PAGE  */
export class UserInfo {
  constructor(userNameOnPageSelector, userJobOnPageSelector) {
    this._userName = document.querySelector(userNameOnPageSelector)
    this._userJob = document.querySelector(userJobOnPageSelector)
  }
  //return object with user data. This method will be used when open form
  getUserInfo() {
    return {name: this._userName.textContent, job: this._userJob.textContent}
  }
  //receive new user data and send it to page
  setUserInfo(userData) {
    this._userName.textContent = userData.name
    this._userJob.textContent = userData.job
  }
}
