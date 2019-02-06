var keys = [{
	key: '1',
	values: ['.', ',', '!', '1']
}, {
	key: '2',
	values: ['a', 'b', 'c', '2']
}, {
	key: '3',
	values: ['d', 'e', 'f', '3']
}, {
	key: '4',
	values: ['g', 'h', 'i', '4']
}, {
	key: '5',
	values: ['j', 'k', 'l', '5']
}, {
	key: '6',
	values: ['m', 'n', 'o', '6']
}, {
	key: '7',
	values: ['p', 'q', 'r', 's', '7']
}, {
	key: '8',
	values: ['t', 'u', 'v', '8']
}, {
	key: '9',
	values: ['w', 'x', 'y', 'z', '9']
}, {
	key: '*',
	values: []
}, {
	key: '0',
	values: []
}, {
	key: '#',
	values: []
}];

var phone = document.getElementById('phone');

var tableRow, button;
for(var i = 0; i < keys.length; i++) {
	if(i % 3 === 0) {
		tableRow = document.createElement('tr');
	}
	tableRow.innerHTML += keys[i].values.length === 0 ?
		`<td>
  	<button data-value="${keys[i].key}" class='key'>${keys[i].key}</button>
	</td>` :
		`<td>
		<button data-value="${keys[i].key}" class='key'>${keys[i].key}
			<span>${Array.prototype.reduce.call(keys[i].values.slice(0, keys[i].values.length - 1), (a, b) => a + ' ' + b)}</span>
		</button>
	</td>`;

	phone.appendChild(tableRow);
}

buttons = Array.from(document.getElementsByClassName('key'));

buttons.forEach((button, idx) => {
	var buttonListener = phoneKeyPressed.bind(button, keys[idx]);
	button.addEventListener('click', buttonListener);
});

var prevKey;
var result = document.getElementById(`result`);
result.value = '';

function phoneKeyPressed(key, event) {
	var value;
	if(key.values.length === 0) {
		result.value = result.value.concat(key.key);
		return;
	}
	if(!prevKey) {
		prevKey = new Object(key);
		prevKey.time = new Date().getTime();
		value = key.values[0];
		result.value = result.value.concat(value);
	} else if(prevKey.key === key.key) {
		var time = new Date().getTime();
		if(time - prevKey.time < 1000) {
			var currentIndex = key.values.indexOf(result.value.slice(result.value.length - 1, result.value.length));
			result.value = result.value.slice(0, result.value.length - 1) + key.values[(currentIndex + 1) % key.values.length];
		} else {
			value = key.values[0];
			result.value = result.value.concat(value);
		}
		prevKey.time = time;
	} else {
		prevKey = new Object(key);
		prevKey.time = new Date().getTime();
		value = key.values[0];
		result.value = result.value.concat(value);
	}
}
