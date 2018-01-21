import copyPasteComponent from "./copyPasteComponent"

jest.mock("./copyPasteComponent", () => jest.fn(() => {}))

describe("bin", () => {
  it("should call copyPasteComponent", () => {
    // eslint-disable-next-line global-require
    require("./bin")
    expect(copyPasteComponent).toHaveBeenCalledTimes(1)
  })
})
