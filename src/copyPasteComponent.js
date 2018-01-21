import { prompt } from "inquirer"
import { basename, extname, dirname, join } from "path"

import componentFinder from "./componentFinder"
import listFilesInsideDir from "./listFilesInsideDir"
import getRenamedFiles from "./getRenamedFiles"
import copyFiles from "./copyFiles"

export default async () => {
  const components = await componentFinder()

  if (components.length === 0) {
    console.log("Components were not found in this project.")
    return
  }

  const {
    componentToBeCopied,
    componentName,
    componentLocation,
  } = await prompt([
    {
      name: "componentToBeCopied",
      message: "Which component would you like to copy?",
      choices: components,
      type: "list",
    },
    {
      name: "componentName",
      message: "What is the name of the new component?",
      validate: input =>
        input ? true : "Inform a valid name for the component",
    },
    {
      name: "componentLocation",
      message: "What is the location of the new component?",
      type: "input",
      default: ({
        componentToBeCopied: defComponentToBeCopied,
        componentName: defComponentName,
      }) => {
        const componentBasename = basename(
          defComponentToBeCopied,
          extname(defComponentToBeCopied),
        )

        const parentPath = dirname(defComponentToBeCopied)
        const parentBasename = basename(parentPath)

        return parentBasename === componentBasename
          ? join(dirname(parentPath), defComponentName)
          : parentPath
      },
    },
  ])

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
