import implementCommands from './implementCommands'

jest.mock('./implementCommands')

describe('bin', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call implementCommands', () => {
    // eslint-disable-next-line global-require
    require('./bin')

    expect(implementCommands).toHaveBeenCalledTimes(1)
  })
})
