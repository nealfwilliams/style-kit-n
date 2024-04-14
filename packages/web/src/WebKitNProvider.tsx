import React from 'react'
import { StyleKitNProvider } from "@style-kit-n/core"
import { WebTheme } from "./types"
import { webEngine } from "./engine"

export const WebKitNProvider: React.FC<React.PropsWithChildren<{
  theme: WebTheme
}>> = ({
  theme: WebTheme,
  children
}) => {
  return (
    <StyleKitNProvider engine={webEngine} theme={WebTheme}>
      {children}
    </StyleKitNProvider>
  )
}