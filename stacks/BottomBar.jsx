import MaterialCommunity from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getHeaderTitle } from "@react-navigation/elements";
import AuthVerify from "../components/AuthVerify";
import Header from "../components/Header";
import Home from "../screens/Home";
import Rating from "../screens/Rating";
import ProfileStack from "./ProfileStack";

const Tab = createBottomTabNavigator();

export default function BottomBar() {
  return (
    <Tab.Navigator
      screenOptions={{
        header: ({ navigation, route, options, back }) => {
          const title = getHeaderTitle(options, route.name);

          return (
            <Header
              title={title}
              rightButton={back}
              routeName={route.name}
              navigation={navigation}
            />
          );
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        options={{
          title: "Басты бет",
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = focused ? "home" : "home-outline";

            return (
              <MaterialCommunity name={iconName} size={size} color={color} />
            );
          },
          tabBarActiveTintColor: "#002C67",
          tabBarInactiveTintColor: "gray",
        }}
        component={Home}
      />
      <Tab.Screen
        name="RatingTab"
        options={{
          title: "Рейтинг",
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = focused ? "trophy" : "trophy-outline";

            return (
              <MaterialCommunity name={iconName} size={size} color={color} />
            );
          },
          tabBarActiveTintColor: "#002C67",
          tabBarInactiveTintColor: "gray",
        }}
        component={Rating}
      />
      <Tab.Screen
        name="ProfileTab"
        options={{
          title: "Профиль",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = focused ? "person" : "person-outline";

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#002C67",
          tabBarInactiveTintColor: "gray",
        }}
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
}
