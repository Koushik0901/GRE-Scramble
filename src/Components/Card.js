import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../Constants";

function Card({ title, subTitle }) {
	return (
		<View style={styles.card}>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.subTitle}>{subTitle}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		width: "90%",
		backgroundColor: "white",
		borderRadius: 15,
		marginTop: 10,
		marginBottom: 10,
		alignSelf: "center",
		paddingTop: 20,
		paddingBottom: 30,
		paddingLeft: 20,
		paddingRight: 20,
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 10,
		color: colors.primary,
	},
	subTitle: {
		fontSize: 18,
		fontStyle: "italic",
	},
});

export default Card;
