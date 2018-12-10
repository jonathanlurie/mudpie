const UserInfoView = require('./view/UserInfoView')
const MudpieCore = require('./core/MudpieCore')
const Config = require('./core/Config')
require('./view/GeneralUi').init()


// 0- necessary for splash scree
let userInfoView = new UserInfoView()

// 1- try to load an existing config
let userConfig = Config.loadConfig()

// 1.1- if we have a config file with user data, we don't show the splash screen
if(userConfig) {
  userInfoView.hideSplashScreen()
  console.log(333);
  mudpieCore = new MudpieCore(userConfig)
} else {
  userConfig = Config.createBlankConfig()
}

// 2. If splash screen active, we collect the userUniqueID and the display name
userInfoView.on('splashStart', function(userId, displayName){
  userConfig.userId = userId
  userConfig.userDisplayName = displayName

  // 2.1- write the config
  Config.writeConfig()

  // 2.2- run mudpie
  userInfoView.hideSplashScreen()
  mudpieCore = new MudpieCore(userConfig)

})



/*
userListButtons.addThread('jonathan.lurie', 'Jo', new Date())
userListButtons.onMousedown(function(threadId){
  console.log('User clicked: ' + threadId)

  // make it so that no hub button active:
  hubListButtons.noActive()
})





hubListButtons.addThread('The Hub', null, new Date());
hubListButtons.onMousedown(function(threadId){
  console.log('Hub clicked: ' + threadId)

  // make it so that no hub button active:
  userListButtons.noActive()
})




//let testThreadView = threadViewCollectionUsers.addNewThreadView('test.thread')
*/
