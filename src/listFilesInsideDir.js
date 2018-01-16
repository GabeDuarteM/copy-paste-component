import klawSync from "klaw-sync"
import { dirname } from "path"

export default componentToBeCopied =>
  klawSync(dirname(componentToBeCopied), {
    nodir: true,
  }).map(x => x.path)
