import MaterialCommunity from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getHeaderTitle } from "@react-navigation/elements";
import Header from "../components/Header";
import Rating from "../screens/Rating";
import ProfileStack from "./ProfileStack";
import MainStack from "./MainStack";

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
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = focused ? "home" : "home-outline";

            return (
              <MaterialCommunity name={iconName} size={size} color={color} />
            );
          },
          tabBarActiveTintColor: "#002C67",
          tabBarInactiveTintColor: "gray",
        }}
        component={MainStack}
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
