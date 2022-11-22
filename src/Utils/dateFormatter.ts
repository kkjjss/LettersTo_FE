type DateFormat = 'yyyy.mm.dd';

export const dateFormatter = (format: DateFormat, ISO: Date) => {
  const year = new Date(ISO).getFullYear();
  const month = new Date(ISO).getMonth() + 1;
  const date = new Date(ISO).getDate();

  if (format === 'yyyy.mm.dd') {
    return `${year}.${month}.${date}`;
  }
};
