// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { GuestbookEntry } from "../../../components/Guestbook/GuestbookComponent";
import { IsError } from "../../../data/Types";
import { GetItem, Put } from "../../../services/DynamoDBService";

type Data = {
  status: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const name = req.body.name;
  const message = req.body.message;

  if (!name) {
    return res.status(400).json({ status: "name is required" });
  }
  if (!message) {
    return res.status(400).json({ status: "message is required" });
  }

  const messages = (await GetItem<GuestbookEntry[]>("messages")) ?? [];

  if (IsError(messages)) return res.status(500);

  await Put("messages", [...messages, { name: name, message: message }]);

  res.status(200).json({ status: "Success" });
}
