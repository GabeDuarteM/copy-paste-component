import { prompt } from "inquirer"
import componentFinder from "./componentFinder"
import getDefaultComponentPath from "./getDefaultComponentPath"

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
      }) => getDefaultComponentPath(defComponentToBeCopied, defComponentName),
    },
  ])

  return Promise.resolve(answers)
}
