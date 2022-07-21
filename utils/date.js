import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";

require("dayjs/locale/kk");
var isToday = require("dayjs/plugin/isToday");
var weekday = require("dayjs/plugin/weekday");

dayjs.extend(weekday);
dayjs.extend(isToday);
dayjs.locale("kk");

export const getCurrentWeek = async () => {
  let currentDate = dayjs().weekday(0);
  let weekStart = currentDate.startOf();

  const entryDaysString = await AsyncStorage.getItem("entryDays");
  const entryDays = entryDaysString != null ? JSON.parse(entryDaysString) : [];
  let days = [];

  console.log("ED Str >>", entryDaysString);
  console.log("ED >>", entryDays);

  for (let i = 0; i <= 6; i++) {
    let entered = false;
    for (let index = 0; index < entryDays.length; index++) {
      const element = entryDays[index];
      entered = dayjs(weekStart).add(i, "days").isSame(element, "day");
      if (entered) {
        break;
      }
    }
    days.push({
      date: dayjs(weekStart).add(i, "days").format("MMMM DD, dddd"),
      isToday: dayjs(weekStart).add(i, "days").isToday(),
      dayNum: dayjs(weekStart).add(i, "days").format("DD"),
      minWeekName: dayjs(weekStart).add(i, "days").format("dd"),
      entered: entered,
    });
  }
  let dateData = {
    currentMonth: dayjs().format("MMMM"),
    currentWeekDays: days,
  };

  return dateData;
};

export const setEntered = async () => {
  if (dayjs().day(1).isToday()) {
    console.log("Clearing local entryDays");
    await AsyncStorage.removeItem("entryDays");
  }
  const entryDaysString = await AsyncStorage.getItem("entryDays");
  const entryDays = entryDaysString != null ? JSON.parse(entryDaysString) : [];

  // console.log("ED Str >>", entryDaysString);
  // console.log("ED >>", entryDays);

  let isAdded = false;

  for (let index = 0; index < entryDays.length; index++) {
    const element = entryDays[index];
    if (dayjs().isSame(element, "day")) {
      isAdded = true;
    }
  }

  if (isAdded) {
    return;
  }

  entryDays.push(dayjs().format("YYYY-MM-DD"));
  // console.log("ED after push >>", entryDays);
  await AsyncStorage.setItem("entryDays", JSON.stringify(entryDays));
};
