import Main from '../components/Main';
import { useEffect, useState } from 'react';
import Markdown from '../components/Markdown';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Drawer from '@mui/material/Drawer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FolderNavigator from '../components/FolderNavigator';
import { useRouter } from 'next/router'

const theme = createTheme({
    palette: {
        primary: {
            main: "#f22f27",
        },
        secondary: {
            main: "#262626"
        }
    },
});

export default function MarkdownTest() {
    const [content, setContent] = useState('')
    const [open, setOpen] = useState(false)
    const [drawerWidth, setDrawerWidth] = useState(280)
    const [navi, setNavi] = useState([])
    const [selectKey, setSelectKey] = useState('')
    const router = useRouter()


    async function loadMarkdown(path: string) {
        const response = await fetch(path)
        const content = await response.text()
        // console.log(content);
        setContent(content)
    }

    function handerClick(file: any) {
        const { url, key } = file
        loadMarkdown(url)

        setSelectKey(key)

        router.push({
            pathname: '/',
            query: { url },
        })

    }

    useEffect(() => {
        fetch('/api/markdownPaths')
            // fetch('/api/githubPaths')
            .then(response => response.json())
            .then(navi => {
                // console.log(navi);
                setNavi(navi)
            })

    }, [])

    useEffect(() => {
        if (router.isReady) {
            const { url } = router.query
            if (url) loadMarkdown(url as string)
            else loadMarkdown('/markdowns/python.md')
        }

    }, [router.isReady])

    return (
        <Box>
            {/* <ThemeProvider theme={theme}> */}

            <Drawer variant="persistent" open={open} anchor="left" sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }, }} >
                {/* <Box sx={{ backgroundColor: "gray", height: "100%", width: "100%" }} /> */}
                <FolderNavigator navi={navi} onClick={handerClick} selectKey={selectKey} />
            </Drawer>
            <Main open={open} drawerWidth={drawerWidth}>
                <IconButton
                    sx={{ position: "fixed" }}
                    onClick={e => {
                        setOpen(!open)
                    }}
                    // color="primary"
                    size="large"
                >
                    {open ? <ChevronLeftIcon /> : <MenuIcon />}

                </IconButton>


                <Markdown content={content} />

            </Main>
            {/* </ThemeProvider> */}
        </Box>
    )

}