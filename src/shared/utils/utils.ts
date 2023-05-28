export const getShortDateFormat = (date: string) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  } as Intl.DateTimeFormatOptions;

  return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
};
