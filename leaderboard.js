//add
var array = JSON.parse(localStorage.getItem('addition'))
if (array) {
	array.sort(function (a, b) {
		return b.score - a.score
	})
	localStorage.setItem('addition', JSON.stringify(array))
	var length = array.length

	var i = 0
	while (i < length) {
		document.getElementById(`add-${i + 1}`).innerText = '' + array[i].score + '\n' + array[i].date
		i++
	}
}

//sub
array = JSON.parse(localStorage.getItem('subtraction'))
if (array) {
	array.sort(function (a, b) {
		return b.score - a.score
	})
	localStorage.setItem('subtraction', JSON.stringify(array))
	length = array.length

	i = 0
	while (i < length) {
		document.getElementById(`sub-${i + 1}`).innerText = '' + array[i].score + '\n' + array[i].date
		i++
	}
}

//mult
array = JSON.parse(localStorage.getItem('multiplication'))
if (array) {
	array.sort(function (a, b) {
		return b.score - a.score
	})
	localStorage.setItem('multiplication', JSON.stringify(array))
	length = array.length

	i = 0
	while (i < length) {
		document.getElementById(`mult-${i + 1}`).innerText = '' + array[i].score + '\n' + array[i].date
		i++
	}
}

//div
array = JSON.parse(localStorage.getItem('division'))
if (array) {
	array.sort(function (a, b) {
		return b.score - a.score
	})
	localStorage.setItem('division', JSON.stringify(array))
	length = array.length

	i = 0
	while (i < length) {
		document.getElementById(`div-${i + 1}`).innerText = '' + array[i].score + '\n' + array[i].date
		i++
	}
}

function clearAdd() {
	array = JSON.parse(localStorage.getItem('addition'))
	if (array) {
		let newArray = array.slice(0, 1)
		localStorage.setItem('addition', JSON.stringify(newArray))
	}
	window.location.reload()
}

function clearSub() {
	array = JSON.parse(localStorage.getItem('subtraction'))
	if (array) {
		let newArray = array.slice(0, 1)
		localStorage.setItem('subtraction', JSON.stringify(newArray))
	}
	window.location.reload()
}

function clearMult() {
	array = JSON.parse(localStorage.getItem('multiplication'))
	if (array) {
		let newArray = array.slice(0, 1)
		localStorage.setItem('multiplication', JSON.stringify(newArray))
	}
	window.location.reload()
}

function clearDiv() {
	array = JSON.parse(localStorage.getItem('division'))
	if (array) {
		let newArray = array.slice(0, 1)
		localStorage.setItem('division', JSON.stringify(newArray))
	}
	window.location.reload()
}
