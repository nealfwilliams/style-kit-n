import { createStyled as _createStyled } from '@style-kit-n/core'
import { WebStyleProps } from './types'
import { webEngine } from './engine'

export function createStyled<S extends WebStyleProps>() {
  return _createStyled<
    keyof JSX.IntrinsicElements,
    S,
    typeof webEngine,
    string,
    React.CSSProperties
  >(webEngine)
}

export const styledWeb = createStyled<WebStyleProps>()
