const Udpcom = require('udpcom')
const Config = require('../core/Config')
const UserInfoView = require('../view/UserInfoView')
const ThreadListButtons = require('../view/ThreadListButtons.js')
const AddHubButton = require('../view/AddHubButton')
const ThreadView = require('../view/ThreadView')
const ThreadViewCollection = require('../view/ThreadViewCollection')


class MudpieCore {

  constructor(userConfig) {
    this._userConfig = userConfig
    this._udpcom = new Udpcom(userConfig.userId, userConfig.userDisplayName /*, options*/)

    // 0.0- get some udpcom opbjects
    this._phonebook = this._udpcom.getPhonebook()
    this._messageSender = this._udpcom.getMessageSender()
    this._messageReceiver = this._udpcom.getMessageReceiver()
    this._messageEventManager = this._udpcom.getMessageEventManager()

    // 0.1- init some objects
    this._userInfoView = new UserInfoView()
    this._userListButtons = new ThreadListButtons('user-list')
    this._hubListButtons = new ThreadListButtons('hub-list')
    this._addHubButton = new AddHubButton(this._hubListButtons)
    this._threadViewCollectionHubs = new ThreadViewCollection()
    this._threadViewCollectionUsers = new ThreadViewCollection()

    // 1- load the displayName into the UI
    this._userInfoView.updateDisplayName(userConfig.userDisplayName)

    this._defineEvents()
  }


  _defineEvents() {
    let that = this

    // when the display name is changed on the top bar
    this._userInfoView.on('displaynameChanged', function(newDisplayName){
      // update the config and save it
      that._userConfig.userDisplayName = newDisplayName
      Config.writeConfig()

      // update the phonebook
      that._phonebook.updateMyDisplayName(newDisplayName)
    })


    // when my personal data is updated, we tell everyone
    this._phonebook.on('myDataUploaded', function(contactEntry){
      // contactEntry is of type PhonebookEntry. They are my own
      that._messageSender.sendPingAllMessage()
    })

  }
}


module.exports = MudpieCore
