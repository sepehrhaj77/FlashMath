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
		document.getElementById(`sub-${i + 1}`).innerText = array[i]
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
		document.getElementById(`mult-${i + 1}`).innerText = array[i]
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
		document.getElementById(`div-${i + 1}`).innerText = array[i]
		i++
	}
}
