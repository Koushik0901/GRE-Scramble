import React from "react";
import { SafeAreaView, View, StyleSheet, FlatList, Text } from "react-native";
import Card from "../Components/Card";
import { greWords } from "../Words";

let sets = [];
for (let i = 0; i <= 27; i++) {
	sets.push("set " + i);
}

const Item = ({ title, subTitle }) => (
	// <View style={styles.item} key={title}>
	// 	<Text style={styles.title}>{title}</Text>
	// </View>
	<Card title={title} subTitle={subTitle} />
);

function Learn(props) {
	const renderItem = ({ item }) => (
		<Item title={item.word} subTitle={item.meaning} />
	);
	return (
		<SafeAreaView style={styles.container}>
			<FlatList data={greWords} renderItem={renderItem} />
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
});

export default Learn;
