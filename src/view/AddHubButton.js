class AddHubButton {

  constructor (hubListButton) {
    let that = this
    this._hubAddInput = document.getElementById('add-hub-input')
    this._addHubButton = document.getElementById('add-hub-button')

    this._hubListButton = hubListButton

    this._hubAddInput.addEventListener('keyup', function(e) {
      let hubNameProposal = that._hubAddInput.value

      if(that._hubListButton.doesExist(hubNameProposal)) {
        that._hubAddInput.classList.remove('green-text')
        that._hubAddInput.classList.add('red-text')
      } else {
        that._hubAddInput.classList.add('green-text')
        that._hubAddInput.classList.remove('red-text')
      }

      // if (e.key === 'Enter') {
      //
      // } else {
      //
      // }
    })
  }
}

module.exports = AddHubButton
