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
import { gitlabRequest, loadMarkdown } from './api/gitlabPaths';

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

const GITLAB_SERVER = 'http://192.168.1.55:9001'
const ACCESS_TOKEN = 'glpat-TsJvbzMCF-2YdeeLbQjG'
const REPOID = '35295332'
const BRANCH = 'main'

export default function MarkdownTest() {
    const [content, setContent] = useState('')
    const [open, setOpen] = useState(false)
    const [drawerWidth, setDrawerWidth] = useState(280)
    const [navi, setNavi] = useState([])
    const [selectKey, setSelectKey] = useState('')
    const router = useRouter()

    function handerClick(file: any) {
        const { path, key } = file
        
        loadMarkdown(ACCESS_TOKEN, REPOID, BRANCH, path).then(content => {
            setContent(content)
        })

        setSelectKey(key)

        router.push({
            pathname: '/gitlabPages',
            query: { path },
        })

    }

    useEffect(() => {
        gitlabRequest(GITLAB_SERVER, ACCESS_TOKEN, REPOID)
            .then(navi => {
                setNavi(navi)
            })

    }, [])

    useEffect(() => {
        if (router.isReady) {
            const { path } = router.query
            if (path) {
                loadMarkdown(ACCESS_TOKEN, REPOID, BRANCH, path).then(content => {
                    setContent(content)
                })
            }
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