import React from 'react';
import { createStyled, BaseStyleProps, StyleEngine } from '@style-kit-n/core';

import { WebBaseElement, WebBaseProps } from './types';

const x = <div b={'te'} />
const webEngine: StyleEngine<
  BaseStyleProps,
  WebBaseElement,
  WebBaseProps
> = {
  generateStyles = () => {

  }
};

const styled = createStyled(webEngine)
