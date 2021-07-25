import { differenceInDays } from 'date-fns';

export const getDifferenceInDaysFromDateAndCurrentDay = (date: Date): number =>
	differenceInDays(date, new Date());
