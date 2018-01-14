#! /usr/bin/env node
import glob from "glob"
import { prompt } from "inquirer"
import { basename, extname, dirname } from "path"
import {
  readdirSync,
  readFileSync,
  writeFileSync,
  statSync,
  ensureDirSync,
} from "fs-extra"

const walkSync = (dir, filelist = []) => {
  const dirSanitized = dir[dir.length - 1] !== "/" ? `${dir}/` : dir

  const files = readdirSync(`${dirSanitized}`)

  let filelistReturn = filelist

  files.forEach(file => {
    if (statSync(dirSanitized + file).isDirectory()) {
      filelistReturn = walkSync(`${dirSanitized + file}/`, filelist)
    } else {
      filelistReturn.push(`${dirSanitized + file}`)
    }
  })
  return filelistReturn
}

const getFolderComponent = componentToBeCopied => {
  const componentBasename = basename(
    componentToBeCopied,
    extname(componentToBeCopied),
  )

  const parentPath = dirname(componentToBeCopied)
  const parentBasename = basename(parentPath)

  return parentBasename === componentBasename ? dirname(parentPath) : parentPath
}

const readWriteSync = (
  fileSrc,
  fileDest,
  componentNameOriginal,
  newComponentName,
) => {
  const data = readFileSync(fileSrc, "utf-8")

  const newValue = data.replace(
    new RegExp(componentNameOriginal, "g"),
    newComponentName,
  )

  ensureDirSync(dirname(fileDest))

  writeFileSync(fileDest, newValue, "utf-8")

  console.log("readFileSync complete")
}

glob(
  "!(node_modules)**/{components,containers}/**/!(index|*.test*|*.stories*)*.{js,jsx,tsx}",
  async (err, matches) => {
    if (err) {
      throw err
    }

    const answers = await prompt([
      {
        name: "componentToBeCopied",
        message: "Which component would you like to copy?",
        choices: matches,
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
        default: ({ componentToBeCopied }) =>
          getFolderComponent(componentToBeCopied),
      },
    ])

    const files = walkSync(dirname(answers.componentToBeCopied))
    const componentNameOriginal = basename(
      answers.componentToBeCopied,
      extname(answers.componentToBeCopied),
    )
    const filesRenamed = files.map(file => {
      const x = file.replace(
        new RegExp(componentNameOriginal, "g"),
        answers.componentName,
      )
      return x
    })

    for (let i = 0; i < filesRenamed.length; i += 1) {
      readWriteSync(
        files[i],
        filesRenamed[i],
        componentNameOriginal,
        answers.componentName,
      )
    }
  },
)
