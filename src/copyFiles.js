import overwriteComponentName from "./overwriteComponentName"

const copyFiles = (
  filesRenamed,
  files,
  componentNameOriginal,
  newComponentName,
) => {
  for (let i = 0; i < filesRenamed.length; i += 1) {
    overwriteComponentName(
      files[i],
      filesRenamed[i],
      componentNameOriginal,
      newComponentName,
    )
  }
}

export default copyFiles
