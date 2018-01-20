import getRenamedFiles from "./getRenamedFiles"

describe("getRenamedFiles", () => {
  it("should return a list of renamed files", () => {
    const files = [
      "src/components/App.js",
      "src/components/App.test.js",
      "src/components/App.md",
      "src/components/App.css",
      "src/components/index",
    ]
    const newFiles = [
      "src/components/NewApp.js",
      "src/components/NewApp.test.js",
      "src/components/NewApp.md",
      "src/components/NewApp.css",
      "src/components/index",
    ]

    const componentNameOriginal = "App"
    const newComponentName = "NewApp"
    const renamedFiles = getRenamedFiles(
      files,
      componentNameOriginal,
      newComponentName,
    )
    expect(renamedFiles).toEqual(newFiles)
  })
})
