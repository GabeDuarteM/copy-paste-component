import { prompt } from "inquirer"
import copyPasteComponent from "./copyPasteComponent"
import componentFinder from "./componentFinder"
import listFilesInsideDir from "./listFilesInsideDir"
import getFolderComponent from "./getFolderComponent"
import getRenamedFiles from "./getRenamedFiles"
import copyFiles from "./copyFiles"

jest.mock("./componentFinder", () =>
  jest.fn(() =>
    Promise.resolve([
      "src/components/App/App.js",
      "src/components/Home/Home.js",
      "src/components/Toolbar/Toolbar.js",
      "src/containers/AppContainer/AppContainer.js",
    ]),
  ),
)
jest.mock("./getFolderComponent", () => jest.fn(() => "src/components"))
jest.mock("./listFilesInsideDir", () =>
  jest.fn(() => [
    "src/components/App/App.js",
    "src/components/App/App.test.js",
    "src/components/App/App.md",
    "src/components/App/index.md",
  ]),
)
jest.mock("./getRenamedFiles", () =>
  jest.fn(() => [
    "src/components/NewApp/NewApp.js",
    "src/components/NewApp/NewApp.test.js",
    "src/components/NewApp/NewApp.md",
    "src/components/NewApp/index.md",
  ]),
)
jest.mock("./copyFiles", () => jest.fn(() => {}))
jest.mock("inquirer", () => ({
  prompt: jest.fn(() =>
    Promise.resolve({
      componentToBeCopied: "src/components/App/App.js",
      componentName: "NewApp",
    }),
  ),
}))

describe("copyPasteComponent", () => {
  it("should call all the mocked functions properly", async () => {
    const clgLogBackup = console.log
    console.log = jest.fn()

    await copyPasteComponent()
    const componentToBeCopied = "src/components/App/App.js"

    const prompts = [
      {
        name: "componentToBeCopied",
        message: "Which component would you like to copy?",
        choices: [
          "src/components/App/App.js",
          "src/components/Home/Home.js",
          "src/components/Toolbar/Toolbar.js",
          "src/containers/AppContainer/AppContainer.js",
        ],
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
    ]

    expect(componentFinder).toHaveBeenCalledTimes(1)

    expect(prompt).toHaveBeenCalledTimes(1)
    expect(prompt.mock.calls[0][0][0]).toEqual(prompts[0])
    expect(prompt.mock.calls[0][0][1].message).toEqual(prompts[1].message)
    expect(prompt.mock.calls[0][0][1].name).toEqual(prompts[1].name)
    expect(prompt.mock.calls[0][0][1].validate()).toEqual(
      "Inform a valid name for the component",
    )
    expect(prompt.mock.calls[0][0][1].validate("")).toEqual(
      "Inform a valid name for the component",
    )
    expect(prompt.mock.calls[0][0][1].validate("SomeRandomName")).toEqual(true)
    expect(prompt.mock.calls[0][0][2].name).toEqual(prompts[2].name)
    expect(prompt.mock.calls[0][0][2].message).toEqual(prompts[2].message)
    expect(prompt.mock.calls[0][0][2].type).toEqual(prompts[2].type)
    expect(prompt.mock.calls[0][0][2].default({ componentToBeCopied })).toEqual(
      "src/components",
    )

    expect(getFolderComponent).toHaveBeenCalledTimes(1)
    expect(getFolderComponent).toHaveBeenCalledWith(componentToBeCopied)

    expect(listFilesInsideDir).toHaveBeenCalledTimes(1)
    expect(listFilesInsideDir).toHaveBeenCalledWith(componentToBeCopied)

    expect(getRenamedFiles).toHaveBeenCalledTimes(1)
    expect(getRenamedFiles).toHaveBeenCalledWith(
      [
        "src/components/App/App.js",
        "src/components/App/App.test.js",
        "src/components/App/App.md",
        "src/components/App/index.md",
      ],
      "App",
      "NewApp",
    )

    expect(copyFiles).toHaveBeenCalledTimes(1)
    expect(copyFiles).toHaveBeenCalledWith(
      [
        "src/components/NewApp/NewApp.js",
        "src/components/NewApp/NewApp.test.js",
        "src/components/NewApp/NewApp.md",
        "src/components/NewApp/index.md",
      ],
      [
        "src/components/App/App.js",
        "src/components/App/App.test.js",
        "src/components/App/App.md",
        "src/components/App/index.md",
      ],
      "App",
      "NewApp",
    )

    expect(console.log).toHaveBeenCalledTimes(1)
    expect(console.log).toHaveBeenCalledWith(
      "\nComponent NewApp successfully created at src/components/NewApp",
    )
    console.log = clgLogBackup
  })

  it("should log a message if no components are found", async () => {
    jest.clearAllMocks()
    componentFinder.mockImplementation(() => [])
    const clgLogBackup = console.log
    console.log = jest.fn()

    await copyPasteComponent()

    expect(componentFinder).toHaveBeenCalledTimes(1)
    expect(listFilesInsideDir).toHaveBeenCalledTimes(0)
    expect(getRenamedFiles).toHaveBeenCalledTimes(0)
    expect(copyFiles).toHaveBeenCalledTimes(0)
    expect(console.log).toHaveBeenCalledTimes(1)
    expect(console.log).toHaveBeenCalledWith(
      "Components were not found in this project.",
    )

    console.log = clgLogBackup
  })
})
