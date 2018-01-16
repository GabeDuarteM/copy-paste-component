export default (files, componentNameOriginal, newComponentName) =>
  files.map(file => {
    const x = file.replace(
      new RegExp(componentNameOriginal, "g"),
      newComponentName,
    )
    return x
  })
