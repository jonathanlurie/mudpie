// You can also require other files to run in this process
const ThreadListButtons = require('./view/ThreadListButtons.js')
const AddHubButton = require('./view/AddHubButton')

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
