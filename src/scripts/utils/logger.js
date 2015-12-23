/* eslint "no-console": 0 */

const logger = {
  info: (...args) => {
    console.log(...args);
  },
  trace: (...args) => {
    console.log(...args);
  },
  debug: (...args) => {
    console.log(...args);
  },
  warn: (...args) => {
    console.warn(...args);
  },
  error: (...args) => {
    console.error(...args);
  },
};

export default logger;
