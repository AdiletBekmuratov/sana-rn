import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Header from "@/components/Header";
import { getHeaderTitle } from "@react-navigation/elements";
import i18n from "@/utils/i18n";
import { Profile, ChangeProfile } from "@/screens/Profile";
import RatingScreen from "@/screens/Rating/RatingScreen";
import TopBarRatingStack from "./TopBarRatingStack";

const Stack = createNativeStackNavigator();

const RatingStack = () => {
  return (
    <Stack.Navigator
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
      <Stack.Screen
        options={{
          headerShown: false,
          title: i18n.t("Rating.globalRating"),
        }}
        name="RatingScreen"
        component={RatingScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          title: i18n.t("Rating.globalRating"),
        }}
        name="TopBarRatingStack"
        component={TopBarRatingStack}
      />
    </Stack.Navigator>
  );
};

export default RatingStack;
