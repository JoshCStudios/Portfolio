import { Group, Header, Text, UnstyledButton, Image } from "@mantine/core";
import logo from "../portfolio/assets/logo.png";

export function HeaderComponent() {
  return (
    <Header height={60}>
      <Group position="apart" sx={{ height: "100%" }}>
        <a
          href="https://joshcstudios.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <UnstyledButton></UnstyledButton>
        </a>
      </Group>
    </Header>
  );
}
