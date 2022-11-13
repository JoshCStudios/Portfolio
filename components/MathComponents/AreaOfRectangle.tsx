import { Button, Card, Group, NumberInput, Text, Title } from "@mantine/core";
import { valueGetters } from "@mantine/core/lib/Box/style-system-props/value-getters/value-getters";
import { DefaultValue } from "@mantine/core/lib/MultiSelect/DefaultValue/DefaultValue";
import { useInputState } from "@mantine/hooks";
import { useState } from "react";

export function AreaOfRectangle() {
  const [length, setLength] = useInputState(0);
  const [width, setWidth] = useInputState(0);

  const areaOfRectangle = (length: number, width: number) => {
    const area = length * width;
    return area;
  };

  return (
    <>
      <Card withBorder shadow={"xs"}>
        <Title>Area of a Rectangle</Title>
        <Group position="center">
          <Text>Area: {areaOfRectangle(length, width)}</Text>
        </Group>

        <NumberInput
          value={length}
          onChange={setLength}
          label="Length"
          radius="xs"
          size="md"
        />

        <NumberInput
          value={width}
          onChange={setWidth}
          label="Width"
          radius="xs"
          size="md"
        />
      </Card>
    </>
  );
}
