import readWriteSync from "./readWriteSync"

export default (
  filesRenamed,
  files,
  componentNameOriginal,
  newComponentName,
) => {
  for (let i = 0; i < filesRenamed.length; i += 1) {
    readWriteSync(
      files[i],
      filesRenamed[i],
      componentNameOriginal,
      newComponentName,
    )
  }
}
