'use strict'

function Chronicle () {
  this.database = new Database()
  this.interface = new Interface()

  this.install = function (host) {
    this.database.install()
    this.interface.install(host)
  }

  this.start = function () {
    this.database.start()
    this.interface.start()
  }

  this.install(document.body)
  window.addEventListener('load', () => { this.start(); })  
}

