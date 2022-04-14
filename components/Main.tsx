import { styled } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { useEffect, useRef, useState } from 'react';

type Props = {
    drawerWidth?: number
    open: boolean
    children?: JSX.Element | JSX.Element[]
    sx?: SxProps
}

export default function Main({ drawerWidth = 240, children, open, sx }: Props) {
    const [Main, setMain] = useState(null)

    useEffect(() => {
        const MainStyle = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
            open?: boolean;
        }>(({ theme, open }) => ({
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: 0,
            ...(open && {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: `${drawerWidth}px`,
            }),
        }));
        setTimeout(() => {
            setMain(MainStyle)
        }, 0);

    }, [drawerWidth])
    
    if (!Main) return null
    else {
        return (
            <Main sx={sx} open={open}>
                {children}
            </Main>
        )
    }

}
