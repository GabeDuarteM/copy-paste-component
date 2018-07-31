import { basename } from "path"

const getRenamedFiles = (files, componentNameOriginal, newComponentName) =>
  files.map(file => {
    const x = basename(file).replace(
      new RegExp(componentNameOriginal, "g"),
      newComponentName,
    )
    return x
  })

export default getRenamedFiles
