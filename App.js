import { useFonts } from "expo-font";
import {
	InstrumentSerif_400Regular,
	InstrumentSerif_400Regular_Italic,
} from "@expo-google-fonts/instrument-serif";
import {
	Manrope_400Regular,
	Manrope_500Medium,
	Manrope_600SemiBold,
	Manrope_700Bold,
	Manrope_800ExtraBold,
} from "@expo-google-fonts/manrope";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Home from "./src/Screens/Home";
import Scramble from "./src/Screens/Scramble";
import Learn from "./src/Screens/Learn";
import { colors, typography } from "./src/Constants";

const Stack = createNativeStackNavigator();
const navTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: colors.canvas,
		card: colors.paper,
		text: colors.text,
		border: "rgba(8, 17, 31, 0.08)",
		primary: colors.accent,
	},
};

export default function App() {
	const [fontsLoaded] = useFonts({
		InstrumentSerif_400Regular,
		InstrumentSerif_400Regular_Italic,
		Manrope_400Regular,
		Manrope_500Medium,
		Manrope_600SemiBold,
		Manrope_700Bold,
		Manrope_800ExtraBold,
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<SafeAreaProvider>
			<NavigationContainer theme={navTheme}>
				<Stack.Navigator
					initialRouteName="Home"
					screenOptions={{
						headerShadowVisible: false,
						headerBackTitleVisible: false,
						headerStyle: {
							backgroundColor: colors.paper,
						},
						headerTintColor: colors.text,
						headerTitleStyle: {
							fontFamily: typography.display,
							fontSize: 24,
							color: colors.text,
						},
						contentStyle: {
							backgroundColor: colors.canvas,
						},
					}}
				>
					<Stack.Screen
						name="Home"
						component={Home}
						options={{
							title: "GRE Scramble",
						}}
					/>
					<Stack.Screen
						name="Scramble"
						component={Scramble}
						options={{
							title: "Scramble Lab",
						}}
					/>
					<Stack.Screen
						name="Learn"
						component={Learn}
						options={{
							title: "Learn Deck",
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}
