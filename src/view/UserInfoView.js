

class UserInfoView {
  constructor() {
    this._topBarDisplaynameInput = document.getElementById('displayname-input')
    this._topBarStatusInput = document.getElementById('status-input')
    this._splashScreen = document.getElementById('splash-screen')
    this._splashStartButton = document.getElementById('start-button')
    this._splashUserIdInput = document.getElementById('splash-uniqueid-input')
    this._splashDisplayNameInput = document.getElementById('splash-displayname-input')


    this._callbacks = {
      displaynameChanged: function(){},
      statusChanged: function(){},
      splashStart: function(){} // args: userUniqueId{string}, userDisplayName{string}
    }

    let that = this

    this._topBarStatusInput.addEventListener('keyup', function(e){
      let content = that._topBarStatusInput.value.trim()
      if (e.key === 'Enter') {
        // bluring makes it call the event for bluring
        that._topBarStatusInput.blur()
      }
    })

    this._topBarStatusInput.addEventListener('focusout', function(e){
      let content = that._topBarStatusInput.value.trim()
      console.log('Calling event for changing status: ' + content)
      that._callbacks.statusChanged(content)
      that._topBarStatusInput.blur()
    })

    this._topBarDisplaynameInput.addEventListener('keyup', function(e){
      let content = that._topBarDisplaynameInput.value.trim()
      if (e.key === 'Enter') {
        // bluring makes it call the event for bluring
        that._topBarDisplaynameInput.blur()
      }
    })

    this._topBarDisplaynameInput.addEventListener('focusout', function(e){
      let content = that._topBarDisplaynameInput.value.trim()
      console.log('Calling event for changing dispname: ' + content)
      that._callbacks.displaynameChanged(content)
      that._topBarDisplaynameInput.blur()
    })


    that._splashUserIdInput.addEventListener('keyup', function(e){
      if(e.key === 'Enter'){
        that._splashStartButton.click()
      }
    })

    that._splashDisplayNameInput.addEventListener('keyup', function(e){
      console.log(e);
      if(e.key === 'Enter'){
        that._splashStartButton.click()
      }
    })

    this._splashStartButton.addEventListener('click', function(e){
      let userId = that._splashUserIdInput.value.trim()
      let displayName = that._splashDisplayNameInput.value.trim()

      if(userId !== '' && displayName !== ''){
        that._callbacks.splashStart(
          userId,
          displayName
        )
      }
    })

  }



  on(eventName, cb) {
    if (typeof cb !== 'function') {
      console.warn('Callback must be of type function.')
      return
    }

    if (!(eventName in this._callbacks)) {
      console.warn('No event of such name')
      return
    }

    this._callbacks[eventName] = cb
  }


  hideSplashScreen() {
    this._splashScreen.classList.add('hidden')
  }
}

module.exports = UserInfoView
