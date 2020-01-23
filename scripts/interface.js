'use strict'
const monthHeight = 10

function Interface () {
  this.chronicle = document.createElement('div')
  this.chronicle.id = 'chronicle'

  const header = document.createElement('header')
  header.innerHTML = `<h1>Chronicle</h1>`
  this.chronicle.appendChild(header)

  const timeline = document.createElement('section')
  timeline.id = 'timeline'
  this.chronicle.appendChild(timeline)

  const timelineContainer = document.createElement('figure')
  timelineContainer.id = 'timelineContainer'
  timeline.appendChild(timelineContainer)
  
  this.databox = new Databox()

  this.install = function (host) {
    host.appendChild(this.chronicle)
    this.databox.install(timeline)
  }

  this.start = function () {
    this.databox.start()
    this.update()
  }

  this.update = function () {
    const time = performance.now()
    this.timeline()
    console.info(`Chronicle built interface in ${(performance.now() - time).toFixed(2)}ms.`)
  }

  this.timeline = function () {    
    const years = database.stats.years
    const fullHeight = years * 12 * monthHeight

    const yearsContainer = document.createElement('figure')
    yearsContainer.id = 'years'
    yearsContainer.style = `height:${fullHeight}px;`
    yearsContainer.innerHTML = `<div class="lastLabel">${database.stats.timelineStart.year}</div>`
    timelineContainer.appendChild(yearsContainer)

    // MONTH SEGMENTS
    let months = ''
    for (let m = 0; m < 12; m++) {
      // years container
      let y = m * monthHeight
      months += `<div class="segment" style="top: ${y}px;"></div>`
    }

    // YEARS
    const segments = document.createElement('div')
    segments.id = 'segments'

    for (let i = 0; i < years; i++) {
      const year = new Date().getFullYear() - i
      const showLabel = i == 0 || i == years || Number.isInteger(year * 0.1) ? true : false
      const label =  showLabel ? year : year.toString().substr(2)
      const width = showLabel ? 100 : 60
      const height = fullHeight / years
      const css = `width: ${width}%; height: ${height}px;`
      yearsContainer.innerHTML += `<div class="label" style="${css}">${label}${months}</div>`
      
      // LANE SEGMENTS
      if (i > 0) {
        const y = i * 12 * monthHeight
        segments.innerHTML += `<hr style="top: ${y}px;"/>`
      }
    }

    // LANES
    for (const c in database.settings.CATEGORIES) {
      const container = document.createElement('figure')
      container.id = c
      container.className = 'cat'
      container.style = `height: ${fullHeight}px;`

      // add lane segments
      const segs = document.createElement('div')
      segs.id = 'segments'
      segs.innerHTML = segments.innerHTML
      container.appendChild(segs)      
      timelineContainer.appendChild(container)

      // add items
      const cat = database.settings.CATEGORIES[c]
      const items = cat.entries
      for (const i in items) {
        const item = items[i]
        const h = item.duration === 0 ? monthHeight : item.duration * monthHeight
        const date = new Date(item.from.year, item.from.month)
        const y = Math.round((new Date() - date)/3600000/24/365 * 12 * monthHeight) - h
        const css = `height: ${h - 4}px; top: ${y + 4}px; background-color:${cat.COLOR};`
        const el = document.createElement('div')
        el.className = 'item'
        el.style = css
        el.title = item.description
        container.appendChild(el)

      }
      container.addEventListener("mouseover", function( event ) {
        const e = event.target
        if (e.className === 'item') e.style.background = 'white'
      })

      container.addEventListener("mouseout", function( event ) {
        const e = event.target
        if (e.className === 'item') e.style.background = cat.COLOR
      })  

      // add footer
      const firstEntry = new Date (database.stats.firstEntry.year, database.stats.firstEntry.month)
      const timelineStart = new Date (database.stats.timelineStart.year, database.stats.timelineStart.month)
      const h = Math.round((firstEntry - timelineStart)/3600000/24/365 * 12 * monthHeight) - monthHeight
      const y = fullHeight - h
      const css = `height: ${h}px; top: ${y}px; background-color: var(--b_med);`
      container.innerHTML += `<div class="item" style="${css}"></div>`      
    }
  }
}