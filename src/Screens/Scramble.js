import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Pressable,
	Alert,
	TouchableOpacity,
	DevSettings,
} from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { colors, CLEAR, numFillerLetters } from "../Constants";
import { getRandomGreWord, getFillerLetters, shuffleArray } from "../Utils";

let wordMeaningPair = getRandomGreWord(1);
let word = wordMeaningPair.word;
let meaning = wordMeaningPair.meaning;
let letters = word.split("");
let scrambledLetters = shuffleArray(
	letters.concat(getFillerLetters(numFillerLetters))
);

export default function Scramble({ route, navigation }) {
	const { setId } = route.params;

	useEffect(() => {
		const { setId } = route.params;
		const refresh = navigation.addListener("focus", () => {
			refreshWords(setId);
		});
		return refresh;
	}, [navigation, route]);

	let initialAnswerState = new Array(word.length).fill("");

	const [row, setRow] = useState(scrambledLetters);
	const [textOnAnswer, setTextOnAnswer] = useState(initialAnswerState);
	const [curCellPos, setCurCellPos] = useState(0);
	const [gameState, setGameState] = useState("playing");
	const [key, setKey] = useState(0);
	const [score, setScore] = useState(0);

	useEffect(() => {
		if (curCellPos > 0) {
			checkGameState();
		}
	}, [curCellPos]);

	const checkIfWon = () => {
		return textOnAnswer.every(
			(letter, i) => letter.toLowerCase() === letters[i].toLowerCase()
		);
	};

	const checkIfLost = () => {
		return !checkIfWon() && curCellPos === textOnAnswer.length;
	};

	const checkGameState = () => {
		if (checkIfWon() && gameState !== "won") {
			Alert.alert("Hurray", "You won!", [
				{ text: "Next", onPress: refreshWords(setId) },
			]);
			setGameState("won");
			setScore(score + 1);
		} else if (checkIfLost() && gameState !== "lost") {
			Alert.alert("Meh", "Incorrect, try again!", [
				{ text: "Next", onPress: refreshWords(setId) },
			]);
		}
	};
	const refreshWords = (setId) => {
		wordMeaningPair = getRandomGreWord(setId);
		word = wordMeaningPair.word;
		meaning = wordMeaningPair.meaning;
		letters = word.split("");
		scrambledLetters = shuffleArray(
			letters.concat(getFillerLetters(numFillerLetters))
		);
		initialAnswerState = new Array(word.length).fill("");
		setRow(scrambledLetters);
		setGameState("playing");
		setTextOnAnswer(initialAnswerState);
		setCurCellPos(0);
		setKey((prevKey) => prevKey + 1);
	};

	function revealAnswer() {
		Alert.alert(word, meaning, [
			{ text: "Next", onPress: refreshWords(setId) },
		]);
	}

	const onKeyPressed = (key) => {
		const updatedRow = [...textOnAnswer];

		if (key === CLEAR) {
			const prevPos = curCellPos - 1;
			if (prevPos >= 0) {
				updatedRow[prevPos] = "";
				setTextOnAnswer(updatedRow);
				setCurCellPos(prevPos);
			}
			return;
		} else if (curCellPos < textOnAnswer.length) {
			updatedRow[curCellPos] = key;
			setTextOnAnswer(updatedRow);
			setCurCellPos(curCellPos + 1);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="dark" />
			<View style={styles.timerContainer}>
				<Text style={styles.score}>Score: {score}</Text>
				<CountdownCircleTimer
					key={key}
					isPlaying
					duration={30}
					colors={[colors.primary, "#F7B801", "#A30000", "#A30000"]}
					colorsTime={[30, 20, 10, 0]}
					size={80}
				>
					{({ remainingTime }) => <Text>{remainingTime}</Text>}
				</CountdownCircleTimer>
			</View>
			<View style={styles.cellContainer}>
				<Text style={styles.question}>can you guess the word?</Text>
				<View style={styles.row}>
					{textOnAnswer.map((letter, index) => (
						<Pressable
							style={[
								{
									borderColor: "black",
									borderWidth: 3,
									shadowColor: "#171717",
									shadowOffset: { width: -2, height: 4 },
									shadowOpacity: 0.2,
									shadowRadius: 3,
									elevation: 5,
								},
								styles.cell,
							]}
							key={index}
						>
							<Text style={styles.cellText}>
								{letter.toUpperCase()}
							</Text>
						</Pressable>
					))}
				</View>
			</View>
			<View style={styles.meaningContainer}>
				<Text style={styles.meaning}>Definition: {meaning}</Text>
			</View>
			<View style={[styles.cellContainer, { marginBottom: 20 }]}>
				<View style={styles.row}>
					{row.map((letter, index) => (
						<Pressable
							onPress={() => {
								onKeyPressed(letter);
							}}
							style={[
								styles.cell,
								{
									width: 55,
									height: 55,
									maxWidth: 55,
									maxHeight: 55,
								},
							]}
							key={index}
							hitSlop={2}
						>
							<Text style={styles.cellText}>
								{letter.toUpperCase()}
							</Text>
						</Pressable>
					))}
				</View>
			</View>
			<View style={styles.buttonsContainer}>
				<TouchableOpacity
					style={styles.buttons}
					onPress={() => {
						onKeyPressed(CLEAR);
					}}
				>
					<Text style={styles.buttonText}>{CLEAR}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.buttons}
					onPress={() => {
						revealAnswer();
					}}
				>
					<Text style={styles.buttonText}>REVEAL</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
		backgroundColor: colors.background,
	},
	titleText: {
		fontSize: 26,
		fontWeight: "bold",
	},
	score: {
		fontSize: 20,
	},
	timerContainer: {
		flex: 0.6,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		paddingTop: 10,
		paddingBottom: 10,
	},
	cellContainer: {
		flex: 1,
		width: "90%",
	},
	row: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		alignSelf: "center",
		justifyContent: "center",
	},
	cell: {
		width: 45,
		height: 45,
		borderRadius: 6,
		marginTop: 6,
		marginBottom: 6,
		marginLeft: 6,
		marginRight: 6,
		maxWidth: 45,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		shadowColor: "#171717",
		shadowOffset: { width: -2, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
		elevation: 5,
	},
	cellText: {
		color: "black",
		fontSize: 26,
		fontWeight: "bold",
	},
	question: {
		fontSize: 20,
		color: "black",
		alignSelf: "center",
		marginTop: 5,
		marginBottom: 10,
		fontWeight: "bold",
	},
	meaningContainer: {
		flex: 0.5,
		justifyContent: "center",
		alignItems: "center",
		width: "90%",
	},
	meaning: {
		fontSize: 18,
		color: "black",
		fontWeight: "bold",
	},
	buttonsContainer: {
		flex: 0.5,
		flexDirection: "row",
		justifyContent: "space-evenly",
		width: "90%",
		alignItems: "flex-end",
		marginBottom: 10,
	},
	buttons: {
		width: "35%",
		height: 45,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 25,
		borderWidth: 2,
		borderColor: colors.primary,
		marginRight: 20,
		marginLeft: 20,
		backgroundColor: colors.primary,
	},
	buttonText: {
		fontWeight: "bold",
		fontSize: 16,
		color: "white",
	},
});
