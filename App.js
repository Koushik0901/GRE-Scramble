import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Scramble from "./src/Screens/Scramble";
import Learn from "./src/Screens/Learn";

const Tab = createBottomTabNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator initialRouteName="Scramble">
				<Tab.Screen
					name="Scramble"
					component={Scramble}
					options={{
						headerTitle: "GRE Scramble",
						tabBarIcon: ({ color }) => (
							<MaterialCommunityIcons
								name="puzzle-outline"
								color={color}
								size={30}
							/>
						),
						tabBarStyle: {
							height: 70,
							padding: 8,
						},
						tabBarLabelStyle: {
							fontSize: 14,
							paddingBottom: 8,
						},
					}}
				/>
				<Tab.Screen
					name="Learn"
					component={Learn}
					options={{
						headerTitle: "Learn",
						tabBarLabel: "Learn",
						tabBarIcon: ({ color }) => (
							<MaterialCommunityIcons
								name="book-open-outline"
								color={color}
								size={30}
							/>
						),
						tabBarStyle: {
							height: 70,
							padding: 8,
						},
						tabBarLabelStyle: {
							fontSize: 14,
							paddingBottom: 8,
						},
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}
