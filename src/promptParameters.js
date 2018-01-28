import { prompt } from "inquirer"
import { basename, extname, dirname, join } from "path"
import componentFinder from "./componentFinder"

export default async () => {
  const components = await componentFinder()

  if (components.length === 0) {
    return Promise.reject(
      new Error("Components were not found in this project."),
    )
  }

  const answers = await prompt([
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

  return Promise.resolve(answers)
}
