import { extname, basename, dirname, join } from "path"

export default (componentToBeCopied, componentName) => {
  const componentBasename = basename(
    componentToBeCopied,
    extname(componentToBeCopied),
  )

  const parentPath = join(dirname(componentToBeCopied))
  const parentBasename = basename(parentPath)

  return parentBasename === componentBasename
    ? join(dirname(parentPath), componentName)
    : parentPath
}
