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


const Item = ({ title, subTitle }) => (
	<Card title={title} subTitle={subTitle} />
);

function Learn(props) {
	const [wordData, setWordData] = React.useState(greWords.slice(0, 50));
	const [startIndex, setStartIndex] = React.useState(50);
	const renderItem = ({ item }) => (
		<Item title={item.word} subTitle={item.meaning} />
	);

	const getNextSet = () => {
		start = startIndex;
		end = start + 50;
		newData = greWords.slice(start, end);
		setWordData(newData);
		setStartIndex(end);
	};
	const getPreviousSet = () => {
		end = startIndex - 50;
		start = end - 50;
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
