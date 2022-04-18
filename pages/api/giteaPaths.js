
export async function giteaRequest(giteaServer, access_token, owner, repo, branch) {
    // console.log(giteaServer, access_token, owner, repo, branch);
    let response
    response = await fetch(`${giteaServer}/api/v1/repos/${owner}/${repo}/branches/${branch}`,{
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })

    const branchTree = await response.json()

    const lastBranchCommitSha = branchTree.commit.id

    response = await fetch(`${giteaServer}/api/v1/repos/${owner}/${repo}/git/trees/${lastBranchCommitSha}?`+ new URLSearchParams({
        recursive: true,
        per_page: 10000,
    }),{
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })

    const treeResponse = await response.json()

    const trees = treeResponse.tree

    const data = []

    for (let tree of trees) {
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
                    key: tree.sha
                }
                currentFolder.push(newFolder)
                currentFolder = newFolder.value
            } else {
                currentFolder = folder.value
            }
        }
    }

    for (let tree of trees) {
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
            sha: tree.sha,
            name,
            key: tree.sha
        })

        // console.log(tree);
    }

    return data
}

export async function loadMarkdown(giteaServer, access_token, owner, repo, sha) {
    let response
    response = await fetch(`${giteaServer}/api/v1/repos/${owner}/${repo}/git/blobs/${sha}?`,{
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

    const GIT_SERVER = 'https://try.gitea.io'
    const ACCESS_TOKEN = 'b718cd9bca25a4be9bc6a4026fcd8ccb867e47e5'
    const REPO = 'test'
    const BRANCH = 'main'
    const OWNER = 'YanMiaoW'

    giteaRequest(GIT_SERVER, ACCESS_TOKEN, OWNER, REPO, BRANCH)
        .then(data => {
            // console.log(data);
            const file = data[3]
            // console.log(file);
            loadMarkdown(GIT_SERVER,ACCESS_TOKEN, OWNER, REPO, file.sha)
                .then(content => {
                    // console.log(content);
                    res.statusCode = 200
                    res.json(content);
                })
        })
}