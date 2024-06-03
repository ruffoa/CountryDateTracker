import { sub, add, isAfter, isBefore, differenceInCalendarDays } from "date-fns";

import { Trip } from "../types/country";

export function calculateDateWindow(trips: Array<Trip>, windowSize: number, daysPerWindow: number) {
  const windowStartDate = sub(new Date(), { days: windowSize });

  let daysInCountry = 0;

  trips.filter((trip) => isInsideWindow(trip, windowStartDate)).forEach((trip) => {
    if (isAfter(trip.startDate, windowStartDate)) {
      daysInCountry += differenceInCalendarDays(trip.endDate, trip.startDate) + 1; // Add 1 for the starting date
    } else {
      daysInCountry += differenceInCalendarDays(trip.endDate, windowStartDate) + 1; // Add 1 for the starting date
    }
  });

  return daysInCountry;
}

export function isInsideWindow(trip: Trip, startDate: Date) {
  return (isAfter(trip.endDate, startDate));
}