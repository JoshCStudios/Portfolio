import { IError } from "../data/Types";
import { Err, TrimString } from "./Utils";

type IHttpGet = <T>(uri: string | undefined) => Promise<T | IError | undefined>;
type IHttpPost = <T>(
  uri: string | undefined,
  data: object | string | undefined
) => Promise<T | IError | undefined>;

export const HttpGet: IHttpGet = async <T>(uri: string | undefined) => {
  const trimmedUri = TrimString(uri);

  if (!trimmedUri) {
    return Err("Must provide a URI to GET");
  }

  const response = await fetch(`${trimmedUri}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await extractFromResponse<T>(trimmedUri, response);
};

export const HttpPost: IHttpPost = async <T>(
  uri: string | undefined,
  data: object | string | undefined
) => {
  const trimmedUri = TrimString(uri);

  if (!trimmedUri || !data) {
    return Err("Must provide both a URI and Data to POST");
  }

  try {
    const response = await fetch(`${trimmedUri}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: typeof data === "string" ? data : JSON.stringify(data),
    });

    return await extractFromResponse<T>(trimmedUri, response);
  } catch {
    return Err("Invalid URL provided");
  }
};

const extractFromResponse = async <T>(uri: string, response: Response) => {
  try {
    const responseJson = await response.json();

    if (!responseJson) return Err(`Error retrieving POST response from ${uri}`);

    return <T>responseJson;
  } catch {
    try {
      const responseText = await response.text();

      if (!responseText)
        return Err(`Error retrieving POST response from ${uri}`);

      return <T>responseText;
    } catch {
      return;
    }
  }
};
