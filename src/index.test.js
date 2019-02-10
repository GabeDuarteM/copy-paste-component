import * as index from './index'

describe('index', () => {
  it('should export the componentFinder function', () => {
    expect(index.componentFinder).toBeDefined()
  })
  it('should export the copyPasteComponent function', () => {
    expect(index.copyPasteComponent).toBeDefined()
  })
  it('should export the getDefaultComponentPath function', () => {
    expect(index.getDefaultComponentPath).toBeDefined()
  })
})
