const ThreadView = require('./ThreadView')


/**
 * In the current model of Mudpie, there should be two instances of ThreadViewCollection,
 * one for the user-to-user with the theadId being the other userId, and one instance
 * for the hub, with the threadId being the name of the hub
 */
class ThreadViewCollection {
  constructor() {
    this._collection = {}
  }


  /**
   * Create a new thread view
   * @return {ThreadView}
   */
  addNewThreadView(threadId, welcomeMessage) {
    if (threadId in this._collection) {
      console.warn('The thread with id ' + threadId + ' already exists. Cannot recreate it.')
      return null
    }

    this._collection[threadId] = new ThreadView(threadId, welcomeMessage)
    return this._collection[threadId]
  }


  /**
   * Tells if a thread view with such ID exists
   */
  hasThreadView(threadId) {
    return (threadId in this._collection)
  }
  

  /**
   * Get a thread view of a givern id
   * @return {ThreadView}
   */
  getThreadView(threadId) {
    if (threadId in this._collection) {
      console.warn('The thread with id ' + threadId + ' does not exists.')
      return null
    }

    return this._collection[threadId]
  }
}

module.exports = ThreadViewCollection
