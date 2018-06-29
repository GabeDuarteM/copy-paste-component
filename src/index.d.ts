declare module "copy-paste-component" {
  function componentFinder(cwd: string): Promise<string[]>
  function copyPasteComponent(
    componentToBeCopied: string,
    componentName: string,
    componentLocation: string,
  ): void
  function getDefaultComponentPath(
    componentToBeCopied: string,
    componentName: string,
  ): string
}
