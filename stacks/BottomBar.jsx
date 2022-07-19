import MaterialCommunity from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getHeaderTitle } from "@react-navigation/elements";
import Header from "../components/Header";
import i18n from "../i18n";
import MainStack from "./MainStack";
import ProfileStack from "./ProfileStack";
import TopBarRatingStack from "./TopBarRatingStack";

const Tab = createBottomTabNavigator();

export default function BottomBar() {
  return (
    <Tab.Navigator
      screenOptions={{
				tabBarHideOnKeyboard: true,
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
          title: i18n.t("BottomBar.main_page"),
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
          title: i18n.t("BottomBar.rating"),
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = focused ? "trophy" : "trophy-outline";

            return (
              <MaterialCommunity name={iconName} size={size} color={color} />
            );
          },
          tabBarActiveTintColor: "#002C67",
          tabBarInactiveTintColor: "gray",
        }}
        component={TopBarRatingStack}
      />
      <Tab.Screen
        name="ProfileTab"
        options={{
          title: i18n.t("BottomBar.profile"),
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
