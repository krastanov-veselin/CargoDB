/**
 *  -- CargoDB.js --
 * Library providing simple storage access for electron
 * Licence MIT
 * Author: Paweł Karaś
*/

module.exports = (
  function(){
  // Modules required
  const fs = require('fs')

  // Create Base Folder Private Function
  function createBase(x) {
    let loc = x.dir + '/' + x.name

    if (!fs.existsSync(loc)) {
      fs.mkdir(loc, err => {
        if (err) throw 'CargoDB: ' + err
      })
    }
  }

  class CARGO {
    constructor(name, dir) {
      // Provide a storage name 'string'
      this.name = name || (function () {
        throw 'No storage name provided'
      })()
      // Provide storage's location (optional) 'string'
      this.dir = dir || __dirname
      // Create Base Folder Storage
      createBase(this)
    }

    /** Set Item Method
     * @param {storage} string
     * @param {item} string
     * @param {callback(error)} function
    */
    setItem (storage, item, callback) {
      let loc = this.dir + '/' + this.name + '/' + storage + '.json'
      let arg = false

      fs.writeFile(loc, item, err => {
        if (err) arg = 'CargoDB: ' + err
        callback(arg)
      })
    }

    /** Get Item Method
     * @param {storage} string
     * @param {callback(error,data)} function
    */
    getItem (storage, callback) {
        let loc = this.dir + '/' + this.name + '/' + storage + '.json'
        let arg = false

        fs.readFile(loc, 'utf-8', (err, item) => {
          if (err) arg = 'CargoDB: ' + err
          callback(arg,item)
        })
    }

  }
  return CARGO
})()