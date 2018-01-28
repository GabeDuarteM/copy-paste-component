import copyPasteComponent from "./copyPasteComponent"
import promptParameters from "./promptParameters"
import { copy, defaultCommand } from "./binCommands"

jest.mock("./copyPasteComponent", () => jest.fn(() => {}))
jest.mock("./promptParameters", () =>
  jest.fn(() =>
    Promise.resolve({
      componentToBeCopied: "componentToBeCopied",
      componentName: "componentName",
      componentLocation: "componentLocation",
    }),
  ),
)

describe("binCommands", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it("should call promptParameters and copyPasteComponent when defaultCommand is called", async () => {
    await defaultCommand()

    expect(promptParameters).toHaveBeenCalledTimes(1)
    expect(copyPasteComponent).toHaveBeenCalledTimes(1)
  })

  it("should call just copyPasteComponent when the copy is called", async () => {
    await copy("componentToBeCopied", "componentName", "componentLocation")

    expect(copyPasteComponent).toHaveBeenCalledTimes(1)
    expect(promptParameters).not.toHaveBeenCalled()
  })

  it("should call copyPasteComponent with the right arguments when defaultCommand is called", async () => {
    await defaultCommand()

    expect(copyPasteComponent).toHaveBeenCalledWith(
      "componentToBeCopied",
      "componentName",
      "componentLocation",
    )
  })

  it("should call copyPasteComponent with the right arguments when copy is called", async () => {
    await copy("componentToBeCopied", "componentName", "componentLocation")

    expect(copyPasteComponent).toHaveBeenCalledWith(
      "componentToBeCopied",
      "componentName",
      "componentLocation",
    )
  })
})
