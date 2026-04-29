import { calculateDateWindow } from './dates';

const getDateForNDaysAgo = (n: number) => {
  const date = new Date();
  date.setDate(date.getDate() - n);

  return date;
}

describe('calculateDateWindow', () => {
  it('returns the 0 days, when run with an empty trip array', () => {
    const res = calculateDateWindow([], 0);
    expect(res).toBe(0);
  });

  it('returns the 0 days, when run with a period of 0', () => {
    const fourDaysAgo = getDateForNDaysAgo(4);
    const oneDayAgo = getDateForNDaysAgo(1);

    const res = calculateDateWindow([{ startDate: fourDaysAgo, endDate: oneDayAgo, name: 'test' }], 0);
    expect(res).toBe(0);
  });

  it('returns the number of days spent in the country within the window period for the base case', () => {
    const fourDaysAgo = getDateForNDaysAgo(4);
    const oneDayAgo = getDateForNDaysAgo(1);

    const res = calculateDateWindow([{ startDate: fourDaysAgo, endDate: oneDayAgo, name: 'test' }], 10);
    expect(res).toBe(4);
  });

  it('returns the number of days spent in the country within the window period for a more complex case', () => {
    const twelveDaysAgo = getDateForNDaysAgo(12);
    const eightDaysAgo = getDateForNDaysAgo(8);

    const fourDaysAgo = getDateForNDaysAgo(4);
    const oneDayAgo = getDateForNDaysAgo(1);

    const res = calculateDateWindow([{ startDate: fourDaysAgo, endDate: oneDayAgo, name: 'test' }, { startDate: twelveDaysAgo, endDate: eightDaysAgo, name: 'test' }], 10);
    expect(res).toBe(7);
  });
})
