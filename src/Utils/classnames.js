export const cx = (...args) => {
  const classes = [];

  for (const value of args) {
    let type = typeof value;

    if (type === "string") classes.push(value);
    else if (type === "object") {
      for (let key in value) {
        if (value[key]) classes.push(key);
      }
    }
  }

  return classes.join(" ");
};
