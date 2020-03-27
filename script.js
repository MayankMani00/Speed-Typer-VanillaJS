const word = $('#word');
const text = $('#text');
const scoreElement = $('#score');
const timeElement = $('#time');
const endgameElement = $('#endgame-container');
const settings = $('#settings');
const settingsBtn = $('#settings-btn');
const settingsForm = $('#settings-form');
const selectedDifficulty = $('#difficulty');

//List of words

const words = [
	'sigh',
	'tense',
	'airplane',
	'ball',
	'pies',
	'juice',
	'warlike',
	'bad',
	'north',
	'dependent',
	'steer',
	'silver',
	'highfalutin',
	'superficial',
	'quince',
	'eight',
	'feeble',
	'admit',
	'drag',
	'loving'
];

const points = {
	easy   : 4,
	medium : 3,
	hard   : 2
};

let randomWord,
	score = 0,
	time = 9;

let difficulty =
	localStorage.getItem('difficulty') !== null
		? localStorage.getItem('difficulty')
		: 'medium';

selectedDifficulty[0].value = difficulty;

function getRandomWord() {
	randomWord = words[Math.floor(Math.random() * words.length)];
	word[0].innerText = randomWord;
}

//Checks the entereed word
function checkWord() {
	if (text[0].value === randomWord) {
		time += points[difficulty];
		text[0].value = '';
		scoreElement[0].innerText = ++score;
		getRandomWord();
	}
}

//Updates time and checks if it reaches 0
function updateTime() {
	if (time >= 0) timeElement[0].innerText = time-- + 's';
	else {
		timeElement[0].value = 0;
		clearInterval(refreshID);
		showEndScreen();
	}
}

function showEndScreen() {
	endgameElement[0].innerHTML = `<h1>Your final score is ${score}</h1>
                                    <button onclick="location.reload()">Reload</button>`;
	endgameElement[0].style.display = 'flex';
}

//EVENT LISTENERS

//Shows settings
settingsBtn.click(() => {
	settings[0].classList.toggle('show');
});

//Gets selected setting and updates local storage
$(selectedDifficulty).change((e) => {
	selectedDifficulty = e.target.value;
	localStorage.setItem('difficulty', selectedDifficulty);
});

var refreshID = setInterval(updateTime, 1000);

text[0].addEventListener('input', checkWord);

getRandomWord();
