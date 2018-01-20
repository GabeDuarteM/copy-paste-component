import { readFileSync, writeFileSync, ensureDirSync } from "fs-extra"
import { dirname } from "path"
import overwriteComponentName from "./overwriteComponentName"

describe("overwriteComponentName", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should look inside the file and replace the former component name with the new component name", () => {
    const fileSrc = "fileSrc"
    const fileDest = "fileDest/NewApp"
    const oldComponentName = "App"
    const newComponentName = "NewApp"

    const expectedFileContent = `
import React, { Component } from 'react';
import logo from './logo.svg';
import './NewApp.css';

class NewApp extends Component {
  render() {
    return (
      <div className="NewApp">
        <header className="NewApp-header">
          <img src={logo} className="NewApp-logo" alt="logo" />
          <h1 className="NewApp-title">Welcome to React</h1>
        </header>
        <p className="NewApp-intro">
          To get started, edit <code>src/NewApp.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default NewApp;
`

    overwriteComponentName(
      fileSrc,
      fileDest,
      oldComponentName,
      newComponentName,
    )

    expect(readFileSync).toHaveBeenCalledTimes(1)
    expect(readFileSync).toHaveBeenCalledWith(fileSrc, "utf-8")

    expect(ensureDirSync).toHaveBeenCalledTimes(1)
    expect(ensureDirSync).toHaveBeenCalledWith(dirname(fileDest))

    expect(writeFileSync).toHaveBeenCalledTimes(1)
    expect(writeFileSync).toHaveBeenCalledWith(
      fileDest,
      expectedFileContent,
      "utf-8",
    )
  })
})
