import { Grid, Title } from "@mantine/core";
import Head from "next/head";
import Image from "next/image";
import { HeaderComponent } from "../components/Header";
import { NavbarNested } from "../components/SideBar";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <HeaderComponent />
      <Grid columns={12}>
        <Grid.Col span={3}>
          <NavbarNested />
        </Grid.Col>
        <Grid.Col span={9}>
          <Title>Hello World</Title>
        </Grid.Col>
      </Grid>
    </>
  );
}
