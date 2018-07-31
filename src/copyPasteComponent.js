import { basename, extname, dirname, join } from "path"

import listFilesInsideDir from "./listFilesInsideDir"
import getRenamedFiles from "./getRenamedFiles"
import copyFiles from "./copyFiles"

const copyPasteComponent = (
  componentToBeCopied,
  componentName,
  componentLocation,
) => {
  const files = listFilesInsideDir(componentToBeCopied)

  const componentNameOriginal = basename(
    componentToBeCopied,
    extname(componentToBeCopied),
  )

  const filesRenamed = getRenamedFiles(
    files,
    componentNameOriginal,
    componentName,
  ).map(x => join(componentLocation, x))

  copyFiles(filesRenamed, files, componentNameOriginal, componentName)

  console.log(
    `\nComponent ${componentName} successfully created at ${dirname(
      filesRenamed[0],
    )}`,
  )
}

export default copyPasteComponent
