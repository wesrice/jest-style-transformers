type Tokens = Record<string, string>;

let tokens: Tokens = {};

export const reset = (): void => {
  tokens = {};
};

export const set = (t: Tokens): void => {
  tokens = t;
};

export const get = (): Tokens => tokens;
