import ReactMarkdown from 'react-markdown'
import Container from '@mui/material/Container';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark as theme } from 'react-syntax-highlighter/dist/cjs/styles/prism'
// import oneDarkTheme from 'react-syntax-highlighter/dist/cjs/styles/prism/one-dark';

type Props = {
    content?: string
}

export default function Markdown({ content = '' }: Props) {

    const markdownDom = Code(content)

    return (

        <Container maxWidth="md">
            <div id="write"  >
                {markdownDom}
            </div>
        </Container>
    )
}

function validURL(str) {
    var pattern = new RegExp('http')
    return pattern.test(str);
}

function Code(markdown: string) {
    return (<ReactMarkdown
        children={markdown}
        components={{
            code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                const language = match ? match[1] : "text"
                // console.log(language);
                // console.log(children);
                return <SyntaxHighlighter
                    style={theme}
                    language={language}

                >
                    {children}
                </SyntaxHighlighter>

            },
            p({ node, className, children, ...props }) {
                const context = children[0] as string
                if (validURL(context)) {
                    return (
                        <p>
                            <a href={context} target="_blank" className="url">
                                {context}
                            </a>
                        </p>
                    )
                } else {
                    return <>{children}</>

                }


            }
        }}
    />)
}