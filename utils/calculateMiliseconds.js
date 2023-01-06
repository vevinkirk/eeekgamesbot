const calculateMilliseconds = (value, unit) => {
  switch (unit) {
    case "seconds":
      return value * 1000;
    case "minutes":
      return value * 60000;
    case "hours":
      return value * 3600000;
    case "days":
      return value * 86400000;
    case "weeks":
      return value * 604800000;
    default:
      return 0;
  }
};

module.exports = {
  calculateMilliseconds
}