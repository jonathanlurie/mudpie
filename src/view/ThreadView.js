

class ThreadView {
  constructor (threadId, welcomeMessage='Here starts the conversation...') {
    this._threadId = threadId
    this._threadHost = document.getElementById('thread-host')
    this._identifiedThread = document.createElement('div')
    let welcomeMessageDiv = document.createElement('div')
    welcomeMessageDiv.innerHTML = welcomeMessage
    welcomeMessageDiv.classList.add('thread-welcome-message')
    this._identifiedThread.appendChild(welcomeMessageDiv)
  }


  /**
   * Delete all the content of the thread
   */
  flush() {
    this._flushSomeDiv(this._identifiedThread)
  }


  /**
   * @private
   * remove all the children of a given div
   */
  _flushSomeDiv(divObj) {
    while (divObj.firstChild) {
      divObj.removeChild(divObj.firstChild)
    }
  }

  /**
   * Make this thread visible
   */
  display() {
    this._flushSomeDiv(this._threadHost)
    this._threadHost.appendChild(this._identifiedThread)
    this._scrollBottom()
  }


  /**
   * @private
   * scroll all the way to the bottom (to show newer messages)
   */
  _scrollBottom() {
    this._threadHost.scrollTop = this._threadHost.scrollHeight
  }


  /**
   * Add a message to the thread that come from the local user
   */
  addMessageFromMe(messageStr, date) {
    let msgDiv = document.createElement('div')
    msgDiv.classList.add('message')
    msgDiv.classList.add('from-me')
    msgDiv.title = date
    msgDiv.innerHTML = messageStr
    this._identifiedThread.appendChild(msgDiv)
    this._scrollBottom()
  }


  /**
   * Add a message to the thread that comes from another user
   */
  addMessageFromOther(messageStr, date, userId, userDisplayName) {
    let msgDiv = document.createElement('div')
    msgDiv.classList.add('message')
    msgDiv.classList.add('from-other')
    msgDiv.title = date

    let msgInfoDiv = document.createElement('div')
    msgInfoDiv.innerHTML = 'from ' + userDisplayName
    msgInfoDiv.classList.add('message-info')
    msgDiv.appendChild(msgInfoDiv)
    msgDiv.innerHTML += messageStr
    this._identifiedThread.appendChild(msgDiv)
    this._scrollBottom()
  }
}


module.exports = ThreadView
