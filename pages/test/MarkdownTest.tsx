
import { useEffect, useState } from 'react';
import Markdown from '../../components/Markdown';

export default function MarkdownTest() {
    const [content, setContent] = useState('')

    async function loadMarkdown(path: string) {
        const response = await fetch(path)
        const content = await response.text()
        // console.log(content  );

        setContent(content)
    }

    useEffect(() => {
        // console.log("aa");
        loadMarkdown('/markdowns/python.md')
        // loadMarkdown('/markdowns/GraphicsLearning.md')
        // loadMarkdown('/markdowns/ffmpeg.md')
        // loadMarkdown('/markdowns/test.md')
    }, [])

    return <Markdown content={content} />


}