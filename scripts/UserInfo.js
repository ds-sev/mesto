export class UserInfo {
  constructor(userNameSelector, userAboutSelector) {
    this._userName = document.querySelector(userNameSelector)
    this._userJob = document.querySelector(userAboutSelector)
  }
  //return object with user data. This method will be used when open form
  getUserInfo() {
    return {name: this._userName.textContent, job: this._userJob.textContent}
  }
  //receive new user data and send it to page
  setUserInfo(formData) {
    this._userName.textContent = formData.name
    this._userJob.textContent = formData.job
  }
}
