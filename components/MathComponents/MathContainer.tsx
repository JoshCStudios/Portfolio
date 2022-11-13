import { Button, Group, Select, Text } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { useState } from "react";
import { AreaOfRectangle } from "./AreaOfRectangle";
import { AreaOfTrapezoid } from "./AreaOfTrapezoid";

export function MathContainer() {
  const [activeFormula, setActiveFormula] = useInputState("");

  const displayFormula = () => {
    switch (activeFormula) {
      case "AreaOfTrapezoid":
        return <AreaOfTrapezoid />;
      case "AreaOfRectangle":
        return <AreaOfRectangle />;
        break;
    }
  };

  return (
    <Group mt="sm" position="center">
      <Select
        value={activeFormula}
        onChange={setActiveFormula}
        label="Choose a shape to calculate area"
        placeholder="Pick one"
        data={[
          { value: "AreaOfTrapezoid", label: "Trapezoid" },
          { value: "AreaOfRectangle", label: "Rectangle" },
        ]}
      />
      {displayFormula()}
    </Group>
  );
}
