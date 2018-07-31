import klawSync from "klaw-sync"
import { dirname } from "path"

const listFilesInsideDir = componentToBeCopied =>
  klawSync(dirname(componentToBeCopied), {
    nodir: true,
  }).map(x => x.path)

export default listFilesInsideDir
