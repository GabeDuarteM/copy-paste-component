import { basename, extname, dirname } from "path"

export default componentToBeCopied => {
  const componentBasename = basename(
    componentToBeCopied,
    extname(componentToBeCopied),
  )

  const parentPath = dirname(componentToBeCopied)
  const parentBasename = basename(parentPath)

  return parentBasename === componentBasename ? dirname(parentPath) : parentPath
}
