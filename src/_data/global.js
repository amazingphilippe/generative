module.exports = {
  random() {
    const segment = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return `${segment()}-${segment()}-${segment()}`;
  },
  seed() {
    return Math.random();
  },
  bustInProduction() {
    const segment = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return process.env.NODE_ENV === "production" ? `${segment()}-${segment()}-${segment()}` : "";
  }
};
