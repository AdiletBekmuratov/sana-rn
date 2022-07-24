import i18n from "@/utils/i18n";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, { FC, Ref, useCallback, useMemo } from "react";
import { FlatList, ScrollView } from "react-native";
import { RadioButton, Text } from "react-native-paper";
import tw from "twrnc";

interface IFilterModal {
  handleClosePress: () => void;
  sheetRef?: Ref<BottomSheetModalMethods>;
  onValueChange: (value: string) => void;
  lesson: string;
  allLessons: any;
}

export const FilterModal: FC<IFilterModal> = ({
  sheetRef,
  allLessons,
  lesson,
  onValueChange,
}) => {
  const snapPoints = useMemo(() => ["50%", "80%"], []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      detached
      index={0}
      ref={sheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetScrollView style={tw`p-4 flex-1`}>
        <Text style={tw`text-lg text-center`}>Фильтр</Text>
        <RadioButton.Group onValueChange={onValueChange} value={lesson}>
          <RadioButton.Item
            label={i18n.t("Rating.allLessons")}
            position="leading"
            value=""
          />
          <ScrollView contentContainerStyle={tw`flex-grow`} horizontal={true}>
            <FlatList
              contentContainerStyle={tw`pb-5`}
              data={allLessons}
              renderItem={({ item }) => (
                <RadioButton.Item
                  label={item.name}
                  position="leading"
                  value={item.id}
                />
              )}
            />
          </ScrollView>
        </RadioButton.Group>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};
