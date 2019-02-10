import { prompt } from 'inquirer'
import promptParameters from './promptParameters'
import componentFinder from './componentFinder'
import getDefaultComponentPath from './getDefaultComponentPath'

jest.mock('inquirer', () => ({
  prompt: jest.fn(() =>
    Promise.resolve({
      componentToBeCopied: 'src/components/App/App.js',
      componentName: 'NewApp',
      componentLocation: 'src/components/NewApp',
    }),
  ),
}))

jest.mock('./componentFinder', () =>
  jest.fn(() =>
    Promise.resolve([
      'src/components/App/App.js',
      'src/components/Home/Home.js',
      'src/components/Toolbar/Toolbar.js',
      'src/containers/AppContainer/AppContainer.js',
    ]),
  ),
)

jest.mock('./getDefaultComponentPath')

describe('promptParameters', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should call prompt and getDefaultComponentPath with the default parameters', async () => {
    await promptParameters()

    const prompts = [
      {
        name: 'componentToBeCopied',
        message: 'Which component would you like to copy?',
        choices: [
          'src/components/App/App.js',
          'src/components/Home/Home.js',
          'src/components/Toolbar/Toolbar.js',
          'src/containers/AppContainer/AppContainer.js',
        ],
        type: 'list',
      },
      {
        name: 'componentName',
        message: 'What is the name of the new component?',
      },
      {
        name: 'componentLocation',
        message: 'What is the location of the new component?',
        type: 'input',
      },
    ]

    expect(prompt).toHaveBeenCalledTimes(1)
    expect(prompt.mock.calls[0][0][0]).toEqual(prompts[0])
    expect(prompt.mock.calls[0][0][1].message).toEqual(prompts[1].message)
    expect(prompt.mock.calls[0][0][1].name).toEqual(prompts[1].name)
    expect(prompt.mock.calls[0][0][1].validate()).toEqual(
      'Inform a valid name for the component',
    )
    expect(prompt.mock.calls[0][0][1].validate('')).toEqual(
      'Inform a valid name for the component',
    )
    expect(prompt.mock.calls[0][0][1].validate('SomeRandomName')).toEqual(true)
    expect(prompt.mock.calls[0][0][2].name).toEqual(prompts[2].name)
    expect(prompt.mock.calls[0][0][2].message).toEqual(prompts[2].message)
    expect(prompt.mock.calls[0][0][2].type).toEqual(prompts[2].type)
    prompt.mock.calls[0][0][2].default({
      componentToBeCopied: 'src/components/App/App.js',
      componentName: 'NewApp',
    })
    expect(getDefaultComponentPath).toHaveBeenCalledTimes(1)
    expect(getDefaultComponentPath).toHaveBeenCalledWith(
      'src/components/App/App.js',
      'NewApp',
    )
  })

  it('should log a message if no components are found', async () => {
    componentFinder.mockImplementation(() => Promise.resolve([]))

    await expect(promptParameters()).rejects.toThrow(
      'Components were not found in this project.',
    )
    expect(componentFinder).toHaveBeenCalledTimes(1)
    expect(prompt).not.toHaveBeenCalled()
  })
})
