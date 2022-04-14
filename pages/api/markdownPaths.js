import fs from 'fs'
import path from "path";
import { v4 as uuidv4 } from 'uuid';

export default function handler(req, res) {
    const filenames = fs.readdirSync("./public/markdowns")
    const paths = filenames.map(filename => path.join('/markdowns', filename))
    const dirs = getPaths("./public/markdowns", "/markdowns")
    // console.log(dirs);

    res.statusCode = 200
    res.json(dirs);
}

function getPaths(dirPath, prefix) {
    const dirs = []
    const filenames = fs.readdirSync(dirPath)

    for (let filename of filenames) {
        const objPath = path.join(dirPath, filename)
        if (fs.lstatSync(objPath).isDirectory()) {
            const dirValue = getPaths(objPath, path.join(prefix, filename))
            const dir = {
                name: filename,
                value: dirValue,
                key: uuidv4()
            }
            dirs.push(dir)
        } else if (path.extname(filename) == '.md') {
            const file = {
                url: path.join(prefix, filename),
                name: filename.split('.')[0],
                key: uuidv4()
            }
            dirs.push(file)
        }
    }

    return dirs
}