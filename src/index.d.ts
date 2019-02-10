declare module "copy-paste-component" {
  declare function componentFinder(cwd: string): Promise<string[]>
  declare function copyPasteComponent(
    componentToBeCopied: string,
    componentName: string,
    componentLocation: string,
  ): void
  declare function getDefaultComponentPath(
    componentToBeCopied: string,
    componentName: string,
  ): string
}
