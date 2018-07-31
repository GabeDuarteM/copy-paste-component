import glob from "glob"

const ignore = [
  "**/node_modules/**",
  "**/{__tests__,test,tests}/**",
  "**/*.{test,spec,stories}.*",
]

const componentFinder = (cwd = process.cwd()) =>
  new Promise((resolve, reject) =>
    glob("**/[A-Z]*.{js,jsx,tsx}", { ignore, cwd }, (err, matches) => {
      if (err) {
        reject(err)
      }

      resolve(matches)
    }),
  )

export default componentFinder
