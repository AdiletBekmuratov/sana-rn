import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import i18n from "@/utils/i18n";
import FriendsRating from "@/screens/FriendsRating";
import Rating from "@/screens/Rating";
import tw from "twrnc";

const Tab = createMaterialTopTabNavigator();

export default function TopBarRatingStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: "#002C67",
        },
        tabBarStyle: tw`bg-gray-100`,
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: i18n.t("Rating.globalRating"),
        }}
        name="GlobalRating"
        component={Rating}
      />
      <Tab.Screen
        options={{
          tabBarLabel: i18n.t("Rating.friendsRating"),
        }}
        name="FriendsRating"
        component={FriendsRating}
      />
    </Tab.Navigator>
  );
}
