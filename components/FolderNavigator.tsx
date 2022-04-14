import { Avatar, Box, Button, ListItem, Stack } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import { List } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArticleIcon from '@mui/icons-material/Article';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { useState } from 'react';

type FolderListType = {
    name: string,
    value: (FolderListType & FileListType)[],
    key: string
}

type FileListType = {
    name: string,
    url: string,
    key: string
}

type OnClickType = (file: any) => void

type Props = {
    navi: (FolderListType & FileListType)[],
    selectKey: string,
    onClick: OnClickType
}

type FileListProps = {
    file: FileListType,
    onClick: OnClickType,
    paddingLeft: number
    selectKey: string,
}

type FolderListProps = {
    folder: FolderListType,
    onClick: OnClickType,
    paddingLeft: number,
    selectKey: string,
}

export function FileListItem({ file, onClick, paddingLeft, selectKey }: FileListProps) {

    function handerClick(e) {
        if (onClick) {
            onClick(file)
        }
    }

    const isSelect = selectKey == file.key

    return (
        <ListItemButton onClick={handerClick}
            sx={{
                paddingLeft: isSelect ? paddingLeft : paddingLeft + 0.5,
                borderLeft: isSelect ? 4 : 0,
                borderLeftColor: isSelect ? "#f22f27" : "#ffffff",
                backgroundColor: isSelect ? "#FDF5F3" : null,
            }}
        >
            <DescriptionOutlinedIcon sx={{ marginRight: 1 }} />
            <ListItemText primary={file.name}
                primaryTypographyProps={{
                    color: isSelect ? "#f22f27" : null,
                    // fontWeight: isSelect ?'bold':'normal'
                }}
            />
        </ListItemButton>

    )
}

export function FolderListItem({ folder, onClick, paddingLeft, selectKey }: FolderListProps) {
    const [open, setOpen] = useState(false)

    return (
        <List disablePadding sx={{ width: "100%" }}>
            <ListItem disablePadding>
                <ListItemButton onClick={e => { setOpen(!open) }} sx={{
                    paddingLeft: paddingLeft + 0.5,
                    borderLeftColor: "#ffffff",
                }} >
                    {open ? <KeyboardArrowDownIcon sx={{ marginRight: 1 }} /> : <ChevronRightIcon sx={{ marginRight: 1 }} />}
                    <ListItemText primary={folder.name} />
                </ListItemButton>
            </ListItem>
            <Collapse in={open} timeout="auto">
                {folder.value.map(item => {
                    if (item.value) {
                        return <ListItem key={item.key} disablePadding>
                            <FolderListItem folder={item} onClick={onClick} paddingLeft={paddingLeft + 2} selectKey={selectKey} />
                        </ListItem>

                    } else {
                        return <ListItem key={item.key} disablePadding >
                            <FileListItem file={item} onClick={onClick} paddingLeft={paddingLeft + 2} selectKey={selectKey} />
                        </ListItem>

                    }
                })}

            </Collapse>
        </List>
    )
}


export default function FolderNavigator({ navi, onClick, selectKey }: Props) {

    return (
        <List >
            <ListItem sx={{ paddingTop: 5, paddingBottom: 2 }}>
                <Stack
                    width="100%"
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={0}>
                    <Avatar
                        alt="Remy Sharp"
                        src="/xiangxiang.png"
                        sx={{ width: 56, height: 56, alignItems: "center", justifyContent: "center" }}
                    />

                </Stack>
            </ListItem>
            <ListItem sx={{ paddingTop: 3, paddingBottom: 4 }}>

                <Stack
                    width="100%"
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={0}>
                    <Box sx={{
                        fontSize: 20,
                        fontWeight: 'medium',
                        lineHeight: '20px',
                    }}>
                        FILES
                    </Box>

                </Stack>

            </ListItem>

            {navi.map(item => {
                if (item.value) {
                    return <ListItem key={item.key} disablePadding>
                        <FolderListItem folder={item} onClick={onClick} paddingLeft={2} selectKey={selectKey} />
                    </ListItem>
                } else {
                    return <ListItem key={item.key} disablePadding>
                        <FileListItem file={item} onClick={onClick} paddingLeft={2} selectKey={selectKey} />
                    </ListItem>
                }
            })}
        </List >
    )
}