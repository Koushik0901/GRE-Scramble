import React from "react";
import {
	Pressable,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from "react-native";
import { colors, SET_SIZE, typography } from "../Constants";
import AppDialog from "../components/AppDialog";
import AppScreen from "../components/AppScreen";
import { buildWordSets, getSetPreview } from "../Utils";

export default function Home({ navigation }) {
	const sets = React.useMemo(() => buildWordSets(), []);
	const [selectedSet, setSelectedSet] = React.useState(null);
	const { width } = useWindowDimensions();
	const cardWidth =
		width > 1080 ? 320 : width > 760 ? Math.max((width - 78) / 2, 280) : width - 36;

	const openSet = (wordSet) => setSelectedSet(wordSet);
	const closeDialog = () => setSelectedSet(null);

	const launchRoute = (screen) => {
		if (!selectedSet) {
			return;
		}

		navigation.navigate(screen, {
			wordSet: selectedSet.words,
			setId: selectedSet.id,
			setLabel: selectedSet.label,
		});
		closeDialog();
	};

	return (
		<AppScreen
			eyebrow="Vocabulary Studio"
			title="Study the deck. Then race the scramble."
			subtitle="Sharpen your GRE vocabulary with curated decks, quick study cards, and fast scramble rounds."
		>
			<View style={styles.summaryCard}>
				<View style={styles.summaryLead}>
					<Text style={styles.summaryLeadEyebrow}>Plan your session</Text>
					<Text style={styles.summaryLeadTitle}>
						Choose a deck, review the vocabulary, then switch into speed mode.
					</Text>
				</View>
				<View style={styles.summaryColumn}>
					<Text style={styles.summaryValue}>{sets.length}</Text>
					<Text style={styles.summaryLabel}>curated sets</Text>
				</View>
				<View style={styles.summaryDivider} />
				<View style={styles.summaryColumn}>
					<Text style={styles.summaryValue}>{SET_SIZE}</Text>
					<Text style={styles.summaryLabel}>words per deck</Text>
				</View>
				<View style={styles.summaryDivider} />
				<View style={styles.summaryColumn}>
					<Text style={styles.summaryValue}>Tap</Text>
					<Text style={styles.summaryLabel}>to choose a mode</Text>
				</View>
			</View>

			<View style={styles.grid}>
				{sets.map((wordSet) => (
					<Pressable
						key={wordSet.id}
						onPress={() => openSet(wordSet)}
						style={({ pressed, hovered }) => [
							styles.card,
							{
								width: cardWidth,
								opacity: pressed ? 0.94 : 1,
								transform: [{ translateY: pressed ? 2 : hovered ? -2 : 0 }],
							},
						]}
					>
						<Text style={styles.cardEyebrow}>Deck {wordSet.id}</Text>
						<Text style={styles.cardTitle}>{wordSet.label}</Text>
						<Text style={styles.cardCopy}>
							{getSetPreview(wordSet.words)}
						</Text>
						<View style={styles.cardFooter}>
							<View style={styles.cardFooterBadge}>
								<Text style={styles.cardFooterText}>
									{wordSet.words.length} words
								</Text>
							</View>
							<View style={styles.cardFooterBadge}>
								<Text style={styles.cardFooterText}>Learn or Scramble</Text>
							</View>
						</View>
					</Pressable>
				))}
			</View>

			<AppDialog
				visible={Boolean(selectedSet)}
				onClose={closeDialog}
				title={selectedSet ? `${selectedSet.label} is ready` : ""}
				message={
					selectedSet
						? `Start by reviewing the flashcards or jump directly into the scramble round.\n\nPreview: ${getSetPreview(
								selectedSet.words
						  )}`
						: ""
				}
				actions={[
					{
						label: "Learn deck",
						variant: "secondary",
						onPress: () => launchRoute("Learn"),
					},
					{
						label: "Play scramble",
						onPress: () => launchRoute("Scramble"),
					},
				]}
			/>
		</AppScreen>
	);
}

const styles = StyleSheet.create({
	summaryCard: {
		borderRadius: 34,
		padding: 22,
		backgroundColor: colors.panelStrong,
		borderWidth: 1,
		borderColor: colors.line,
		flexDirection: "row",
		flexWrap: "wrap",
		rowGap: 16,
		columnGap: 14,
		marginBottom: 24,
		shadowColor: "#000",
		shadowOpacity: 0.12,
		shadowRadius: 26,
		shadowOffset: { width: 0, height: 18 },
		elevation: 8,
	},
	summaryLead: {
		width: "100%",
		paddingBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: colors.line,
	},
	summaryLeadEyebrow: {
		fontSize: 12,
		letterSpacing: 2.4,
		textTransform: "uppercase",
		color: "rgba(255, 250, 242, 0.74)",
		fontFamily: typography.bodyBold,
		marginBottom: 8,
	},
	summaryLeadTitle: {
		fontSize: 23,
		lineHeight: 30,
		color: colors.paper,
		fontFamily: typography.display,
		maxWidth: 540,
	},
	summaryColumn: {
		flex: 1,
		minWidth: 100,
	},
	summaryValue: {
		fontSize: 26,
		color: colors.paper,
		fontFamily: typography.display,
	},
	summaryLabel: {
		fontSize: 13,
		lineHeight: 18,
		color: "rgba(255, 250, 242, 0.72)",
		textTransform: "uppercase",
		letterSpacing: 1,
		marginTop: 6,
		fontFamily: typography.bodyBold,
	},
	summaryDivider: {
		width: 1,
		backgroundColor: colors.line,
		marginHorizontal: 12,
	},
	grid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 16,
	},
	card: {
		borderRadius: 34,
		padding: 24,
		backgroundColor: colors.paperLift,
		borderWidth: 1,
		borderColor: colors.cardLineStrong,
		minHeight: 210,
		justifyContent: "space-between",
		shadowColor: "#08111f",
		shadowOpacity: 0.14,
		shadowRadius: 26,
		shadowOffset: { width: 0, height: 18 },
		elevation: 10,
	},
	cardEyebrow: {
		fontSize: 12,
		color: colors.accent,
		fontFamily: typography.bodyBold,
		letterSpacing: 2,
		textTransform: "uppercase",
		marginBottom: 10,
	},
	cardTitle: {
		fontSize: 30,
		lineHeight: 34,
		fontFamily: typography.display,
		color: colors.text,
		marginBottom: 12,
	},
	cardCopy: {
		fontSize: 15,
		lineHeight: 24,
		color: colors.muted,
		flex: 1,
		fontFamily: typography.body,
	},
	cardFooter: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 10,
		alignItems: "center",
		marginTop: 16,
	},
	cardFooterBadge: {
		paddingHorizontal: 12,
		paddingVertical: 9,
		borderRadius: 999,
		backgroundColor: colors.goldSoft,
		borderWidth: 1,
		borderColor: "rgba(209, 170, 99, 0.25)",
	},
	cardFooterText: {
		fontSize: 13,
		color: colors.navySoft,
		fontFamily: typography.bodySemiBold,
	},
});
