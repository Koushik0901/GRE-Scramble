import React from "react";
import { StatusBar } from "expo-status-bar";
import {
	Platform,
	Pressable,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from "react-native";
import {
	CLEAR,
	ROUND_TIME,
	colors,
	typography,
} from "../Constants";
import AppDialog from "../components/AppDialog";
import AppScreen from "../components/AppScreen";
import PrimaryButton from "../components/PrimaryButton";
import {
	createLetterTiles,
	createScrambleRounds,
	getInitialAnswerSlots,
	isSolved,
} from "../Utils";

function getTimerTone(timeLeft) {
	if (timeLeft <= 8) {
		return colors.danger;
	}
	if (timeLeft <= 15) {
		return colors.warning;
	}
	return colors.success;
}

export default function Scramble({ route, navigation }) {
	const { wordSet = [], setLabel = "Deck" } = route.params ?? {};
	const [sessionSeed, setSessionSeed] = React.useState(0);
	const rounds = React.useMemo(
		() => createScrambleRounds(wordSet),
		[wordSet, sessionSeed]
	);
	const [roundIndex, setRoundIndex] = React.useState(0);
	const [tiles, setTiles] = React.useState([]);
	const [answerSlots, setAnswerSlots] = React.useState([]);
	const [dialog, setDialog] = React.useState(null);
	const [roundState, setRoundState] = React.useState("playing");
	const [score, setScore] = React.useState(0);
	const [timeLeft, setTimeLeft] = React.useState(ROUND_TIME);
	const { width } = useWindowDimensions();
	const round = rounds[roundIndex];

	const resetAnswer = React.useCallback(() => {
		if (!round) {
			return;
		}

		setTiles(createLetterTiles(round.answerKey));
		setAnswerSlots(getInitialAnswerSlots(round.answerKey));
		setTimeLeft(ROUND_TIME);
	}, [round]);

	const restartSession = React.useCallback(() => {
		setSessionSeed((value) => value + 1);
		setRoundIndex(0);
		setScore(0);
		setDialog(null);
		setRoundState("playing");
	}, []);

	const advanceRound = React.useCallback(
		(nextScore) => {
			setDialog(null);
			if (roundIndex >= rounds.length - 1) {
				setRoundState("complete");
				setDialog({
					title: "Set complete",
					message: `You solved ${nextScore} of ${rounds.length} words in ${setLabel}.`,
					dismissible: false,
					actions: [
						{
							label: "Restart set",
							variant: "secondary",
							onPress: restartSession,
						},
						{
							label: "Back to decks",
							onPress: () => navigation.popToTop(),
						},
					],
				});
				return;
			}

			setRoundIndex((current) => current + 1);
		},
		[navigation, restartSession, roundIndex, rounds.length, setLabel]
	);

	const prepareRound = React.useCallback(() => {
		if (!round) {
			return;
		}

		setTiles(createLetterTiles(round.answerKey));
		setAnswerSlots(getInitialAnswerSlots(round.answerKey));
		setDialog(null);
		setRoundState("playing");
		setTimeLeft(ROUND_TIME);
	}, [round]);

	const useTile = React.useCallback(
		(tileId) => {
			if (roundState !== "playing") {
				return;
			}

			const tile = tiles.find((item) => item.id === tileId && !item.used);
			if (!tile) {
				return;
			}

			const slotIndex = answerSlots.findIndex((slot) => slot === null);
			if (slotIndex === -1) {
				return;
			}

			setTiles((currentTiles) =>
				currentTiles.map((item) =>
					item.id === tileId ? { ...item, used: true } : item
				)
			);
			setAnswerSlots((currentSlots) =>
				currentSlots.map((slot, index) =>
					index === slotIndex ? { letter: tile.letter, tileId } : slot
				)
			);
		},
		[answerSlots, roundState, tiles]
	);

	const clearLast = React.useCallback(() => {
		const lastFilledIndex = [...answerSlots].findLastIndex(Boolean);
		if (lastFilledIndex === -1) {
			return;
		}

		const target = answerSlots[lastFilledIndex];
		setAnswerSlots((currentSlots) =>
			currentSlots.map((slot, index) =>
				index === lastFilledIndex ? null : slot
			)
		);
		setTiles((currentTiles) =>
			currentTiles.map((item) =>
				item.id === target.tileId ? { ...item, used: false } : item
			)
		);
	}, [answerSlots]);

	React.useEffect(() => {
		prepareRound();
	}, [prepareRound]);

	React.useEffect(() => {
		if (!round || dialog || roundState !== "playing") {
			return undefined;
		}

		const timer = setInterval(() => {
			setTimeLeft((current) => {
				if (current <= 1) {
					clearInterval(timer);
					setRoundState("locked");
					setDialog({
						title: "Time's up",
						message: `${round.word}\n\n${round.meaning}`,
						dismissible: false,
						actions: [
							{
								label: "Next word",
								onPress: () => advanceRound(score),
							},
						],
					});
					return 0;
				}
				return current - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [advanceRound, dialog, round, roundState, score]);

	React.useEffect(() => {
		if (!round || roundState !== "playing") {
			return;
		}

		const filledCount = answerSlots.filter(Boolean).length;
		if (filledCount !== answerSlots.length || filledCount === 0) {
			return;
		}

		if (isSolved(answerSlots, round.answerKey)) {
			const nextScore = score + 1;
			setScore(nextScore);
			setRoundState("locked");
			setDialog({
				title: "Correct",
				message: `${round.word}\n\n${round.meaning}`,
				dismissible: false,
				actions: [
					{
						label: "Next word",
						onPress: () => advanceRound(nextScore),
					},
				],
			});
			return;
		}

		setRoundState("locked");
		setDialog({
			title: "Not quite",
			message: "Those letters don't match the target word yet.",
			dismissible: false,
			actions: [
				{
					label: "Try again",
					variant: "secondary",
					onPress: () => {
						resetAnswer();
						setDialog(null);
						setRoundState("playing");
					},
				},
				{
					label: "Reveal answer",
					onPress: () =>
						setDialog({
							title: round.word,
							message: round.meaning,
							dismissible: false,
							actions: [
								{
									label: "Keep studying",
									variant: "secondary",
									onPress: () => {
										resetAnswer();
										setDialog(null);
										setRoundState("playing");
									},
								},
								{
									label: "Next word",
									onPress: () => advanceRound(score),
								},
							],
						}),
				},
			],
		});
	}, [advanceRound, answerSlots, resetAnswer, round, roundState, score]);

	React.useEffect(() => {
		if (Platform.OS !== "web" || !round || dialog || roundState !== "playing") {
			return undefined;
		}

		const onKeyDown = (event) => {
			if (event.key === "Backspace" || event.key === "Delete") {
				event.preventDefault();
				clearLast();
				return;
			}

			if (!/^[a-z]$/i.test(event.key)) {
				return;
			}

			const match = tiles.find(
				(tile) =>
					!tile.used &&
					tile.letter.toLowerCase() === event.key.toLowerCase()
			);
			if (match) {
				event.preventDefault();
				useTile(match.id);
			}
		};

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [clearLast, dialog, round, roundState, tiles, useTile]);

	if (!round) {
		return (
			<AppScreen
				eyebrow={setLabel}
				title="This deck can't be scrambled yet"
				subtitle="The selected words need at least three letters after cleanup. Choose another set to continue."
			/>
		);
	}

	const filledCount = answerSlots.filter(Boolean).length;
	const timerRatio = timeLeft / ROUND_TIME;
	const timerColor = getTimerTone(timeLeft);
	const tileSize = width > 820 ? 64 : width > 420 ? 56 : 48;

	return (
		<AppScreen
			eyebrow={setLabel}
			title="Unscramble the word before time runs out."
			subtitle="Click or tap letters to build the answer. On web, you can also type from the keyboard and use Backspace to clear."
		>
			<StatusBar style="light" />

			<View style={styles.topRow}>
				<View style={styles.statCard}>
					<Text style={styles.statValue}>
						{roundIndex + 1}/{rounds.length}
					</Text>
					<Text style={styles.statLabel}>word</Text>
				</View>
				<View style={styles.statCard}>
					<Text style={styles.statValue}>{score}</Text>
					<Text style={styles.statLabel}>score</Text>
				</View>
				<View style={styles.timerCard}>
					<View style={styles.timerHeader}>
						<Text style={styles.timerLabel}>Time</Text>
						<Text style={[styles.timerValue, { color: timerColor }]}>
							{timeLeft}s
						</Text>
					</View>
					<View style={styles.timerTrack}>
						<View
							style={[
								styles.timerFill,
								{
									width: `${Math.max(timerRatio, 0) * 100}%`,
									backgroundColor: timerColor,
								},
							]}
						/>
					</View>
				</View>
			</View>

			<View style={styles.definitionCard}>
				<Text style={styles.definitionEyebrow}>Definition</Text>
				<Text style={styles.definitionText}>{round.meaning}</Text>
			</View>

			<View style={styles.answerPanel}>
				<Text style={styles.prompt}>Build the word</Text>
				<View style={styles.answerRow}>
					{answerSlots.map((slot, index) => (
						<View key={`${round.id}-slot-${index}`} style={styles.answerCell}>
							<Text style={styles.answerCellText}>
								{slot?.letter?.toUpperCase() ?? ""}
							</Text>
						</View>
					))}
				</View>
				<Text style={styles.answerHint}>
					{filledCount === 0
						? "Start with any letter."
						: `${filledCount} of ${answerSlots.length} letters filled.`}
				</Text>
			</View>

			<View style={styles.tileTray}>
				{tiles.map((tile) => (
					<Pressable
						key={tile.id}
						onPress={() => useTile(tile.id)}
						disabled={tile.used}
						style={({ pressed }) => [
							styles.tile,
							{
								width: tileSize,
								height: tileSize,
								opacity: tile.used ? 0.28 : pressed ? 0.88 : 1,
							},
						]}
					>
						<Text style={styles.tileText}>{tile.letter.toUpperCase()}</Text>
					</Pressable>
				))}
			</View>

			<View style={styles.actionsRow}>
				<PrimaryButton
					label={CLEAR}
					variant="secondary"
					onPress={clearLast}
					style={styles.actionButton}
				/>
				<PrimaryButton
					label="Reset round"
					variant="ghost"
					onPress={resetAnswer}
					style={styles.actionButton}
				/>
				<PrimaryButton
					label="Reveal"
					onPress={() =>
						setDialog({
							title: round.word,
							message: round.meaning,
							actions: [
								{
									label: "Keep playing",
									variant: "secondary",
									onPress: () => setDialog(null),
								},
								{
									label: "Next word",
									onPress: () => advanceRound(score),
								},
							],
						})
					}
					style={styles.actionButton}
				/>
			</View>

			<AppDialog
				visible={Boolean(dialog)}
				title={dialog?.title ?? ""}
				message={dialog?.message ?? ""}
				actions={dialog?.actions ?? []}
				dismissible={dialog?.dismissible ?? true}
				onClose={() => setDialog(null)}
			/>
		</AppScreen>
	);
}

const styles = StyleSheet.create({
	topRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 14,
		marginBottom: 20,
	},
	statCard: {
		borderRadius: 24,
		padding: 18,
		backgroundColor: colors.panelStrong,
		borderWidth: 1,
		borderColor: colors.line,
		minWidth: 110,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 18,
		shadowOffset: { width: 0, height: 10 },
		elevation: 5,
	},
	statValue: {
		color: colors.paper,
		fontSize: 26,
		fontFamily: typography.display,
	},
	statLabel: {
		color: "rgba(255, 250, 242, 0.72)",
		fontSize: 12,
		letterSpacing: 1.2,
		textTransform: "uppercase",
		marginTop: 6,
		fontFamily: typography.bodyBold,
	},
	timerCard: {
		flex: 1,
		minWidth: 210,
		borderRadius: 24,
		padding: 18,
		backgroundColor: colors.paperLift,
		borderWidth: 1,
		borderColor: colors.cardLineStrong,
		shadowColor: colors.shadow,
		shadowOpacity: 0.12,
		shadowRadius: 18,
		shadowOffset: { width: 0, height: 10 },
		elevation: 6,
	},
	timerHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
	},
	timerLabel: {
		fontSize: 13,
		letterSpacing: 1.2,
		textTransform: "uppercase",
		color: colors.muted,
		fontFamily: typography.bodyBold,
	},
	timerValue: {
		fontSize: 24,
		fontFamily: typography.display,
	},
	timerTrack: {
		height: 10,
		borderRadius: 999,
		backgroundColor: colors.accentSoft,
		overflow: "hidden",
	},
	timerFill: {
		height: "100%",
		borderRadius: 999,
	},
	definitionCard: {
		borderRadius: 32,
		padding: 24,
		backgroundColor: colors.paperLift,
		borderWidth: 1,
		borderColor: colors.cardLineStrong,
		marginBottom: 20,
		shadowColor: colors.shadow,
		shadowOpacity: 0.12,
		shadowRadius: 20,
		shadowOffset: { width: 0, height: 12 },
		elevation: 7,
	},
	definitionEyebrow: {
		fontSize: 12,
		letterSpacing: 2,
		textTransform: "uppercase",
		color: colors.accent,
		marginBottom: 10,
		fontFamily: typography.bodyBold,
	},
	definitionText: {
		fontSize: 20,
		lineHeight: 30,
		color: colors.text,
		fontFamily: typography.bodyMedium,
	},
	answerPanel: {
		borderRadius: 32,
		padding: 24,
		backgroundColor: colors.panelStrong,
		borderWidth: 1,
		borderColor: colors.line,
		marginBottom: 20,
	},
	prompt: {
		color: colors.paper,
		fontSize: 22,
		fontFamily: typography.display,
		marginBottom: 14,
	},
	answerRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 10,
	},
	answerCell: {
		width: 54,
		height: 62,
		borderRadius: 18,
		backgroundColor: colors.paperLift,
		borderWidth: 1,
		borderColor: colors.cardLineStrong,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: colors.shadow,
		shadowOpacity: 0.08,
		shadowRadius: 10,
		shadowOffset: { width: 0, height: 6 },
		elevation: 4,
	},
	answerCellText: {
		fontSize: 24,
		color: colors.text,
		fontFamily: typography.bodyExtraBold,
	},
	answerHint: {
		color: "rgba(255, 250, 242, 0.74)",
		fontSize: 14,
		marginTop: 14,
		fontFamily: typography.body,
	},
	tileTray: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 12,
		marginBottom: 20,
	},
	tile: {
		borderRadius: 20,
		backgroundColor: colors.paperLift,
		borderWidth: 1,
		borderColor: colors.cardLineStrong,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#08111f",
		shadowOpacity: 0.1,
		shadowRadius: 16,
		shadowOffset: { width: 0, height: 10 },
		elevation: 6,
	},
	tileText: {
		fontSize: 26,
		color: colors.text,
		fontFamily: typography.bodyExtraBold,
	},
	actionsRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 12,
	},
	actionButton: {
		minWidth: 138,
	},
});
