import copyPasteComponent from './copyPasteComponent'
import promptParameters from './promptParameters'

export const defaultCommand = async () => {
  const {
    componentToBeCopied,
    componentName,
    componentLocation,
  } = await promptParameters()
  copyPasteComponent(componentToBeCopied, componentName, componentLocation)
}

export const copy = (componentToBeCopied, componentName, componentLocation) => {
  copyPasteComponent(componentToBeCopied, componentName, componentLocation)
}
