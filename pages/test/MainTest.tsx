import { height } from '@mui/system';
import { useEffect, useState } from 'react';
import Main from "../../components/Main";
import { Box } from '@mui/system';
import { Button } from '@mui/material';


export default function MainTest() {
    const [open, setOpen] = useState(true)

    return (
        <Box sx={{ display: 'flex' }}>
            <Main open={open} sx={{ backgroundColor: 'gray' }}>
                <Button variant="text"
                    onClick={() => {
                        setOpen(!open)
                    }}>
                    asdffaas
                </Button>
                <Box sx={{ height: "100%" }}>
                    <h1>adffaa</h1>

                </Box>

            </Main>
        </Box>

    )

}
