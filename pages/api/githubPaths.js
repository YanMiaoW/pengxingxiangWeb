import { Octokit } from "octokit";

export async function githubRequest(access_token, owner, repo, branch) {
    // get personal access_token https://github.com/settings/tokens 
    const octokit = new Octokit({ auth: access_token });
    // console.log(octokit);

    const repos = await octokit.rest.repos.getBranch({
        owner,
        repo,
        branch,
    })

    // console.log(repos);

    const branchSha = repos.data.commit.sha

    const branchTree = await octokit.rest.git.getTree({
        owner,
        repo,
        tree_sha: branchSha,
        recursive: "true"
    })
    // console.log(branchTree);

    const data = []


    for (let tree of branchTree.data.tree) {
        if (tree.type != 'tree') continue
        const splits = tree.path.split('/')

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

    for (let tree of branchTree.data.tree) {
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

        currentFolder.push({
            path: tree.path,
            name,
            key: tree.sha
        })

        // console.log(tree);
    }

    return data
}

export async function loadMarkdown(access_token, owner, repo, path) {

    const octokit = new Octokit({ auth: access_token });

    const response = await octokit.rest.repos.getContent({
        owner,
        repo,
        path
    })
    // console.log(downloadUrl);
    const buffer = Buffer.from(response.data.content, 'base64')
    const content = buffer.toString('utf-8')

    return content

}


export default function handler(req, res) {


    const ACCESS_TOKEN = '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'
    const OWNER = 'YanMiaoW'
    const REPO = 'gitbook'
    const BRANCH = 'main'
    // const REPO = 'python-tools'
    // const BRANCH = 'master'
    githubRequest(ACCESS_TOKEN, OWNER, REPO, BRANCH)
        .then(data => {
            const path = data[5].path
            loadMarkdown(ACCESS_TOKEN, OWNER, REPO, path)
                .then(context => {
                    res.statusCode = 200
                    res.json(context);
                })
        })
}