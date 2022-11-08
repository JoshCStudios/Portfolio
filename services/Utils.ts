import { IError, IsNamed } from "../data/Types";

export const TrimString = (str: string | undefined) => {
  if (!str) return;

  const trimmedString = str.trim();

  if (!trimmedString) return;

  return trimmedString;
};

export const LowerString = (str: string | undefined) => {
  return TrimString(str)?.toLowerCase();
};

export const Sort =
  <T>(key: keyof T, reverse?: boolean) =>
  (a: T, b: T) => {
    const paramA: any = a[key];
    const paramB: any = b[key];

    switch (typeof paramA) {
      case "boolean":
        return reverse ? (paramB === true ? 1 : 0) : paramA === true ? 1 : 0;
      case "number":
        return reverse ? (paramB > paramA ? 1 : -1) : paramA > paramB ? 1 : -1;
      case "string":
        return reverse
          ? paramB.localeCompare(paramA)
          : paramA.localeCompare(paramB);
      default:
        break;
    }

    if (IsNamed(paramA) && IsNamed(paramB)) {
      let nameA = paramA.name;
      let nameB = paramB.name;

      return reverse ? nameB.localeCompare(nameA) : nameA.localeCompare(nameB);
    }

    return reverse ? -1 : 1;
  };

export const SortData = <T>(
  data: T[] | undefined,
  key: keyof T,
  reverse?: boolean
) => {
  if (!data) {
    return [];
  }

  return data.sort(Sort(key, reverse));
};

export const Err: (message: string) => IError = (message: string) => {
  console.error(message);

  return { error: message };
};
