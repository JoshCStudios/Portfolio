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
import { upperFirst, useInputState } from "@mantine/hooks";
import { FormEvent, useEffect, useState } from "react";
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

  const getPokemon = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const response = await HttpGet<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
    );
    console.log(response);

    if (IsError(response)) return;
    setCurrentPokemon(response);
  };

  const displaySprite = () => {
    if (!checked)
      return <Image width={150} src={currentPokemon?.sprites.front_default} />;
    return <Image width={150} src={currentPokemon?.sprites.front_shiny} />;
  };

  const displayCard = () => {
    if (currentPokemon === undefined) return;
    return (
      <Card withBorder>
        <Text>Pokemon name: {upperFirst(currentPokemon?.name)}</Text>
        <Text>Pokemon number: {currentPokemon?.id}</Text>
        {displaySprite()}
      </Card>
    );
  };

  return (
    <>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <Text>Welcome to the Pokedex. Search for a pokemon to fetch data.</Text>
        {displayCard()}
        <form onSubmit={(e) => getPokemon(e)}>
          <TextInput
            mb="sm"
            value={pokemonName}
            onChange={setPokemonName}
            placeholder="Enter Pokemon"
          />
          <Checkbox
            label="Shiny"
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
          />
          <Group position="right" mt="md">
            <Button type="submit">Search</Button>
          </Group>
        </form>
      </Box>
    </>
  );
}
