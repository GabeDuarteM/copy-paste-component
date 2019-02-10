const files = [
  { path: 'src/components/App.js' },
  { path: 'src/components/App.test.js' },
  { path: 'src/components/App.md' },
  { path: 'src/components/App.css' },
  { path: 'src/components/index' },
]

const klawSync = jest.fn(() => files)

module.exports = klawSync
