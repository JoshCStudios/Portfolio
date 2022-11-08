// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { GuestbookEntry } from "../../../components/Guestbook/GuestbookComponent";
import { IsError } from "../../../data/Types";
import { GetItem, Put } from "../../../services/DynamoDBService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GuestbookEntry[]>
) {
  const messages = (await GetItem<GuestbookEntry[]>("messages")) ?? [];

  if (IsError(messages)) return res.status(500);

  res.status(200).json(messages);
}
