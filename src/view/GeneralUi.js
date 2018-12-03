const { shell } = require('electron')

class GeneralUi {


  static init() {
    document.getElementById('git-splash-logo').addEventListener('mousedown', function(e){
      shell.openExternal('https://github.com/jonathanlurie/mudpie')
    })
  }
}


module.exports = GeneralUi
