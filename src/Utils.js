import { alphabets, NUM_FILLER_LETTERS, SET_SIZE } from "./Constants";
import { greWords } from "./Words";

export function getRandomGreWord(wordSet) {
	const len = wordSet.length;
	const randomIndex = Math.floor(Math.random() * len);
	return wordSet[randomIndex];
}

export function getFillerLetters(count = NUM_FILLER_LETTERS) {
	const letters = [];
	for (let i = 0; i < count; i += 1) {
		letters.push(alphabets[Math.floor(Math.random() * 26)]);
	}
	return letters;
}

export function shuffleArray(array) {
	const copy = [...array];
	for (let i = copy.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = copy[i];
		copy[i] = copy[j];
		copy[j] = temp;
	}

	return copy;
}

export function trimLabel(value) {
	return String(value ?? "").replace(/\s+/g, " ").trim();
}

export function normalizeWordForScramble(value) {
	return trimLabel(value).replace(/[^a-z]/gi, "").toLowerCase();
}

export function createLetterTiles(answerKey, fillerCount = NUM_FILLER_LETTERS) {
	const letters = shuffleArray([
		...answerKey.split(""),
		...getFillerLetters(fillerCount),
	]);

	return letters.map((letter, index) => ({
		id: `${answerKey}-${index}-${letter}`,
		letter,
		used: false,
	}));
}

export function buildWordSets(words = greWords, setSize = SET_SIZE) {
	return words.reduce((sets, word, index) => {
		const setIndex = Math.floor(index / setSize);
		if (!sets[setIndex]) {
			sets[setIndex] = {
				id: setIndex + 1,
				label: `Set ${String(setIndex + 1).padStart(2, "0")}`,
				words: [],
			};
		}
		sets[setIndex].words.push({
			...word,
			word: trimLabel(word.word),
			meaning: trimLabel(word.meaning),
		});
		return sets;
	}, []);
}

export function createScrambleRounds(wordSet) {
	return shuffleArray(
		wordSet
			.map((entry, index) => ({
				id: `${index}-${trimLabel(entry.word)}`,
				word: trimLabel(entry.word),
				meaning: trimLabel(entry.meaning),
				answerKey: normalizeWordForScramble(entry.word),
			}))
			.filter((entry) => entry.answerKey.length >= 3)
	);
}

export function getSetPreview(wordSet) {
	return wordSet
		.slice(0, 3)
		.map((entry) => trimLabel(entry.word))
		.join(" • ");
}

export function getInitialAnswerSlots(answerKey) {
	return Array.from({ length: answerKey.length }, () => null);
}

export function isSolved(answerSlots, answerKey) {
	return answerSlots
		.map((slot) => slot?.letter ?? "")
		.join("")
		.toLowerCase() === answerKey.toLowerCase();
}
