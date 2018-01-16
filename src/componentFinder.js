import glob from "glob"

const ignore = [
  "**/node_modules/**",
  "**/{__tests__,test,tests}/**",
  "**/*.{test,spec,stories}.*",
]

export default () =>
  new Promise((resolve, reject) =>
    glob("**/[A-Z]*.{js,jsx,tsx}", { ignore }, (err, matches) => {
      if (err) {
        reject(err)
      }

      resolve(matches)
    }),
  )
