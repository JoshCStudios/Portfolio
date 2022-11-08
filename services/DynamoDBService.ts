import {
  DynamoDBClient,
  GetItemCommand,
  GetItemCommandOutput,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import { IsEntity, IsError } from "../data/Types";
import { Err, TrimString } from "./Utils";

const retrieveDynamoDBSecrets = () => {
  const endpoint = process.env.DYNAMODB_ENDPOINT;
  const accessKeyId = process.env.DYNAMODB_ACCESS_KEY;
  const secretAccessKey = process.env.DYNAMODB_SECRET_KEY;
  const region = process.env.DYNAMODB_REGION;
  const tableName = process.env.DYNAMODB_TABLE_NAME;

  if (!accessKeyId || !secretAccessKey || !region || !tableName)
    return Err("Error retrieving secrets");

  return endpoint
    ? {
        accessKeyId,
        secretAccessKey,
        region,
        tableName,
        endpoint: endpoint,
      }
    : {
        accessKeyId,
        secretAccessKey,
        region,
        tableName,
      };
};

export const SaveEntity = async <T>(item: T | undefined) => {
  if (!item || !IsEntity(item)) {
    return Err("Attempt to save invalid entity");
  }

  const trimmedId = TrimString(item.id);

  if (!trimmedId) {
    return;
  }

  return await Put(trimmedId, item);
};

export const SaveItem = async <T>(
  id: string | undefined,
  item: T | undefined
) => {
  const trimmedId = TrimString(id);

  if (!trimmedId || !item) {
    return Err("Attempted to save item without id");
  }

  return await Put(trimmedId, item);
};

export const Put = async <T>(id: string, item: T) => {
  const secrets = retrieveDynamoDBSecrets();

  if (IsError(secrets)) return secrets;

  try {
    await dynamoDBClient.send(
      new PutItemCommand({
        TableName: secrets.tableName,
        Item: {
          id: { S: id },
          content: { S: JSON.stringify(item) },
        },
      })
    );
  } catch {
    return Err(`Error putting item to DynamoDB with ID: ${id}`);
  }

  return item;
};

export const GetItem = async <T>(id: string | undefined) => {
  const trimmedId = TrimString(id);

  if (!trimmedId) {
    return Err("Attempt to get item from DynamoDB without providing ID");
  }

  const secrets = retrieveDynamoDBSecrets();

  if (IsError(secrets)) return secrets;

  let result: GetItemCommandOutput | undefined;

  try {
    result = await dynamoDBClient.send(
      new GetItemCommand({
        TableName: secrets.tableName,
        Key: {
          id: { S: trimmedId },
        },
      })
    );
  } catch (e) {
    console.error(e);

    return Err(`Error getting item from DynamoDB with ID: ${id}`);
  }

  if (result?.Item?.content?.S === undefined) {
    return;
  }

  const returnValue: T = JSON.parse(result.Item.content.S);

  return returnValue;
};

const dynamoDBClient = new DynamoDBClient(retrieveDynamoDBSecrets());
