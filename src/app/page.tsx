'use client'
import * as React from 'react';
import { Button, Input, Stack, Sheet, Typography } from "@mui/joy";
import Header from '@/components/header';
import Footer from '@/components/footer';
import SearchIcon from '@mui/icons-material/Search';
import ResultCard from '@/components/card';
import { ArrowLeft } from '@mui/icons-material';

export default function Home() {
  const [pagenum, setPagenum] = React.useState(0);
  const [querySent, setQuerySent] = React.useState(false);
  const [results, setResults] = React.useState<{ site: string; title: string; description: string; link: string; imageUrl: string; }[]>([]);
  const [query, setQuery] = React.useState<string>('');
  const [csetok, setCsetok] = React.useState<string>('');

  React.useEffect(() => {
    async function fetchScript() {
      try {
        const response = await fetch('https://api.codetabs.com/v1/proxy/?quest=https://cse.google.com/cse.js?cx=752437097efb4468f');
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

  const fetchResults = async () => {
    const page = pagenum * 10;
    const response = await fetch(`https://corsproxy.io/?https://cse.google.com/cse/element/v1?rsz=filtered_cse&num=10&hl=en&start=${page}&cx=752437097efb4468f&q=${query}&safe=off&cse_tok=${csetok}&callback=google.search.cse.api19695`);
    const data = await response.text();
    const cleaned = await data
        .replace("/*O_o*/", "")
        .replace("google.search.cse.api19695(", "")
        .replace(/\);$/, "");
    const json = JSON.parse(cleaned);
    const results = json.results.map((result: any) => {
        return {
            site: result.visibleUrl,
            title: result.titleNoFormatting,
            description: result.contentNoFormatting,
            link: result.unescapedUrl,
            imageUrl: result.richSnippet?.cseThumbnail?.src ?? '',
        };
    });
    setResults(results || []);
    setQuerySent(results.length > 0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuerySent(false);
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const query = formJson.q;
    setQuery(query.toString());
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

      {!querySent && (
        <form onSubmit={handleSubmit}>
          <Stack spacing={1} direction="row" alignItems="center" width='75vw'>
            <Input variant='outlined' name="q" placeholder="What do you want to search for?" required fullWidth />
            <Button type="submit"><SearchIcon /></Button>
          </Stack>
        </form>
      )}

      {querySent && results.length > 0 && (
        <>
          <Button
            variant="soft"
            aria-label="Back to Search Button"
            onClick={() => {
              window.location.reload();
            }}
            sx={{
              marginTop: 2,
              color: 'white',
              backgroundColor: '#1c4020',
              '&:hover': {
                backgroundColor: '#1c3020',
              }
            }}
          >
            <ArrowLeft />Back to Search
          </Button>
          <Stack spacing={-3} direction="column" sx={{ marginTop: 2 }}>
            {results.map((result, index) => (
              <ResultCard key={index} {...result} />
            ))}
          </Stack>
        </>
      )
      }

      {
        querySent && (
          <Stack spacing={2} direction="row" sx={{ marginTop: 2, marginBottom: 4 }}>
            <Button
              variant="soft"
              aria-label="Previous Page Button"
              onClick={() => {
                if (pagenum > 0) {
                  setPagenum(pagenum - 1);
                }
              }}
              disabled={pagenum === 0}
              sx={{
                marginTop: 2,
                color: 'white',
                backgroundColor: '#1c4020',
                '&:hover': {
                  backgroundColor: '#1c3020',
                },
                '&:disabled': {
                  backgroundColor: '#1c2020',
                }
              }}
            >
              Previous Page
            </Button>
            <Button
              variant="soft"
              aria-label="Next Page Button"
              onClick={() => {
                setPagenum(pagenum + 1);
              }}
              sx={{
                marginTop: 2,
                color: 'white',
                backgroundColor: '#1c4020',
                '&:hover': {
                  backgroundColor: '#1c3020',
                }
              }}
            >
              Next Page
            </Button>
          </Stack>
        )
      }

      <Footer />
    </Sheet >
  );
}
