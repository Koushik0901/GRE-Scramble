import { greWords } from "./Words";
import { alphabets } from "./Constants";

export function getRandomGreWord(setId) {
	const max = setId * 30;
	const min = max - 30;
	const randomIndex = Math.floor(Math.random() * (max - min) + min);
	return greWords[randomIndex];
}

export function getFillerLetters(NUM_FILLER_LETTERS) {
	const letters = [];
	for (let i = 0; i < NUM_FILLER_LETTERS; i++) {
		letters.push(alphabets[Math.floor(Math.random() * 26)]);
	}
	return letters;
}

export function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		// Generate random number
		var j = Math.floor(Math.random() * (i + 1));

		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}

	return array;
}
