import React from "react";
import {
	SafeAreaView,
	TouchableOpacity,
	Text,
	FlatList,
	StyleSheet,
} from "react-native";
import { colors } from "../Constants";
import { greWords } from "../Words";

function range(start, end) {
	if (start === end) return [start];
	return [start, ...range(start + 1, end)];
}

function getWordsSet(id) {
	const end = id * 26;
	const start = end - 26;
	return greWords.slice(start, end);
}

const sets = range(1, 41);

export default function Home({ navigation }) {
	const renderItem = ({ item }) => (
		<TouchableOpacity
			style={styles.card}
			onPress={() =>
				navigation.navigate("Scramble", { wordSet: getWordsSet(item) })
			}
		>
			<Text style={styles.text}>SET {item}</Text>
		</TouchableOpacity>
	);
	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={sets}
				renderItem={renderItem}
				numColumns={2}
				horizontal={false}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		flexWrap: "wrap",
		marginTop: 10,
		marginLeft: 20,
		marginRight: 10,
	},
	text: {
		fontSize: 26,
		color: "white",
		fontWeight: "bold",
	},
	card: {
		width: 180,
		height: 130,
		backgroundColor: colors.primary,
		borderRadius: 15,
		marginTop: 10,
		marginRight: 10,
		alignItems: "center",
		justifyContent: "center",
		paddingTop: 20,
		paddingBottom: 30,
		paddingLeft: 20,
		paddingRight: 20,
	},
});
