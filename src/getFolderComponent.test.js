import getFolderComponent from "./getFolderComponent"

describe("getFolderComponent", () => {
  it("should return the parent folder if it's name is not equal to the component name", () => {
    const a = getFolderComponent("src/components/App.js")
    expect(a).toBe("src/components")
  })

  it("should return the parent folder if it's name is not equal to the component name", () => {
    const a = getFolderComponent("src/components/App/App.js")
    expect(a).toBe("src/components")
  })
})
