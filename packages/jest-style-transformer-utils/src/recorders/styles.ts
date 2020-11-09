let styles: string = '';

export const reset = (): void => {
  styles = '';
};

export const set = (style: string): void => {
  styles += style;
};

export const get = (): string => styles;
