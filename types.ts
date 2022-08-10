export type ComponentWithChildren<T> = T & {
  children: React.ReactNode | React.ReactNode[];
};
