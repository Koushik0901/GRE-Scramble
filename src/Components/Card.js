import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../Constants";

function Card({ title, subTitle1, subTitle2, subTitle3, width = "90%" }) {
	return (
		<View style={styles.card}>
			<Text style={[styles.title, { width: width }]}>{title}</Text>
			<Text style={styles.subTitle}>{subTitle1}</Text>
			<Text style={styles.subTitle}>{subTitle2}</Text>
			<Text style={styles.subTitle}>{subTitle3}</Text>
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
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 8,
	},
});

export default Card;
