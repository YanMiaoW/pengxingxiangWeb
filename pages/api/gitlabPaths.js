
export async function gitlabRequest(access_token, repoID) {
    let response
    response = await fetch(`https://gitlab.com/api/v4/projects/${repoID}/repository/tree?`+ new URLSearchParams({
        recursive: true,
        per_page: 10000,
    }), {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })

    const branchTree = await response.json()

    const data = []

    for (let tree of branchTree) {
        if (tree.type != 'tree') continue
        // console.log(tree);
        const splits = tree.path.split('/')
        // console.log(splits);
        let currentFolder = data
        for (let i = 0; i < splits.length; i++) {
            const folderName = splits[i]
            let folder = currentFolder.find(folder => folder.name == folderName)
            if (!folder) {
                const newFolder = {
                    name: folderName,
                    value: [],
                    key: tree.id
                }
                currentFolder.push(newFolder)
                currentFolder = newFolder.value
            } else {
                currentFolder = folder.value
            }
        }
    }

    for (let tree of branchTree) {
        if (tree.type != 'blob') continue
        const splits = tree.path.split('/')
        const filename = splits[splits.length - 1]
        const [name, ext] = filename.split('.')
        if (ext != "md") continue

        let currentFolder = data
        for (let i = 0; i < splits.length - 1; i++) {
            const folderName = splits[i]
            const folder = currentFolder.find(folder => folder.name == folderName)
            currentFolder = folder.value
        }

        // console.log(tree.path);

        currentFolder.push({
            path: tree.path,
            name,
            key: tree.id
        })

        // console.log(tree);
    }

    return data
}

export async function loadMarkdown(access_token, repoID, ref, path) {
    let response
    const pathEncode = encodeURIComponent(path)
    response = await fetch(`https://gitlab.com/api/v4/projects/${repoID}/repository/files/${pathEncode}?ref=${ref}`, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })
    // console.log(response);
    const responseJson = await response.json()

    const buffer = Buffer.from(responseJson.content, 'base64')
    const content = buffer.toString('utf-8')
    return content

}
export default function handler(req, res) {

    const ACCESS_TOKEN = 'glpat-TsJvbzMCF-2YdeeLbQjG'
    const REPOID = '35295332'
    const BRANCH = 'main'

    gitlabRequest(ACCESS_TOKEN, REPOID)
        .then(data => {
            // console.log(data);
            const file = data[6]
            // console.log(file);
            loadMarkdown(ACCESS_TOKEN, REPOID, BRANCH, file.path)
                .then(content => {
                    res.statusCode = 200
                    res.json(content);
                })
        })
}