export const dateStrip = (str) => {
  // '2024-02-27T06:00:00.000Z' strip off T -> end
  // the input cannot read the date w/ the time
  if (str) {
    return str?.slice(0, str.indexOf('T'));
  } else return str;
};
