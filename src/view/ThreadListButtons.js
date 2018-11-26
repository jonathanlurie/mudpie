const RECENT_CONNECTION = 30 * 60 * 1000 // 30 minutes (in ms)



class ThreadListButtons {

  constructor (divId) {
    this._threadListButtonsDiv = document.getElementById(divId)
    this._mousedownEvent = null
  }

  /**
   * Delete all the children of the ThreadListButtons
   */
  flush () {
    while (this._threadListButtonsDiv.firstChild) {
      this._threadListButtonsDiv.removeChild(this._threadListButtonsDiv.firstChild)
    }
  }


  /**
   * Add the button for a thread
   */
  addThread (threadId, displayName, lastActiveDate, onTop=true) {
    let that = this;
    let threadDiv = document.createElement('div')
    threadDiv.className = 'list-element'
    threadDiv.innerHTML = displayName
    threadDiv.title = threadId
    threadDiv.setAttribute("threadId", threadId)
    threadDiv.setAttribute("lastactivedate", lastActiveDate)

    threadDiv.addEventListener('mousedown', function(e){
      let threadId = e.target.getAttribute('threadId')
      that.setActive(threadId)
      that._mousedownEvent(threadId)
    })

    if (onTop) {
      this._threadListButtonsDiv.insertBefore(threadDiv, this._threadListButtonsDiv.firstChild)
    } else {
      this._threadListButtonsDiv.appendChild(threadDiv)
    }
  }


  getThreadButton (threadId) {
    let nodeList = this._threadListButtonsDiv.querySelectorAll(`[threadId="${threadId}"]`)
    if (nodeList.length) {
      return nodeList[0]
    } else {
      return null
    }
  }

  removeThreadButton (threadId) {
    let elem = this.getThreadButton(threadId)

    if (elem) {
      this._threadListButtonsDiv.removeChild(elem)
    }
  }


  onMousedown(cb) {
    if (typeof cb === 'function') {
      this._mousedownEvent = cb;
    } else {
      console.warn('The callback must be of type function.')
    }
  }


  /**
   * Sort the thread elements from the most recently active to least
   */
  sortByActivityDate (newestFirst=true) {
    let childrenCollection = this._threadListButtonsDiv.children
    let childrenArray = []

    // putting the children in an array (otherwise, they cannot be sorted)
    for (let i=0; i<childrenCollection.length; i++) {
      childrenArray.push(childrenCollection[i])
    }

    // sort the children based on their last activity date (most recent first)
    childrenArray.sort(function(a, b){
      let dateA = new Date(a.getAttribute('lastactivedate'))
      let dateB = new Date(b.getAttribute('lastactivedate'))
      if (newestFirst) {
        return dateA < dateB
      } else {
        return dateA < dateB
      }
    })

    this.flush()

    for (let i=0; i<childrenArray.length; i++) {
      this._threadListButtonsDiv.appendChild(childrenArray[i])
    }
  }


  /**
   * Adds a green patch if a contact was recently lastActiveDate.
   * Removes if it no longer is
   */
  updateConnectionStatus () {
    let now = new Date()
    let thirtyMinAgo = new Date(now - RECENT_CONNECTION)

    // putting the children in an array (otherwise, they cannot be sorted)
    for (let i=0; i<this._threadListButtonsDiv.children.length; i++) {
      let threadButton = this._threadListButtonsDiv.children[i]
      let lastActiveDate = new Date(threadButton.getAttribute('lastactivedate'))

      // reset
      threadButton.classList.remove('list-element-recently_connected')

      if (lastActiveDate > thirtyMinAgo) {
        threadButton.classList.add('list-element-recently_connected')
      }
    }
  }

  setActive (threadId) {
    // set all to inactive
    for (let i=0; i<this._threadListButtonsDiv.children.length; i++) {
      let threadButton = this._threadListButtonsDiv.children[i]
      threadButton.classList.remove('active')
    }

    let theActiveThread = this.getThreadButton(threadId)

    if (theActiveThread) {
      theActiveThread.classList.add('active')
    }
  }
}

module.exports = ThreadListButtons
