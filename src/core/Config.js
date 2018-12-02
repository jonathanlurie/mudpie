const os = require('os')
const path = require('path')
const fs = require('fs')
const jsonfile = require('jsonfile')


const CONFIG_FILE = path.join(os.homedir(), 'mudpie.json')
let configData = null


class Config {

  /**
   * Attempts to load the config file. Return the config as an object if file exists
   * Or returns null if file does not exist
   */
  static loadConfig() {
    if (fs.existsSync(CONFIG_FILE)) {
      configData = jsonfile.readFileSync(CONFIG_FILE)
      return configData
    } else {
      return null
    }
  }


  /**
   * Write the config object on disk
   */
  static writeConfig() {
    jsonfile.writeFileSync(CONFIG_FILE, configData)
  }


  /**
   * Get the config object, possibly null
   */
  static getConfig() {
    return configData
  }


  /**
   * Create a config object with default (blank) values
   */
  static createBlankConfig() {
    configData = {
      userId: '',
      userDisplayName: '',
    }
    return configData
  }

}


module.exports = Config
