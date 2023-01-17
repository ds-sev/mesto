class UserInfo {
  constructor(userNameSelector, userAboutSelector) {
    this._userName = userNameSelector
    this._userJob = userAboutSelector
  }

  getUserInfo() {
    //return object with user data. This method will be used when open form
  }

  setUserInfo() {
    //receive new user data and send it to page
  }
}
