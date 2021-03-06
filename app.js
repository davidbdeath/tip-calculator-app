const buttons = [...document.querySelectorAll('button')];
const inputs = [...document.querySelectorAll('input')];
const zero = document.querySelector('#zero');

// text inputs
const billAmount = document.getElementById('bill-amount');
const customTip = document.getElementById('custom-tip');
const numberOfPeople = document.getElementById('number-of-people');

// text outputs
const tipAmount = document.getElementById('tip-amount');
const total = document.getElementById('total');

// buffer object
const calcB = {
	bill: NaN,
	tipPercent: NaN,
	tipCalc: NaN,
	people: NaN
};
// currency format
const dollarUS = Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

// warns if the number of people is 0 or less
const invalidNumPeople = () => {
	let numberOfPeopleFloat = parseFloat(numberOfPeople.value);
	let numberOfPeopleInt = parseInt(numberOfPeople.value);
	if ((numberOfPeopleFloat != numberOfPeopleInt) && numberOfPeople.value != '') {
		zero.textContent = "No partial people"
		tipAmount.value = null;
		total.value = null;
	} else if (numberOfPeople.value < '1' && numberOfPeople.value != '') {
		zero.textContent = "Can't be zero";
	} else {
		zero.textContent = '';
	}
}

// listens for keyboard input and filters
const filterInputFieldText = () => {
	inputs.forEach((input) => {
		input.onkeydown = (event) => {
			const allowedKeyboardInput = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', 'Backspace', 'Delete', 'Clear', 'DEL', 'ArrowLeft', 'ArrowRight', 'Tab'];
			if (allowedKeyboardInput.includes(event.key)) {} else {
				event.preventDefault();
			}
		}
	})
}

// remove btn selected classs
const removeSelected = () => {
	buttons.forEach((btn) => {
		btn.classList.remove('btn-selected')
	});
}

// resets app
const reset = (btn) => {
	if (btn.textContent == 'RESET') {
		billAmount.value = null;
		customTip.value = null;
		numberOfPeople.value = null;
		tipAmount.value = null;
		total.value = null;
		Object.keys(calcB).forEach((key) => { calcB[key] = NaN });
		removeSelected();
	}
}

// sets custom tip amount and changes custom button color
const customTipHighlight = () => {
	if (customTip.value > 0) {
		customTip.style.backgroundColor = 'var(--tertiary-clr)';
	} else {
		customTip.style.backgroundColor = 'var(--senary-clr)'
	}
}

//display output functions
const tipAmountPer = () => {
	if ((numberOfPeople.value >= '1' && numberOfPeople.value != '') && calcB.tipPercent > 0 && calcB.bill > 0) {
		calcB.tipCalc = calcB.bill * calcB.tipPercent;
		tipAmount.value = dollarUS.format(calcB.tipCalc / calcB.people);
		tipAmount.size = tipAmount.value.toString().length;
	} else {
		tipAmount.value = null;
	}
}

const totalPer = () => {
	if ((numberOfPeople.value >= '1' && numberOfPeople.value != '') && calcB.tipPercent > 0 && calcB.bill > 0) {
		total.value = dollarUS.format((calcB.bill + calcB.tipCalc) / calcB.people);
		total.size = total.value.toString().length;
	} else {
		total.value = null;
	}
}

// sets the tip percentage and adds class button selected
const setTip = () => {
	buttons.forEach((btn) => {
		btn.addEventListener('click', () => {
			removeSelected();
			reset(btn)
			btn.classList.add('btn-selected');
			calcB.tipPercent = parseFloat(btn.textContent.slice(0, -1)) / 100;
			customTip.value = null;
			tipAmountPer();
			totalPer();
		})
	})
}


// event listener
const setCalcBuffer = (objElm, srcInput) => {
	srcInput.addEventListener('keyup', () => {
		if (objElm == 'tipPercent') {
			calcB[objElm] = srcInput.value / 100;
			removeSelected();
			customTipHighlight();
		} else {
			calcB[objElm] = parseFloat(srcInput.value);
		}
		tipAmountPer();
		totalPer();
		invalidNumPeople();
	})
}

filterInputFieldText();
setCalcBuffer('bill', billAmount);
setCalcBuffer('tipPercent', customTip);
setCalcBuffer('people', numberOfPeople);
setTip();