import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, typography } from "../Constants";

const variants = {
	primary: {
		backgroundColor: colors.accent,
		borderColor: colors.accentDeep,
		textColor: colors.paper,
		shadowColor: "rgba(195, 93, 63, 0.35)",
	},
	secondary: {
		backgroundColor: colors.paperLift,
		borderColor: colors.cardLineStrong,
		textColor: colors.text,
		shadowColor: "rgba(8, 17, 31, 0.08)",
	},
	ghost: {
		backgroundColor: "rgba(255, 250, 242, 0.08)",
		borderColor: "rgba(255, 250, 242, 0.22)",
		textColor: colors.paper,
		shadowColor: "transparent",
	},
};

export default function PrimaryButton({
	label,
	onPress,
	variant = "primary",
	disabled = false,
	fullWidth = false,
	style,
	textStyle,
}) {
	const palette = variants[variant] ?? variants.primary;

	return (
		<Pressable
			onPress={onPress}
			disabled={disabled}
			style={({ pressed, hovered }) => [
				styles.base,
				fullWidth && styles.fullWidth,
				{
					backgroundColor: palette.backgroundColor,
					borderColor: palette.borderColor,
					opacity: disabled ? 0.45 : pressed ? 0.88 : 1,
					transform: [{ translateY: pressed ? 1 : hovered ? -2 : 0 }],
					shadowColor: palette.shadowColor,
				},
				style,
			]}
		>
			<View style={styles.inner}>
				<Text
					style={[
						styles.label,
						{ color: palette.textColor },
						textStyle,
					]}
				>
					{label}
				</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	base: {
		minHeight: 54,
		borderRadius: 18,
		borderWidth: 1,
		paddingHorizontal: 20,
		paddingVertical: 14,
		justifyContent: "center",
		shadowOpacity: 0.16,
		shadowRadius: 16,
		shadowOffset: { width: 0, height: 10 },
		elevation: 6,
	},
	fullWidth: {
		width: "100%",
	},
	inner: {
		alignItems: "center",
		justifyContent: "center",
	},
	label: {
		fontSize: 15,
		fontFamily: typography.bodyBold,
		letterSpacing: 0.5,
	},
});
