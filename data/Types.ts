export type Map<T> = {
  [key: string]: T;
};

export type Named = {
  name: string;
};

export type IError = {
  error: string;
};

export type Entity = {
  id: string;
};

export const IsError = <T>(entity: any): entity is IError =>
  entity?.error !== undefined;

export const IsNamed = (entity: any): entity is Named =>
  entity?.name !== undefined;

export const IsEntity = (entity: any): entity is Entity =>
  entity?.id !== undefined;
