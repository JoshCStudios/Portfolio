import { Group, Header, Text, UnstyledButton } from "@mantine/core";
import Image from "next/image";
import logo from "../assets/logo.png";

export function HeaderComponent() {
  return (
    <Header height={60}>
      <Group position="apart" sx={{ height: "100%" }}>
        <Image height={40} width={100} src={logo} />
      </Group>
    </Header>
  );
}
