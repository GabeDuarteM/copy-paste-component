import implementCommands from "./implementCommands"
import { copy, defaultCommand } from "./binCommands"

jest.mock("./binCommands")

describe("implementCommands", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it("should call only defaultCommand when the default command is called", () => {
    implementCommands()

    expect(defaultCommand).toHaveBeenCalledTimes(1)
    expect(copy).not.toHaveBeenCalled()
  })

  it("should call only copy when copy command is called", () => {
    implementCommands([
      "copy",
      "componentToBeCopiedPath",
      "newComponentName",
      "newComponentLocation",
    ])

    expect(copy).toHaveBeenCalledTimes(1)
    expect(defaultCommand).not.toHaveBeenCalled()
  })
})
