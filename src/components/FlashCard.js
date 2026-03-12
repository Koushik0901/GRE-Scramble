import React from "react";
import {
	Animated,
	Pressable,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, typography } from "../Constants";

export default function FlashCard({
	frontLabel,
	frontText,
	backLabel,
	backText,
	face,
	onFlip,
}) {
	const progress = React.useRef(new Animated.Value(face === "front" ? 0 : 1))
		.current;
	const { width } = useWindowDimensions();
	const cardWidth = Math.min(width - 36, 560);
	const cardHeight = width > 900 ? 430 : width > 540 ? 380 : 320;

	React.useEffect(() => {
		Animated.spring(progress, {
			toValue: face === "front" ? 0 : 1,
			stiffness: 170,
			damping: 18,
			mass: 1,
			useNativeDriver: false,
		}).start();
	}, [face, progress]);

	const frontStyle = {
		opacity: progress.interpolate({
			inputRange: [0, 0.35, 1],
			outputRange: [1, 0, 0],
		}),
		transform: [
			{
				scale: progress.interpolate({
					inputRange: [0, 1],
					outputRange: [1, 0.96],
				}),
			},
		],
	};

	const backStyle = {
		opacity: progress.interpolate({
			inputRange: [0, 0.65, 1],
			outputRange: [0, 0, 1],
		}),
		transform: [
			{
				scale: progress.interpolate({
					inputRange: [0, 1],
					outputRange: [0.96, 1],
				}),
			},
		],
	};

	return (
		<Pressable onPress={onFlip} style={{ width: cardWidth }}>
			<View style={[styles.frame, { height: cardHeight }]}>
				<Animated.View style={[styles.face, frontStyle]}>
					<LinearGradient
						colors={["#fffdf9", "#f8f0e4"]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						style={styles.faceGradient}
					>
						<View style={styles.faceTopRow}>
							<Text style={styles.cardLabel}>{frontLabel}</Text>
							<View style={styles.faceChip}>
								<Text style={styles.faceChipLabel}>Word</Text>
							</View>
						</View>
						<Text style={styles.cardText}>{frontText}</Text>
						<Text style={styles.hint}>Tap to reveal the definition</Text>
					</LinearGradient>
				</Animated.View>
				<Animated.View style={[styles.face, styles.backFace, backStyle]}>
					<LinearGradient
						colors={["#fff8f1", "#f2e2ca"]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						style={styles.faceGradient}
					>
						<View style={styles.faceTopRow}>
							<Text style={styles.cardLabel}>{backLabel}</Text>
							<View style={styles.faceChip}>
								<Text style={styles.faceChipLabel}>Meaning</Text>
							</View>
						</View>
						<Text style={[styles.cardText, styles.backText]}>{backText}</Text>
						<Text style={styles.hint}>Tap to return to the word</Text>
					</LinearGradient>
				</Animated.View>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	frame: {
		borderRadius: 34,
		overflow: "hidden",
		borderWidth: 1,
		borderColor: "rgba(255, 250, 242, 0.2)",
		backgroundColor: "rgba(255, 255, 255, 0.05)",
		justifyContent: "center",
		shadowColor: "#000",
		shadowOpacity: 0.14,
		shadowRadius: 26,
		shadowOffset: { width: 0, height: 20 },
		elevation: 10,
	},
	face: {
		position: "absolute",
		inset: 0,
		backgroundColor: colors.paper,
	},
	backFace: {
		backgroundColor: colors.paperMuted,
	},
	faceGradient: {
		flex: 1,
		paddingHorizontal: 28,
		paddingVertical: 24,
		justifyContent: "space-between",
	},
	faceTopRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		gap: 12,
	},
	faceChip: {
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 999,
		backgroundColor: "rgba(16, 24, 38, 0.06)",
		borderWidth: 1,
		borderColor: "rgba(16, 24, 38, 0.08)",
	},
	faceChipLabel: {
		fontSize: 11,
		letterSpacing: 1.1,
		textTransform: "uppercase",
		color: colors.navySoft,
		fontFamily: typography.bodyBold,
	},
	cardLabel: {
		fontSize: 12,
		letterSpacing: 2,
		textTransform: "uppercase",
		color: colors.accent,
		fontFamily: typography.bodyBold,
	},
	cardText: {
		fontSize: 38,
		lineHeight: 44,
		color: colors.text,
		fontFamily: typography.display,
	},
	backText: {
		fontSize: 24,
		lineHeight: 34,
		fontFamily: typography.bodyMedium,
	},
	hint: {
		fontSize: 14,
		lineHeight: 20,
		color: colors.navySoft,
		fontFamily: typography.body,
	},
});
