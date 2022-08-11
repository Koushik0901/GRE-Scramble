import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/Screens/Home";
import Scramble from "./src/Screens/Scramble";
import Learn from "./src/Screens/Learn";
import { colors } from "./src/Constants";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen
					name="Home"
					component={Home}
					options={{
						title: "Home",
						headerTitleStyle: {
							fontWeight: "bold",
							fontSize: 24,
							height: 50,
							color: colors.primary,
						},
					}}
				/>
				<Stack.Screen
					name="Scramble"
					component={Scramble}
					options={{
						title: "Scramble",
						headerTitleStyle: {
							fontWeight: "bold",
							fontSize: 24,
							height: 50,
							color: colors.primary,
						},
					}}
				/>
				<Stack.Screen
					name="Learn"
					component={Learn}
					options={{
						title: "Learn",
						headerTitleStyle: {
							fontWeight: "bold",
							fontSize: 24,
							height: 50,
							color: colors.primary,
						},
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
