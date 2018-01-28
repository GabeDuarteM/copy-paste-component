import { join } from "path"
import getDefaultComponentPath from "./getDefaultComponentPath"

describe("getDefaultComponentPath", () => {
  it("should correctly return the default when a path with a component using the subfolder structure is passed", () => {
    const path = getDefaultComponentPath("src/components/App/App.js", "NewApp")
    expect(path).toEqual(join("src", "components", "NewApp"))
  })

  it("should correctly return the default when a path with a component using the flat structure is passed", () => {
    const path = getDefaultComponentPath("src/components/App.js", "NewApp")
    expect(path).toEqual(join("src", "components"))
  })
})
