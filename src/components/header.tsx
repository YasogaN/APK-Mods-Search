import * as React from 'react';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';

export default function Header() {
    return (
        <>
            <Card
                variant="soft"
                sx={{
                    backgroundColor: '#9df4ff',
                    pointerEvents: 'none',
                    userSelect: 'none',
                    marginTop: '4vh',
                    marginBottom: '2vh',
                    maxWidth: '75vh'
                }}>
                <img
                    src="./logo.png"
                    loading="lazy"
                    alt=""
                />
            </Card>
            <Typography
                component="h1"
                level="h1"
                m={2}
                sx={{
                    color: 'white'
                }}
                textAlign='center'
            >
                APK Mods Search
            </Typography>
            <Typography
                component="p"
                level="body-md"
                m={2}
                sx={{
                    color: 'white'
                }}
                textAlign='center'
            >
                Made with ❤️ by YasogaN
            </Typography>
        </>
    );
}
