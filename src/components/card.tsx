import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';

export default function ResultCard({ site, title, description, link, imageUrl }: { site: string, title: string, description: string, link: string, imageUrl: string }) {
    return (
        <Link href={link} target="_blank">
            <Card orientation="horizontal" variant="soft" sx={{ width: '75vw', margin: 2, backgroundColor: '#1c2020', maxHeigh: 120 }}>
                <CardContent>
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >
                        {imageUrl && (
                            <AspectRatio ratio="1" sx={{ width: 50, borderRadius: '10px', }}>
                                <img
                                    src={imageUrl}
                                    loading="lazy"
                                />
                            </AspectRatio>
                        )}
                        <Stack
                            direction="column"
                            spacing={0}
                            sx={{
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                            }}
                        >
                            <Typography textColor="common.white" level='title-md'>
                                {title}
                            </Typography>
                            <Typography textColor="primary.plainColor" level="body-sm">
                                {site}
                            </Typography>
                            <Typography textColor="#bdbdbd" level="body-xs">
                                {description}
                            </Typography>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </Link>
    );
}
