import getRenamedFiles from "./getRenamedFiles"

describe("getRenamedFiles", () => {
  it("should return a list of renamed files", () => {
    const files = [
      "src/components/App.js",
      "src/components/App.test.js",
      "src/components/App.md",
      "src/components/App.css",
      "src/components/index.js",
    ]
    const newFiles = [
      "NewApp.js",
      "NewApp.test.js",
      "NewApp.md",
      "NewApp.css",
      "index.js",
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
