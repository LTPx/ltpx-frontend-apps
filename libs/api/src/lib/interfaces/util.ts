type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PartialWithRequired<T, K extends keyof T> = Pick<T, K> & Partial<T>;
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
