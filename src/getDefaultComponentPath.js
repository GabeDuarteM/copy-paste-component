import { extname, basename, dirname, join } from "path"

const getDefaultComponentPath = (componentToBeCopied, componentName) => {
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

export default getDefaultComponentPath
