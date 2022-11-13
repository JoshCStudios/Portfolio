import { Grid, Title } from "@mantine/core";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { GuestbookComponent } from "../components/Guestbook/GuestbookComponent";
import { HeaderComponent } from "../components/Header";
import { MathContainer } from "../components/MathComponents/MathContainer";
import { SideBar } from "../components/SideBar";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [activePage, setActivePage] = useState("Home");

  return (
    <>
      <HeaderComponent />
      <Grid columns={12}>
        <Grid.Col span={2}>
          <SideBar setActivePage={setActivePage} />
        </Grid.Col>
        <Grid.Col span={10}>
          {activePage === "Guestbook" && <GuestbookComponent />}
          {activePage === "Math Container" && <MathContainer />}
        </Grid.Col>
      </Grid>
    </>
  );
}
