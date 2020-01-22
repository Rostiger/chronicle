// Transforms

String.prototype.toTitleCase = function () { return this.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ') }
String.prototype.toUrl = function () { return this.toLowerCase().replace(/ /g, '+').replace(/[^0-9a-z\(\)\+\:\-\.\/\~]/gi, '').trim() }
String.prototype.toEntities = function () { return this.replace(/[\u00A0-\u9999<>\&]/gim, function (i) { return `&#${i.charCodeAt(0)}` }) }
String.prototype.toAlpha = function () { return this.replace(/[^a-z ]/gi, '').trim() }
String.prototype.toAlphanum = function () { return this.replace(/[^0-9a-z ]/gi, '') }
String.prototype.isAlphanum = function () { return !!this.match(/^[A-Za-z0-9 ]+$/) }
String.prototype.toLink = function (name, cl) { return this.indexOf('(') === 0 ? this.toReplLink(name, cl) : this.indexOf('//') > -1 ? this.toExternalLink(name, cl) : this.toLocalLink(name, cl) }
String.prototype.toLocalLink = function (name, cl = '') { return `<a href='#${this.toUrl()}' data-goto='${this.toUrl()}' target='_self' class='local ${cl}'>${name || this}</a>` }
String.prototype.toExternalLink = function (name, cl = '') { return `<a href='${this}' target='_blank' rel='noreferrer' class='external ${cl}'>${name || this}</a>` }
String.prototype.toReplLink = function (name, cl = '') { return `<a href='#${this}' data-goto='${this}' class='repl ${cl}'>${name || this}</a>` }
String.prototype.stripHTML = function () { return this.replace(/<(?:.|\n)*?>/gm, '') }
String.prototype.replaceAll = function (search, replacement) { return `${this}`.split(search).join(replacement) }
String.prototype.isUrl = function () { return this.substr(0, 4) === 'http' }
String.prototype.insert = function (s, i) { return [this.slice(0, i), s, this.slice(i)].join('') }
String.prototype.toPath = function () { return this.toLowerCase().replace(/ /g, '.').replace(/[^0-9a-z\.]/gi, '').trim() }

const convertDateToDB = function(date) {
	const zero = "0"
	const yy = date.getFullYear().toString().slice(2,4)
	let mm = date.getMonth() + 1
	mm = mm < 10 ? zero.concat(mm.toString()) : mm.toString()
	let dd = date.getDate()
	dd = dd < 10 ? zero.concat(dd.toString()) : dd.toString()
	return yy.concat(mm).concat(dd)
}

const toTimeStamp = function(date, time = '0000') {
	const year = parseInt("20" + date.slice(0,2))
	const month = parseInt(date.slice(2,4),10) - 1
	const day = parseInt(date.slice(4,6),10)
	const hour = parseInt(time.slice(0,2),10)
	const minute = parseInt(time.slice(2,4),10)
	const d = new Date(year,month,day,hour,minute)
	return d
}

	const prettyDate = function(timeStamp, long = false) {
		const d = new Date(timeStamp)
		const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
		const day = d.getDate()
		const month = long ? months[d.getMonth()] : months[d.getMonth()].slice(0,3).concat('.')
		const year = d.getFullYear()
		const date = `${day}. ${month} ${year}`
	  return date
	}

const getToday = function() {
	const today = new Date()
	return convertDateToDB(today)
}

const longestString = function(strings) {
	let longest = strings[0].toString().length
	for (const id in strings) {
		const length = strings[id].toString().length
		if (length > longest) longest = length
	}
	return longest
}

const fillWithChar = function(oldLength, newLength, char) {
	let chars = ""
	while (oldLength < newLength) {
		chars += char
		oldLength++
	}
	return chars
}

const leadingZero = function(number, zeros = 1) {
	const one = "1"
	let leading = ""
	let counter = 0
	while (counter < zeros) {
		leading = leading.concat("0")
		counter++
	}
	return number < parseInt(one.concat(leading)) ? leading.concat(number.toString()) : number.toString()
}

const getDuration = function(start, end) {
	const staHrs = leadingZero(start.getHours())
	const staMin = leadingZero(start.getMinutes())
	const endHrs = leadingZero(end.getHours())
	const endMin = leadingZero(end.getMinutes())
	// console.info(`Start: ${convertDateToDB(start)} ${staHrs}:${staMin} - End: ${convertDateToDB(end)} ${endHrs}:${endMin} - Duration: ${(end - start)/1000/60/60}`)
	return (end - start)/1000/60/60
}
