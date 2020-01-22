'use strict'

const redact = false;
const database = {
  years : {},
  entries : {},
  stats : {}
}
const months = { JAN : 0, FEB : 1, MAR : 2, APR : 3, MAY : 4, JUN : 5, JUL : 6, AUG : 7, SEP : 8, OCT : 9, NOV : 10, DEC : 11 }

function Database () {	
	this.install = function () {
	  database.entries = tablatal(DATABASE.chronicle)
    database.settings = indental(DATABASE.settings)
	}

  this.start = function () {
    const time = performance.now()
    // get first entry
    if (!database.stats.timelineStart) {
      const firstEntry = database.entries[database.entries.length - 1]
      const from = this.toDate(firstEntry.from)
      database.stats.firstEntry = from
      const start = { year : from.year - 6, month : 0 }
      database.stats.timelineStart = start
      const timeStamp = new Date(start.year, start.month)
      database.stats.years = new Date().getFullYear() - start.year
      database.stats.months = database.stats.years * 12
    }
    
    // add years
    this.addYears()
    
    // collect entries
    for (const e in database.entries) {
      const entry = database.entries[e]
      if (database.settings.CATEGORIES[entry.cat]) {
        // create the items array if it doesn't exist yet
        if (!database.settings.CATEGORIES[entry.cat].entries) database.settings.CATEGORIES[entry.cat].entries = []
        const item = entry
        // convert dates
        item.from = this.toDate(entry.from)
        if (entry.to.charAt(0) === "*") item.to = { year : new Date().getFullYear(), month: new Date().getMonth() }
        else item.to = isNaN(parseInt(entry.to.charAt(0))) ? item.from : this.toDate(entry.to)
        // calculate duration
        const from = new Date(item.from.year, item.from.month)
        const to = new Date(item.to.year, item.to.month)
        item.duration = Math.round((to - from) / (60 * 60 * 1000 * 24 * 365) * 12)
        // redact the item descriptions for showcasing
        if (redact) item.description = this.redact(item.description)
        // push to categories
        database.settings.CATEGORIES[entry.cat].entries.push(item)
        // push to years
        let year = item.from.year ? item.from.year : database.stats.timelineStart.year
        let month = item.from.month ? item.from.month : database.stats.timelineStart.month
        let dur = 0
        while (dur <= item.duration) {
          database.years[year][month][item.cat] = item
          if (month < 11 ) month++
          else { month = 0; year++ }
          dur++
        }

      } else console.warn(`Entry '${entry.desc}' doesn't match a category.`)
    }
    console.info(`Chronicle built database in ${(performance.now() - time).toFixed(2)}ms.`)
    console.log(database)
  }

  this.toDate = function (string) {
    let year = parseInt(string.slice(0,4))
    if (isNaN(year) || year < 1000) { 
      console.warn(`Entry ${string} has an invalid year.`)
      year = 1900
    }
    const m = string.slice(5)
    const month = m.length != 3 || m.charAt(0) == "-" ? 0 : months[string.slice(5)]
    return { year : year, month : month }
  }

  this.addYears = function () {
    for (let i = 0; i <= database.stats.years; i++) {
      database.years[database.stats.timelineStart.year + i] = {}
      for (let m = 0; m < 12; m++) database.years[database.stats.timelineStart.year + i][m] = []
    }
  }

  this.redact = function (string) {
    let c = 0
    let result = ''
    while (c < string.length) {
      let char = ' '
      if (string.charAt(c) === ',') char = ','
      else if (string.charAt(c) !== ' ') char = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 1)
      result += char
      c++
    }
    return result
  }
}