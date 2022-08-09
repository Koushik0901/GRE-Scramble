import React from "react";
import {
	SafeAreaView,
	TouchableOpacity,
	StyleSheet,
	Text,
	View,
} from "react-native";
import GestureFlipView from "react-native-gesture-flip-card";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as Speech from "expo-speech";
import { greWords } from "../Words";
import { colors } from "../Constants";

function Learn(props) {
	const [wordData, setWordData] = React.useState(greWords.slice(0, 30));
	const [index, setIndex] = React.useState(0);
	const [nextStartIndex, setNextStartIndex] = React.useState(30);
	const [setId, setSetId] = React.useState(1);

	const renderFront = () => {
		text = index + 1 + ". " + wordData[index].word;
		return (
			<View style={styles.cardStyle}>
				<Text style={{ fontSize: 30, color: "#fff" }}>{text}</Text>
				<TouchableOpacity
					style={{ marginLeft: 20 }}
					onPress={() => Speech.speak(wordData[index].word)}
				>
					<FontAwesome5 name="volume-up" size={30} color="white" />
				</TouchableOpacity>
			</View>
		);
	};

	const renderBack = () => {
		text = wordData[index].meaning;
		return (
			<View style={styles.cardStyle}>
				<Text style={{ fontSize: 26, color: "#fff" }}>{text}</Text>
				<TouchableOpacity
					style={{ marginLeft: 20, marginRight: 10 }}
					onPress={() => Speech.speak(wordData[index].meaning)}
				>
					<FontAwesome5 name="volume-up" size={30} color="white" />
				</TouchableOpacity>
			</View>
		);
	};

	const getNext = () => {
		if (index < wordData.length - 1) {
			setIndex(index + 1);
		} else {
			start = nextStartIndex;
			end = start + 30;
			newData = greWords.slice(start, end);
			setWordData(newData);
			setNextStartIndex(end);
			setIndex(0);
			setSetId(setId + 1);
		}
	};
	const getPrevious = () => {
		if (index > 0) {
			setIndex(index - 1);
		} else {
			end = nextStartIndex - 30;
			start = end - 30;
			newData = greWords.slice(start, end);
			setWordData(newData);
			setNextStartIndex(end);
			setIndex(0);
			setSetId(setId - 1);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.SetId}>SET {setId}</Text>
			<View style={styles.cardContainer}>
				<GestureFlipView width={200} height={100} style={styles.card}>
					{renderFront()}
					{renderBack()}
				</GestureFlipView>
			</View>
			<View style={styles.buttonsContainer}>
				<TouchableOpacity
					style={styles.buttons}
					onPress={() => getPrevious()}
				>
					<Text style={styles.buttonText}>PREVIOUS</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.buttons}
					onPress={() => getNext()}
				>
					<Text style={styles.buttonText}>NEXT</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	SetId: {
		alignSelf: "center",
		fontSize: 40,
		marginTop: 20,
		fontWeight: "bold",
		color: colors.primary,
	},
	cardContainer: {
		flex: 1,
		// backgroundColor: "blue",
		width: "100%",
		alignItems: "center",
		alignSelf: "center",
		justifyContent: "center",
	},
	cardStyle: {
		flexDirection: "row",
		width: 300,
		height: 450,
		backgroundColor: colors.primary,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 20,
		padding: 40,
	},
	Speech: {
		marginLeft: 20,
	},
	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "90%",
		paddingTop: 15,
		paddingBottom: 10,
		marginLeft: 20,
		alignItems: "center",
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
		marginBottom: 10,
		backgroundColor: colors.primary,
	},
	buttonText: {
		fontWeight: "bold",
		fontSize: 16,
		color: "white",
	},
});

export default Learn;
