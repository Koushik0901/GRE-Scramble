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
import { colors } from "../Constants";

function Learn({ route, navigation }) {
	let { wordSet } = route.params;
	const [index, setIndex] = React.useState(0);

	const renderFront = () => {
		word = index + 1 + ". " + wordSet[index].word;
		return (
			<View style={styles.cardStyle}>
				<Text style={{ fontSize: 26, color: "#fff" }}>{word}</Text>
				<TouchableOpacity
					style={{ marginLeft: 20 }}
					onPress={() => Speech.speak(wordSet[index].word)}
				>
					<FontAwesome5 name="volume-up" size={30} color="white" />
				</TouchableOpacity>
			</View>
		);
	};

	const renderBack = () => {
		meaning = wordSet[index].meaning;
		return (
			<View style={styles.cardStyle}>
				<Text style={{ fontSize: 26, color: "#fff" }}>{meaning}</Text>
				<TouchableOpacity
					style={{ marginLeft: 20, marginRight: 10 }}
					onPress={() => Speech.speak(wordSet[index].meaning)}
				>
					<FontAwesome5 name="volume-up" size={30} color="white" />
				</TouchableOpacity>
			</View>
		);
	};

	const getNext = () => {
		if (index < wordSet.length - 1) {
			setIndex(index + 1);
		}
	};
	const getPrevious = () => {
		if (index > 0) {
			setIndex(index - 1);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
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
	cardContainer: {
		flex: 1,
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
		marginBottom: 50,
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
