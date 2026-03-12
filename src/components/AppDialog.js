import React from "react";
import {
	Modal,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { colors, typography } from "../Constants";
import PrimaryButton from "./PrimaryButton";

export default function AppDialog({
	visible,
	title,
	message,
	actions = [],
	dismissible = true,
	onClose,
}) {
	return (
		<Modal
			transparent
			animationType="fade"
			visible={visible}
			onRequestClose={dismissible ? onClose : undefined}
		>
			<View style={styles.overlay}>
				<Pressable
					style={StyleSheet.absoluteFill}
					onPress={dismissible ? onClose : undefined}
				/>
				<View style={styles.card}>
					<Text style={styles.title}>{title}</Text>
					{message ? <Text style={styles.message}>{message}</Text> : null}
					<View style={styles.actions}>
						{actions.map((action) => (
							<PrimaryButton
								key={action.label}
								label={action.label}
								variant={action.variant ?? "primary"}
								onPress={action.onPress}
								fullWidth
							/>
						))}
					</View>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: "rgba(4, 10, 18, 0.58)",
		alignItems: "center",
		justifyContent: "center",
		padding: 18,
	},
	card: {
		width: "100%",
		maxWidth: 460,
		borderRadius: 30,
		padding: 26,
		backgroundColor: colors.paperLift,
		borderWidth: 1,
		borderColor: colors.cardLineStrong,
		shadowColor: "#000",
		shadowOpacity: 0.16,
		shadowRadius: 24,
		shadowOffset: { width: 0, height: 16 },
		elevation: 12,
	},
	title: {
		fontSize: 30,
		lineHeight: 34,
		color: colors.text,
		fontFamily: typography.display,
		marginBottom: 12,
	},
	message: {
		fontSize: 16,
		lineHeight: 26,
		color: colors.muted,
		marginBottom: 20,
		fontFamily: typography.body,
	},
	actions: {
		gap: 10,
	},
});
