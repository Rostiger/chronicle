'use strict'
function Databox () {
	this.databox = document.createElement('div')
	this.databox.id = 'databox'

	this.scrubber = document.createElement('div')
	this.scrubber.id = 'scrubber'
	
	this.data = document.createElement('div')
	this.data.id = 'data'

	this.databox.appendChild(this.scrubber)
	this.databox.appendChild(this.data)
  
  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC',]
  const today = new Date()
	
	this.install = function (host) {
		host.appendChild(this.databox)
	}

	this.start = function () {
		this.update()
	}
	
	this.update = function () {
    const years = database.stats.years
    const fullHeight = years * 12 * monthHeight
    const monthsTotal = Math.round(window.scrollY / monthHeight)
    const date = new Date(today.getFullYear(), today.getMonth() - monthsTotal)
    const year = date.getFullYear()
    const month = date.getMonth()
    const m = month < 9 ? `0${month + 1}` : month + 1
    this.databox.style = window.scrollY < fullHeight - 12 * monthHeight ? `opacity : 1;` : `opacity: 0;`
    this.data.innerHTML = `<h1>${year}-${m}</h1>`
    
    // check years database for entries
    if (database.years[year]) {
	    const months = database.years[year][month]
	    if (months) {
	    	for (const c in database.settings.CATEGORIES) {
	    		const category = months[c]
	    		const color = database.settings.CATEGORIES[c].COLOR
	    		this.data.innerHTML += `<h2 style="color:${color}">${database.settings.CATEGORIES[c].NAME}</h2>`
					this.data.innerHTML += category ? `<p>${category.description.toUpperCase()}</p>` : '<p>---</p>'
	    	}
	    }
	  }
	}
  window.addEventListener('scroll', function(e) {
    chronicle.interface.databox.update()
  })
}