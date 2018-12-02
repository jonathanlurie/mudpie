// You can also require other files to run in this process
const ThreadListButtons = require('./view/ThreadListButtons.js')
const AddHubButton = require('./view/AddHubButton')
const ThreadView = require('./view/ThreadView')
const ThreadViewCollection = require('./view/ThreadViewCollection')
const Config = require('./core/Config')
const NameAndStatusView = require('./view/NameAndStatusView')

console.log(Config)

let nameAndStatusView = new NameAndStatusView()
console.log(nameAndStatusView)

let userListButtons = new ThreadListButtons('user-list')
let hubListButtons = new ThreadListButtons('hub-list')

userListButtons.addThread('jonathan.lurie', 'Jo', new Date());
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


let addHubButton = new AddHubButton(hubListButtons)

let threadViewCollectionHubs = new ThreadViewCollection()
let threadViewCollectionUsers = new ThreadViewCollection()

let testThreadView = threadViewCollectionUsers.addNewThreadView('test.thread')
console.log(testThreadView);
