import React from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { colors, typography } from "../Constants";

export default function AppScreen({
	eyebrow,
	title,
	subtitle,
	children,
	scrollable = true,
	contentContainerStyle,
}) {
	const { width } = useWindowDimensions();
	const shell = (
		<View
			style={[
				styles.content,
				width > 900 && styles.contentDesktop,
				contentContainerStyle,
			]}
		>
			<View style={styles.hero}>
				<Text style={styles.eyebrow}>{eyebrow}</Text>
				<Text style={styles.title}>{title}</Text>
				{subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
			</View>
			{children}
		</View>
	);

	return (
		<LinearGradient colors={colors.appGradient} style={styles.gradient}>
			<View style={styles.ambientTop} />
			<View style={styles.ambientBottom} />
			<View style={styles.ambientRing} />
			<SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
				{scrollable ? (
					<ScrollView
						showsVerticalScrollIndicator={false}
						contentContainerStyle={styles.scrollContent}
					>
						{shell}
					</ScrollView>
				) : (
					<View style={styles.scrollContent}>{shell}</View>
				)}
			</SafeAreaView>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	gradient: {
		flex: 1,
	},
	safeArea: {
		flex: 1,
	},
	scrollContent: {
		flexGrow: 1,
	},
	content: {
		flexGrow: 1,
		paddingHorizontal: 18,
		paddingTop: 16,
		paddingBottom: 34,
	},
	contentDesktop: {
		paddingHorizontal: 28,
		alignSelf: "center",
		width: "100%",
		maxWidth: 1180,
	},
	hero: {
		marginBottom: 24,
		padding: 22,
		borderRadius: 30,
		backgroundColor: colors.panel,
		borderWidth: 1,
		borderColor: colors.line,
		shadowColor: "#000",
		shadowOpacity: 0.14,
		shadowRadius: 30,
		shadowOffset: { width: 0, height: 20 },
		elevation: 10,
	},
	eyebrow: {
		color: "rgba(255, 250, 242, 0.76)",
		fontSize: 12,
		fontFamily: typography.bodyBold,
		letterSpacing: 2.4,
		textTransform: "uppercase",
		marginBottom: 10,
	},
	title: {
		color: colors.paper,
		fontSize: 38,
		lineHeight: 44,
		fontFamily: typography.display,
		marginBottom: 10,
		maxWidth: 680,
	},
	subtitle: {
		color: "rgba(255, 250, 242, 0.84)",
		fontSize: 16,
		lineHeight: 26,
		maxWidth: 720,
		fontFamily: typography.body,
	},
	ambientTop: {
		position: "absolute",
		top: -130,
		right: -80,
		width: 320,
		height: 320,
		borderRadius: 999,
		backgroundColor: "rgba(209, 170, 99, 0.08)",
	},
	ambientBottom: {
		position: "absolute",
		bottom: -120,
		left: -100,
		width: 340,
		height: 340,
		borderRadius: 999,
		backgroundColor: "rgba(195, 93, 63, 0.09)",
	},
	ambientRing: {
		position: "absolute",
		top: 210,
		right: -40,
		width: 180,
		height: 180,
		borderRadius: 999,
		borderWidth: 1,
		borderColor: "rgba(255, 250, 242, 0.09)",
		transform: [{ rotate: "18deg" }],
	},
});
