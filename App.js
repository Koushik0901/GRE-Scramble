import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Home from "./src/Screens/Home";
import Scramble from "./src/Screens/Scramble";
import Learn from "./src/Screens/Learn";
import { colors } from "./src/Constants";

const Tab = createBottomTabNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator initialRouteName="Home">
				<Tab.Screen
					name="Home"
					component={Home}
					options={{
						headerTitle: "Home",
						tabBarIcon: ({ color }) => (
							<MaterialCommunityIcons
								name="home-outline"
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
						headerTitleStyle: {
							fontWeight: "bold",
							color: colors.primary,
						},
					}}
				/>
				<Tab.Screen
					name="Scramble"
					component={Scramble}
					options={{
						tabBarIcon: ({ color }) => (
							<MaterialCommunityIcons
								name="home-outline"
								color="white"
								size={30}
							/>
						),
						tabBarStyle: {
							height: 70,
							padding: 8,
							backgroundColor: "white",
						},
						tabBarLabelStyle: {
							fontSize: 14,
							paddingBottom: 8,
							color: "white",
						},
						headerTitle: "GRE Scramble",
						headerTitleStyle: {
							fontWeight: "bold",
							color: colors.primary,
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
						headerTitleStyle: {
							fontWeight: "bold",
							color: colors.primary,
						},
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}
