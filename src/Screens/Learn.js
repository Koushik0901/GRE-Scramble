import React from "react";
import {
	SafeAreaView,
	TouchableOpacity,
	StyleSheet,
	FlatList,
	Text,
	View,
} from "react-native";
import Card from "../Components/Card";
import { greWords } from "../Words";
import { colors } from "../Constants";

const Item = ({ title, subTitle1, subTitle2, subTitle3 }) => (
	<Card
		title={title}
		subTitle1={subTitle1}
		subTitle2={subTitle2}
		subTitle3={subTitle3}
	/>
);

function Learn(props) {
	const [wordData, setWordData] = React.useState(greWords.slice(0, 26));
	const [startIndex, setStartIndex] = React.useState(26);
	const renderItem = ({ item, index }) => {
		const title = index + 1 + ") " + item.word;
		const subTitle1 = "MEANING: " + item.meaning;
		const subTitle2 = "POS: " + item.POS;
		const subTitle3 = "EXAMPLE: " + item.example;
		return (
			<Item
				title={title}
				subTitle1={subTitle1}
				subTitle2={subTitle2}
				subTitle3={subTitle3}
			/>
		);
	};

	const getNextSet = () => {
		start = startIndex;
		end = start + 26;
		newData = greWords.slice(start, end);
		setWordData(newData);
		setStartIndex(end);
	};
	const getPreviousSet = () => {
		end = startIndex - 26;
		start = end - 26;
		newData = greWords.slice(start, end);
		setWordData(newData);
		setStartIndex(end);
	};

	return (
		<SafeAreaView style={styles.container}>
			<FlatList data={wordData} renderItem={renderItem} />
			<View style={styles.buttonsContainer}>
				<TouchableOpacity
					style={styles.buttons}
					onPress={() => getPreviousSet()}
				>
					<Text style={styles.buttonText}>PREVIOUS</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.buttons}
					onPress={() => getNextSet()}
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
	item: {
		backgroundColor: "#fff",
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
		borderRadius: 15,
		alignItems: "center",
	},
	title: {
		fontSize: 32,
	},
	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "90%",
		paddingTop: 10,
		paddingBottom: 10,
		marginLeft: 20,
		alignItems: "center",
	},
	buttons: {
		width: "35%",
		height: 40,
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

export default Learn;
