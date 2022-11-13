import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  Text,
  Card,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { IsError } from "../../data/Types";
import { HttpGet, HttpPost } from "../../services/HttpService";

export type GuestbookEntry = {
  name: string;
  message: string;
};

export function GuestbookComponent() {
  const [messages, setMessages] = useState<GuestbookEntry[]>([]);

  const form = useForm({
    initialValues: {
      name: "",
      message: "",
    },
  });

  const submitHandler = async (entry: GuestbookEntry) => {
    await HttpPost<string>("api/guestbook/sign", entry);
    await getEntries();
  };

  const getEntries = async () => {
    const response =
      (await HttpGet<GuestbookEntry[]>("api/guestbook/get")) ?? [];

    if (IsError(response)) return;
    setMessages(response);
  };

  useEffect(() => {
    getEntries();
  }, []);

  const renderMessages = () => {
    return messages.map((m, i) => (
      <Card key={i} withBorder>
        <Text>
          {m.name}
          {": "}
          {m.message}
        </Text>
      </Card>
    ));
  };

  return (
    <>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <Text>
          Welcome to the guestbook. Feel free to write your name and leave a
          short message.
        </Text>
        <form onSubmit={form.onSubmit((values) => submitHandler(values))}>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="Enter Name"
            {...form.getInputProps("name")}
          />
          <TextInput
            withAsterisk
            label="Message"
            placeholder='Say, "hi!"'
            {...form.getInputProps("message")}
          />

          <Group position="right" mt="md">
            <Button mb="sm" type="submit">
              Submit
            </Button>
          </Group>
        </form>
        {renderMessages()}
      </Box>
    </>
  );
}
