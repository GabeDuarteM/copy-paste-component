import { join } from "path"
import copyPasteComponent from "./copyPasteComponent"
import listFilesInsideDir from "./listFilesInsideDir"
import getRenamedFiles from "./getRenamedFiles"
import copyFiles from "./copyFiles"

jest.mock("./listFilesInsideDir", () =>
  jest.fn(() => [
    "src/components/App/App.js",
    "src/components/App/App.test.js",
    "src/components/App/App.md",
    "src/components/App/index.md",
  ]),
)

jest.mock("./getRenamedFiles", () =>
  jest.fn(() => ["NewApp.js", "NewApp.test.js", "NewApp.md", "index.md"]),
)

jest.mock("./copyFiles", () =>
  jest.fn(() => {
    // EMPTY
  }),
)

describe("copyPasteComponent", () => {
  const clgLogBackup = console.log
  beforeEach(() => {
    jest.clearAllMocks()
    console.log = jest.fn()
  })
  afterEach(() => {
    console.log = clgLogBackup
  })
  it("should call all the mocked functions properly", () => {
    copyPasteComponent("App", "NewApp", join("src", "components", "NewApp"))

    expect(listFilesInsideDir).toHaveBeenCalledTimes(1)
    expect(listFilesInsideDir).toHaveBeenCalledWith("App")

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
        join("src", "components", "NewApp", "NewApp.js"),
        join("src", "components", "NewApp", "NewApp.test.js"),
        join("src", "components", "NewApp", "NewApp.md"),
        join("src", "components", "NewApp", "index.md"),
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
      `\nComponent NewApp successfully created at ${join(
        "src",
        "components",
        "NewApp",
      )}`,
    )
  })
})
