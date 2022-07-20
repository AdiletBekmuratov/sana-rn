import dayjs from "dayjs";

require("dayjs/locale/kk");

dayjs.locale("kk");

export const getCurrentWeek = () => {
  let currentDate = dayjs().day(1);

  let weekStart = currentDate.startOf();

  let days = [];

  for (let i = 0; i <= 6; i++) {
    days.push(dayjs(weekStart).add(i, "days").format("MMMM DD, dddd"));
  }
  console.log(days);

  return days;
};

export const getCurrentWeekDaysNumbers = () => {
  let currentDate = dayjs().day(1);

  let weekStart = currentDate.startOf();

  let days = [];

  for (let i = 0; i <= 6; i++) {
    days.push(dayjs(weekStart).add(i, "days").format("DD"));
  }

  return days;
};

export const getMinWeekNames = () => {
  let currentDate = dayjs().day(1);

  let weekStart = currentDate.startOf();

  let days = [];

  for (let i = 0; i <= 6; i++) {
    days.push(dayjs(weekStart).add(i, "days").format("dd"));
  }

  return days;
};

export const getCurrentMonthName = () => {
  let currentMonth = dayjs().format("MMMM");
  return currentMonth;
};
