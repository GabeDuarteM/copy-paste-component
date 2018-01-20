import klawSync from "klaw-sync"
import listFilesInsideDir from "./listFilesInsideDir"

describe("listFilesInsideDir", () => {
  it("should return a list of renamed files", () => {
    const componentToBeCopied = "src/components/App.js"

    listFilesInsideDir(componentToBeCopied)
    expect(klawSync).toHaveBeenCalledTimes(1)
    expect(klawSync).toHaveBeenCalledWith("src/components", { nodir: true })
  })
})
