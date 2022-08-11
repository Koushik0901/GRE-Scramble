import React from "react";
import {
	SafeAreaView,
	TouchableOpacity,
	Text,
	FlatList,
	StyleSheet,
	View,
	Modal,
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
	const [modalVisible, setModalVisible] = React.useState(false);
	const [selectedSet, setSelectedSet] = React.useState(getWordsSet(1));
	const renderItem = ({ item }) => (
		<TouchableOpacity
			style={styles.card}
			onPress={() => {
				setModalVisible(true);
				setSelectedSet(item);
			}}
			// onPress={() =>
			// 	navigation.navigate("Scramble", { wordSet: getWordsSet(item) })
			// }
		>
			<Text style={styles.text}>SET {item}</Text>
		</TouchableOpacity>
	);
	return (
		<SafeAreaView style={styles.container}>
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					// Alert.alert("Modal has been closed.");
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalText}>
							What are we doing today?
						</Text>
						<TouchableOpacity
							style={styles.button}
							onPress={() => {
								setModalVisible(!modalVisible);
								navigation.navigate("Scramble", {
									wordSet: getWordsSet(selectedSet),
								});
							}}
						>
							<Text
								style={[
									styles.text,
									{ fontSize: 20, alignSelf: "center" },
								]}
							>
								Test
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.button}
							onPress={() => {
								setModalVisible(!modalVisible);
								navigation.navigate("Learn", {
									wordSet: getWordsSet(selectedSet),
								});
							}}
						>
							<Text
								style={[
									styles.text,
									{ fontSize: 20, alignSelf: "center" },
								]}
							>
								Learn
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
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
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		// marginTop: 22,
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	modalView: {
		width: "80%",
		height: "28%",
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	modalText: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 15,
	},
	button: {
		width: 150,
		height: 50,
		borderRadius: 25,
		padding: 10,
		elevation: 2,
		marginBottom: 20,
		backgroundColor: colors.primary,
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
