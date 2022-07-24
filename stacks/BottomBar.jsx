import Header from "@/components/Header";
import i18n from "@/utils/i18n";
import MaterialCommunity from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getHeaderTitle } from "@react-navigation/elements";
import MainStack from "./MainStack";
import ProfileStack from "./ProfileStack";
import RatingStack from "./RatingStack";

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
            let iconName = focused ? "book" : "book-outline";

            return (
              <MaterialCommunity name={iconName} size={size} color={color} />
            );
          },
          tabBarActiveTintColor: "#52AEF3",
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
          tabBarActiveTintColor: "#52AEF3",
          tabBarInactiveTintColor: "gray",
        }}
        component={RatingStack}
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
          tabBarActiveTintColor: "#52AEF3",
          tabBarInactiveTintColor: "gray",
        }}
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
}
