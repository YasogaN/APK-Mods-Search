'use client'
import * as React from 'react';
import { Button, Input, Stack, Sheet, Typography } from "@mui/joy";
import Header from '@/components/header';
import Footer from '@/components/footer';
import SearchIcon from '@mui/icons-material/Search';
import ResultCard from '@/components/card';

export default function Home() {
  const [pagenum, setPagenum] = React.useState(0);
  const [querySent, setQuerySent] = React.useState(false);
  const [results, setResults] = React.useState<{ site: string; title: string; description: string; link: string; imageUrl: string; }[]>([]);
  const [query, setQuery] = React.useState<string>('');
  const [csetok, setCsetok] = React.useState<string>('');

  React.useEffect(() => {
    async function fetchScript() {
      try {
        const response = await fetch('https://corsproxy.io/?https://cse.google.com/cse.js?cx=752437097efb4468f');
        const scriptText = await response.text();
        const tokenMatch = scriptText.match(/"cse_token"\s*:\s*"([^"]+)"/);
        if (tokenMatch && tokenMatch[1]) {
          setCsetok(tokenMatch[1]);
        } else {
          console.error('cse_token not found.');
        }
      } catch (error) {
        console.error('Error fetching the script:', error);
      }
    }
    fetchScript();
  }, []);

  React.useEffect(() => {
    if (querySent) {
      fetchResults();
    }
  }, [pagenum, querySent]);

  const fetchResults = () => {
    fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, pagenum, cse_tok: csetok }),
    })
      .then(response => response.json())
      .then(data => {
        setResults(data || []);
        setQuerySent(data.length > 0); // Set querySent based on results
      })
      .catch(error => {
        alert(error);
        console.error(error);
      });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const query = formJson.q;
    console.log(query);
    setQuery(query);
    setResults([]);
    setPagenum(0);
    setQuerySent(true);
  };

  return (
    <Sheet
      sx={{
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#080909',
      }}
    >
      <Header />

      <form onSubmit={handleSubmit}>
        <Stack spacing={1} direction="row" alignItems="center" width='75vw'>
          <Input variant='outlined' name="q" placeholder="What do you want to search for?" required fullWidth />
          <Button type="submit"><SearchIcon /></Button>
        </Stack>
      </form>

      {querySent && results.length > 0 && (
        <Stack spacing={-3} direction="column" sx={{ marginTop: 2 }}>
          {results.map((result, index) => (
            <ResultCard key={index} {...result} />
          ))}
        </Stack>
      )}

      {querySent && (
        <Stack spacing={2} direction="row" sx={{ marginTop: 2 }}>
          <Button
            variant="outlined"
            onClick={() => {
              if (pagenum > 0) {
                setPagenum(pagenum - 1);
              }
            }}
            disabled={pagenum === 0}
          >
            Previous Page
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setPagenum(pagenum + 1);
            }}
          >
            Next Page
          </Button>
        </Stack>
      )}

      <Footer />
    </Sheet>
  );
}