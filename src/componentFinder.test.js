import { join } from "path"
import componentFinder from "./componentFinder"

const fixturesPath = join(process.cwd(), "fixtures")
const createReactAppPath = join(fixturesPath, "create-react-app")
const folderCreateReactAppPath = join(
  fixturesPath,
  "folder-based-create-react-app",
)

const componentsCreateReactApp = [
  "src/App.js",
  "src/Navbar.js",
  "src/Sidebar.js",
]
const componentsFolderCreateReactApp = [
  "src/components/App/App.js",
  "src/components/Home/Home.js",
  "src/components/Toolbar/Toolbar.js",
  "src/containers/AppContainer/AppContainer.js",
]

describe("componentFinder", () => {
  describe("create-react-app", () => {
    it("should return the correct list of components", async () => {
      const components = await componentFinder(createReactAppPath)

      expect(components).toEqual(componentsCreateReactApp)
    })
  })

  describe("folder-based-create-react-app", () => {
    it("should return the correct list of components", async () => {
      const components = await componentFinder(folderCreateReactAppPath)

      expect(components).toEqual(componentsFolderCreateReactApp)
    })
  })

  it("should reject the promise if an error is caught", async () => {
    expect.assertions(1)

    const consoleError = console.error
    console.error = jest.fn()

    await expect(componentFinder("/")).rejects.toThrow(
      process.platform === "win32"
        ? "operation not permitted"
        : "permission denied",
    )

    console.error = consoleError
  })

  it("should use the current cwd if none is passed", async () => {
    const components = await componentFinder()
    expect(components).toEqual([
      "fixtures/create-react-app/src/App.js",
      "fixtures/create-react-app/src/Navbar.js",
      "fixtures/create-react-app/src/Sidebar.js",
      "fixtures/folder-based-create-react-app/src/components/App/App.js",
      "fixtures/folder-based-create-react-app/src/components/Home/Home.js",
      "fixtures/folder-based-create-react-app/src/components/Toolbar/Toolbar.js",
      "fixtures/folder-based-create-react-app/src/containers/AppContainer/AppContainer.js",
    ])
  })
})
