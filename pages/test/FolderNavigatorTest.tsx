import { useEffect, useState } from "react";
import FolderNavigator from "../../components/FolderNavigator";


export default function FolderNavigatorTest() {
    const [navi, setNavi] = useState([])

    function handerClick(url: string) {
        console.log(url);
    }

    useEffect(() => {
        fetch('/api/markdownPaths')
            .then(response => response.json())
            .then(navi => {
                console.log(navi);
                setNavi(navi)
            })
    }, [])

    return (
        <FolderNavigator navi={navi} onClick={handerClick} selectKey="afdfdas"/>
    )
}
