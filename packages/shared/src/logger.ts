export type Logger = {
  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
};

export function createLogger(scope: string): Logger {
  return {
    info(message) {
      console.log(`[${scope}] ${message}`);
    },
    warn(message) {
      console.warn(`[${scope}] ${message}`);
    },
    error(message) {
      console.error(`[${scope}] ${message}`);
    },
  };
}

