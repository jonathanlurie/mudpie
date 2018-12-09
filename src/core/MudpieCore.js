const Udpcom = require('udpcom')
const ThreadListButtons = require('../view/ThreadListButtons.js')
const AddHubButton = require('../view/AddHubButton')
const ThreadView = require('../view/ThreadView')
const ThreadViewCollection = require('../view/ThreadViewCollection')


class MudpieCore {

  cosntructor(userId, displayName) {
    udpcom = new Udpcom(userConfig.userId, userConfig.userDisplayName /*, options*/)

    // 0- init some objects
    let userInfoView = new UserInfoView()
    let userListButtons = new ThreadListButtons('user-list')
    let hubListButtons = new ThreadListButtons('hub-list')
    let addHubButton = new AddHubButton(hubListButtons)
    let threadViewCollectionHubs = new ThreadViewCollection()
    let threadViewCollectionUsers = new ThreadViewCollection()


  }
}


module.exports = MudpieCore
