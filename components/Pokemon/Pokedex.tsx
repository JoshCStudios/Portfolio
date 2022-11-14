import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  Text,
  Card,
  Image,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useInputState } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { IsError } from "../../data/Types";
import { HttpGet, HttpPost } from "../../services/HttpService";

export type Sprite = {
  front_default: string;
  front_shiny: string;
};

export type Pokemon = {
  name: string;
  id: string;
  sprites: Sprite;
};

export function Pokedex() {
  const [pokemonName, setPokemonName] = useInputState("");
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | undefined>();
  const [checked, setChecked] = useState(false);

  const getPokemon = async () => {
    const response = await HttpGet<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    console.log(response);

    if (IsError(response)) return;
    setCurrentPokemon(response);
    //setMessages(response);
  };

  const displaySprite = () => {
    if (!checked)
      return <Image width={150} src={currentPokemon?.sprites.front_default} />;
    return <Image width={150} src={currentPokemon?.sprites.front_shiny} />;
  };

  return (
    <>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <Text>Welcome to the Pokedex. Search for a pokemon to fetch data.</Text>
        <Card withBorder>
          <Text>Pokemon name: {currentPokemon?.name}</Text>
          <Text>Pokemon number: {currentPokemon?.id}</Text>
          {displaySprite()}
        </Card>
        <TextInput
          mb="sm"
          value={pokemonName}
          onChange={setPokemonName}
          withAsterisk
          label="Name"
          placeholder="Enter Pokemon"
        />
        <Checkbox
          label="Shiny"
          checked={checked}
          onChange={(event) => setChecked(event.currentTarget.checked)}
        />
        <Group position="right" mt="md">
          <Button onClick={getPokemon}>Search</Button>
        </Group>
      </Box>
    </>
  );
}
