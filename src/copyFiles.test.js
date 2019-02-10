import copyFile from './copyFiles'
import overwriteComponentNameMock from './overwriteComponentName'

jest.mock('./overwriteComponentName')

describe('copyFile', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call overwriteComponentName with the correct set of arguments', () => {
    const filesRenamed = ['NewApp.js']
    const files = ['App.js']
    const componentNameOriginal = 'App'
    const newComponentName = 'NewApp'
    copyFile(filesRenamed, files, componentNameOriginal, newComponentName)
    expect(overwriteComponentNameMock).toHaveBeenCalledTimes(1)
    expect(overwriteComponentNameMock).toHaveBeenCalledWith(
      files[0],
      filesRenamed[0],
      componentNameOriginal,
      newComponentName,
    )
  })

  it('should call overwriteComponentName 4 times if there is 4 entries in filesRenamed', () => {
    const filesRenamed = ['NewApp.js', 'NewApp.js', 'NewApp.js', 'NewApp.js']
    const files = ['App.js', 'App.js', 'App.js', 'App.js']
    const componentNameOriginal = 'App'
    const newComponentName = 'NewApp'
    copyFile(filesRenamed, files, componentNameOriginal, newComponentName)
    expect(overwriteComponentNameMock).toHaveBeenCalledTimes(4)
  })
})
