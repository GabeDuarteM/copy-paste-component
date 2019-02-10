import yargs from "yargs"
import { copy, defaultCommand } from "./binCommands"

const implementCommands = (
  argsToInject = process.argv.slice(2, process.argv.length),
) => {
  // eslint-disable-next-line babel/no-unused-expressions
  yargs(argsToInject)
    .usage("cpc [args]")
    .command(
      "copy <componentToBeCopiedPath> <newComponentName> <newComponentLocation>",
      "copy a component's structure using the arguments passed",
      yargsCmd => {
        yargsCmd
          .positional("componentToBeCopiedPath", {
            type: "string",
            describe: "path of the component that will be copied.",
          })
          .positional("newComponentName", {
            type: "string",
            describe: "the name of the new component.",
          })
          .positional("newComponentLocation", {
            type: "string",
            describe: "folder of the component that will be copied.",
          })
      },
      ({ componentToBeCopiedPath, newComponentName, newComponentLocation }) => {
        copy(componentToBeCopiedPath, newComponentName, newComponentLocation)
      },
    )
    .command(
      "*",
      "copy a component's structure asking for the parameters",
      () => {
        // EMPTY
      },
      () => {
        defaultCommand()
      },
    )
    .alias("h", "help")
    .alias("v", "version")
    .help().argv
}

export default implementCommands
