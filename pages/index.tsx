import { Grid, Title } from "@mantine/core";
import Head from "next/head";
import Image from "next/image";
import { HeaderComponent } from "../components/Header";
import { NavbarNested } from "../components/SideBar";
import styles from "../styles/Home.module.css";

export default function Home() {
  // keyID: AKIAZHG36V2266VWI3V4
  // eltZJlECg1ZdWm1vNLyvKK+WU4wI28yPPXrYFUb8
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
