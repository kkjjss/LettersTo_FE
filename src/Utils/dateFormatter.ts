type DateFormat = 'yyyy.mm.dd';

export const dateFormatter = (format: DateFormat, ISO: Date) => {
  const year = new Date(ISO).getFullYear();
  const month = new Date(ISO).getMonth() + 1;
  const date = new Date(ISO).getDate();

  if (format === 'yyyy.mm.dd') {
    return `${year}.${month}.${date}`;
  }
};

export const subDate = (x: Date, y: Date) => {
  const millisecond = x.getTime() - y.getTime();
  const days = Math.floor(millisecond / 1000 / 60 / 60 / 24);
  const hours = Math.floor((millisecond / 1000 / 60 / 60) % 24);
  const minutes = Math.floor((millisecond / 1000 / 60) % 24);

  return {days, hours, minutes};
};
