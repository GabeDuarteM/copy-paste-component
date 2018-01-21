import { basename } from "path"

export default (files, componentNameOriginal, newComponentName) =>
  files.map(file => {
    const x = basename(file).replace(
      new RegExp(componentNameOriginal, "g"),
      newComponentName,
    )
    return x
  })
