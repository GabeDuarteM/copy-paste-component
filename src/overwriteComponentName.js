import { readFileSync, writeFileSync, ensureDirSync } from "fs-extra"
import { dirname } from "path"

const overwriteComponentName = (
  fileSrc,
  fileDest,
  componentNameOriginal,
  newComponentName,
) => {
  const data = readFileSync(fileSrc, "utf-8")

  const newValue = data.replace(
    new RegExp(`(\\W|^)(${componentNameOriginal})(\\W|$)`, "g"),
    (match, p1, p2, p3) => `${p1}${newComponentName}${p3}`,
  )

  ensureDirSync(dirname(fileDest))

  writeFileSync(fileDest, newValue, "utf-8")
}

export default overwriteComponentName
