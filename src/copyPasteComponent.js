import { prompt } from "inquirer"
import { basename, extname, dirname } from "path"

import componentFinder from "./componentFinder"
import getFolderComponent from "./getFolderComponent"
import listFilesInsideDir from "./listFilesInsideDir"
import getRenamedFiles from "./getRenamedFiles"
import copyFiles from "./copyFiles"

export default async () => {
  const components = await componentFinder()

  if (components.length === 0) {
    console.log("Components were not found in this project.")
    return
  }

  const { componentToBeCopied, componentName } = await prompt([
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
      default: ({ componentToBeCopied: defComponentToBeCopied }) =>
        getFolderComponent(defComponentToBeCopied),
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
  )

  copyFiles(filesRenamed, files, componentNameOriginal, componentName)

  console.log(
    `\nComponent ${componentName} successfully created at ${dirname(
      filesRenamed[0],
    )}`,
  )
}
