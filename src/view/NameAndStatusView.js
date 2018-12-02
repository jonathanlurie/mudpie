

class NameAndStatusView {
  constructor() {
    this._topBarDisplaynameInput = document.getElementById('displayname-input')
    this._topBarStatusInput = document.getElementById('status-input')

    this._callbacks = {
      displaynameChanged: function(){},
      statusChanged: function(){}
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
}

module.exports = NameAndStatusView
