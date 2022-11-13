import { Button, Card, Group, NumberInput, Text, Title } from "@mantine/core";
import { valueGetters } from "@mantine/core/lib/Box/style-system-props/value-getters/value-getters";
import { DefaultValue } from "@mantine/core/lib/MultiSelect/DefaultValue/DefaultValue";
import { useInputState } from "@mantine/hooks";
import { useState } from "react";

export function AreaOfTrapezoid() {
  const [b1, setB1] = useInputState(0);
  const [b2, setB2] = useInputState(0);
  const [h, setH] = useInputState(0);

  const areaOfTrapezoid = (base1: number, base2: number, height: number) => {
    const area = 0.5 * (base1 + base2) * height;
    return area;
  };

  return (
    <>
      <Card withBorder shadow={"xs"}>
        <Title>Area of a Trapezoid</Title>
        <Group position="center">
          <Text>Area: {areaOfTrapezoid(b1, b2, h)}</Text>
        </Group>

        <NumberInput
          value={b1}
          onChange={setB1}
          label="Base 1"
          radius="xs"
          size="md"
        />
        <NumberInput
          value={b2}
          onChange={setB2}
          label="Base 2"
          radius="xs"
          size="md"
        />
        <NumberInput
          value={h}
          onChange={setH}
          label="Height"
          radius="xs"
          size="md"
        />
      </Card>
    </>
  );
}
