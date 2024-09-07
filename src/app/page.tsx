'use client'
import * as React from 'react';
import { Button, Input, Stack, Sheet } from "@mui/joy";
import Header from '@/components/header';
import Footer from '@/components/footer';
import SearchIcon from '@mui/icons-material/Search';

export default function Home() {
  return (
    <Sheet
      sx={{
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#080909'
      }}
    >
      <Header />


      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          alert(JSON.stringify(formJson));
        }}
      >
        <Stack
          spacing={1}
          direction="row"
          alignItems="center"
          width='75vw'
        >
          <Input variant='outlined' name="q" placeholder="What do you want to search for?" required fullWidth />
          <Button type="submit"><SearchIcon /></Button>
        </Stack>
      </form>


      <Footer />
    </Sheet>
  );
}
