export function isSameUTCDate(date1, date2, timeZone = 'Asia/Karachi') {
  const formatOptions = { timeZone, year: 'numeric', month: 'numeric', day: 'numeric' };

  const d1 = date1.toLocaleDateString('en-CA', formatOptions);
  const d2 = date2.toLocaleDateString('en-CA', formatOptions);

  return d1 === d2;
}
