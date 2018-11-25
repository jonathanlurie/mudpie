const userListDiv = document.getElementById('user-list')
let mousedownEvent = null
const RECENT_CONNECTION = 30 * 60 * 1000 // 30 minutes (in ms)

class UserList {

  /**
   * Delete all the children of the UserList
   */
  static flush () {
    while (userListDiv.firstChild) {
      userListDiv.removeChild(userListDiv.firstChild)
    }
  }


  /**
   * Add the button for a user
   */
  static addUser (userId, displayName, lastActiveDate, onTop=true) {
    let userDiv = document.createElement('div')
    userDiv.className = 'list-element'
    userDiv.innerHTML = displayName
    userDiv.title = userId
    userDiv.setAttribute("userid", userId)
    userDiv.setAttribute("lastactivedate", lastActiveDate)

    userDiv.addEventListener('mousedown', function(e){
      let userId = e.target.getAttribute('userid')
      UserList.setActive(userId)
      mousedownEvent(userId)
    })

    if (onTop) {
      userListDiv.insertBefore(userDiv, userListDiv.firstChild)
    } else {
      userListDiv.appendChild(userDiv)
    }
  }


  static getUserButton (userId) {
    let nodeList = userListDiv.querySelectorAll(`[userid="${userId}"]`)
    if (nodeList.length) {
      return nodeList[0]
    } else {
      return null
    }
  }

  static removeUserButton (userId) {
    let elem = UserList.getUserButton(userId)

    if (elem) {
      userListDiv.removeChild(elem)
    }
  }

  static onMousedown(cb) {
    mousedownEvent = cb;
  }


  /**
   * Sort the user elements from the most recently active to least
   */
  static sortByActivityDate (newestFirst=true) {
    let childrenCollection = userListDiv.children
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

    UserList.flush()

    for (let i=0; i<childrenArray.length; i++) {
      userListDiv.appendChild(childrenArray[i])
    }
  }


  /**
   * Adds a green patch if a contact was recently lastActiveDate.
   * Removes if it no longer is
   */
  static updateConnectionStatus () {
    let now = new Date()
    let thirtyMinAgo = new Date(now - RECENT_CONNECTION)

    // putting the children in an array (otherwise, they cannot be sorted)
    for (let i=0; i<userListDiv.children.length; i++) {
      let userButton = userListDiv.children[i]
      let lastActiveDate = new Date(userButton.getAttribute('lastactivedate'))

      // reset
      userButton.classList.remove('list-element-recently_connected')

      if (lastActiveDate > thirtyMinAgo) {
        userButton.classList.add('list-element-recently_connected')
      }
    }
  }

  static setActive (userId) {
    // set all to inactive
    for (let i=0; i<userListDiv.children.length; i++) {
      let userButton = userListDiv.children[i]
      userButton.classList.remove('active')
    }

    let theActiveUser = UserList.getUserButton(userId)

    if (theActiveUser) {
      theActiveUser.classList.add('active')
    }
  }
}

module.exports = UserList
