import React from "react";
import {
	Pressable,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import { colors, typography } from "../Constants";
import FlashCard from "../components/FlashCard";
import AppScreen from "../components/AppScreen";
import PrimaryButton from "../components/PrimaryButton";

function speak(text) {
	try {
		Speech.stop();
		Speech.speak(text);
	} catch (error) {
	}
}

export default function Learn({ route }) {
	const { wordSet = [], setLabel = "Study deck" } = route.params ?? {};
	const [index, setIndex] = React.useState(0);
	const [face, setFace] = React.useState("front");
	const { width } = useWindowDimensions();
	const entry = wordSet[index];

	React.useEffect(() => {
		setFace("front");
	}, [index]);

	if (!entry) {
		return (
			<AppScreen
				eyebrow="Learn"
				title="This deck is empty"
				subtitle="Choose another set from the home screen."
			/>
		);
	}

	return (
		<AppScreen
			eyebrow={setLabel}
			title="Study one card at a time."
			subtitle="Tap the card to reveal the definition, or use the speaker buttons to hear the word and its meaning."
		>
			<View style={styles.metaRow}>
				<View style={styles.metaPill}>
					<Text style={styles.metaKicker}>Card</Text>
					<Text style={styles.metaValue}>
						{index + 1}/{wordSet.length}
					</Text>
					<Text style={styles.metaLabel}>progress</Text>
				</View>
				<View style={styles.metaPill}>
					<Text style={styles.metaKicker}>Face</Text>
					<Text style={styles.metaValue}>
						{face === "front" ? "Word" : "Meaning"}
					</Text>
					<Text style={styles.metaLabel}>visible side</Text>
				</View>
				<View style={styles.metaPill}>
					<Text style={styles.metaKicker}>Gesture</Text>
					<Text style={styles.metaValue}>Tap</Text>
					<Text style={styles.metaLabel}>to flip</Text>
				</View>
			</View>

			<View style={styles.cardSection}>
				<FlashCard
					frontLabel={`Card ${index + 1}`}
					frontText={entry.word}
					backLabel="Definition"
					backText={entry.meaning}
					face={face}
					onFlip={() =>
						setFace((currentFace) =>
							currentFace === "front" ? "back" : "front"
						)
					}
				/>
			</View>

			<View
				style={[
					styles.toolbar,
					width > 860 && { flexDirection: "row", alignItems: "center" },
				]}
			>
				<View style={styles.speechRow}>
					<Pressable
						onPress={() => speak(entry.word)}
						style={({ pressed }) => [
							styles.audioButton,
							pressed && styles.audioButtonPressed,
						]}
					>
						<MaterialCommunityIcons
							name="volume-high"
							size={22}
							color={colors.text}
						/>
						<Text style={styles.audioLabel}>Speak word</Text>
					</Pressable>
					<Pressable
						onPress={() => speak(entry.meaning)}
						style={({ pressed }) => [
							styles.audioButton,
							pressed && styles.audioButtonPressed,
						]}
					>
						<MaterialCommunityIcons
							name="waveform"
							size={22}
							color={colors.text}
						/>
						<Text style={styles.audioLabel}>Speak meaning</Text>
					</Pressable>
				</View>

				<View style={styles.controlsRow}>
					<PrimaryButton
						label="Previous"
						variant="secondary"
						onPress={() => setIndex((current) => Math.max(current - 1, 0))}
						disabled={index === 0}
						style={styles.controlButton}
					/>
					<PrimaryButton
						label={face === "front" ? "Flip card" : "Show word"}
						variant="ghost"
						onPress={() =>
							setFace((currentFace) =>
								currentFace === "front" ? "back" : "front"
							)
						}
						style={styles.controlButton}
					/>
					<PrimaryButton
						label="Next"
						onPress={() =>
							setIndex((current) =>
								Math.min(current + 1, wordSet.length - 1)
							)
						}
						disabled={index === wordSet.length - 1}
						style={styles.controlButton}
					/>
				</View>
			</View>
		</AppScreen>
	);
}

const styles = StyleSheet.create({
	metaRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 12,
		marginBottom: 22,
	},
	metaPill: {
		borderRadius: 22,
		paddingHorizontal: 16,
		paddingVertical: 14,
		backgroundColor: colors.panelStrong,
		borderWidth: 1,
		borderColor: colors.line,
		minWidth: 110,
		shadowColor: "#000",
		shadowOpacity: 0.08,
		shadowRadius: 18,
		shadowOffset: { width: 0, height: 10 },
		elevation: 5,
	},
	metaKicker: {
		color: "rgba(255, 250, 242, 0.65)",
		fontSize: 11,
		textTransform: "uppercase",
		letterSpacing: 1.8,
		fontFamily: typography.bodySemiBold,
		marginBottom: 8,
	},
	metaValue: {
		color: colors.paper,
		fontSize: 20,
		fontFamily: typography.display,
	},
	metaLabel: {
		color: "rgba(255, 250, 242, 0.72)",
		fontSize: 12,
		letterSpacing: 1.4,
		textTransform: "uppercase",
		marginTop: 6,
		fontFamily: typography.bodyBold,
	},
	cardSection: {
		alignItems: "center",
		marginBottom: 22,
	},
	toolbar: {
		gap: 16,
		padding: 20,
		borderRadius: 30,
		backgroundColor: colors.panelStrong,
		borderWidth: 1,
		borderColor: colors.line,
		shadowColor: "#000",
		shadowOpacity: 0.12,
		shadowRadius: 22,
		shadowOffset: { width: 0, height: 14 },
		elevation: 8,
	},
	speechRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 12,
		flex: 1,
	},
	audioButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		paddingHorizontal: 16,
		paddingVertical: 14,
		borderRadius: 20,
		backgroundColor: colors.paperLift,
		borderWidth: 1,
		borderColor: colors.cardLineStrong,
		shadowColor: colors.shadow,
		shadowOpacity: 0.08,
		shadowRadius: 12,
		shadowOffset: { width: 0, height: 8 },
		elevation: 4,
	},
	audioButtonPressed: {
		opacity: 0.88,
	},
	audioLabel: {
		fontSize: 15,
		color: colors.text,
		fontFamily: typography.bodyBold,
	},
	controlsRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 12,
	},
	controlButton: {
		minWidth: 140,
	},
});
