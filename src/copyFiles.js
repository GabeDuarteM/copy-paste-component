import overwriteComponentName from "./overwriteComponentName"

export default (
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
