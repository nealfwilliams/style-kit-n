import React, { CSSProperties } from 'react';
import { render, fireEvent, act } from '@testing-library/react';

import { StyleEngine } from './types';
import { createStyled } from './createStyled';
import { StyleKitNProvider } from './context';
import { baseTheme } from './theme';

type ExampleProps = {
  s?: 'small' | 'large';
  enlarge?: boolean;
  color?: string;
};

const SMALL_FONT_SIZE = '14px';
const LARGE_FONT_SIZE = '18px';

const SMALL_CLASS_NAME = 'small';
const LARGE_CLASS_NAME = 'large';

type BaseElementProps = {
  div: {
    id: string;
    tabIndex: number;
    children: React.ReactNode;
  };
};

const testEngine: StyleEngine<
  ExampleProps,
  'div',
  BaseElementProps,
  string,
  CSSProperties,
  any
> = {
  generateStyles(styleProps) {
    const styles: CSSProperties = {};
    if (styleProps.s === 'small') {
      styles.fontSize = SMALL_FONT_SIZE;
    }

    if (styleProps.enlarge || styleProps.s === 'large') {
      styles.fontSize = LARGE_FONT_SIZE;
    }

    if (styleProps.color) {
      styles.color = styleProps.color;
    }

    return styles;
  },

  generateClasses(styleProps) {
    if (styleProps.s === 'small') {
      return [SMALL_CLASS_NAME];
    }

    if (styleProps.s === 'large' || styleProps.enlarge) {
      return [LARGE_CLASS_NAME];
    }

    return [];
  },

  resolveClassConflicts(classNames) {
    return classNames.slice(classNames.length - 1);
  },

  getBaseProps() {
    return ['id', 'children', 'tabIndex'];
  },

  getMediaWidth() {
    return 600;
  },

  listenForResize() {},
  cleanupResizeListener() {},
};

const styled = createStyled<
  'div',
  BaseElementProps,
  ExampleProps,
  typeof testEngine
>(testEngine);

const renderComponent = (C: any, props?: any) => {
  const testString = 'test';

  const { getByText } = render(
    <StyleKitNProvider engine={testEngine as any} theme={baseTheme}>
      <C {...props}>{testString}</C>
    </StyleKitNProvider>
  );

  return getByText(testString);
};

describe('styled', () => {
  it('creates a component with styles passed as parameter', () => {
    const Test = styled('div', {
      styles: {
        color: 'red',
      },
    });

    const rendered = renderComponent(Test);
    expect(rendered.style).toMatchObject({ color: 'red' });
  });

  it('adds component styles from props passed as parameter', () => {
    const Test = styled('div', {
      s: 'small',
    });

    const rendered = renderComponent(Test);
    expect(rendered.style).toMatchObject({ fontSize: SMALL_FONT_SIZE });
    expect(rendered.className).toBe(SMALL_CLASS_NAME);
  });

  it('adds styles when props passed directly on component', () => {
    // Passed in props should override default props
    const Test = styled('div');

    const rendered = renderComponent(Test, { s: 'small' });
    expect(rendered.style).toMatchObject({
      fontSize: SMALL_FONT_SIZE,
    });
  });

  it('generates style from passed in function using component props', () => {
    type TestProps = {
      shrink: boolean;
    };

    const Test = styled<TestProps>('div', ({ shrink }) => ({
      s: shrink ? 'small' : undefined,
    }));

    const rendered = renderComponent(Test, { shrink: true });

    expect(rendered.style).toMatchObject({
      fontSize: SMALL_FONT_SIZE,
    });
  });

  it('removes props that are not props of the base element', () => {
    type TestProps = {
      shrink: boolean;
    };

    const Test = styled<TestProps>('div');

    const rendered = renderComponent(Test, {
      s: 'small',
      id: 'testId',
    });

    expect(rendered.getAttribute('s')).not.toBeTruthy();
    expect(rendered.getAttribute('id')).toBe('testId');
  });

  describe('priority', () => {
    it('prioritizes focus styles props over styles props', () => {
      const Test = styled('div', {
        color: 'red',
        focus: {
          color: 'blue',
        },
      });

      const rendered = renderComponent(Test, { tabIndex: 0 });

      act(() => {
        fireEvent.focus(rendered);
      });

      expect(rendered.style).toMatchObject({
        color: 'blue',
      });
    });

    it('prioritizes hover styles props over focus styles props', () => {
      const Test = styled('div', {
        focus: {
          color: 'red',
        },
        hover: {
          color: 'blue',
        },
      });

      const rendered = renderComponent(Test, {
        tabIndex: 0,
      });

      act(() => {
        fireEvent.focus(rendered);
        fireEvent.mouseOver(rendered);
      });

      expect(rendered.style).toMatchObject({
        color: 'blue',
      });
    });

    it('prioritizes direct styles to all style props', () => {
      const Test = styled('div', {
        color: 'red',
        focus: {
          color: 'red',
        },
        hover: {
          color: 'red',
        },
        styles: {
          color: 'blue',
        },
      });

      const rendered = renderComponent(Test, {
        tabIndex: 0,
      });

      act(() => {
        fireEvent.focus(rendered);
        fireEvent.mouseOver(rendered);
      });

      expect(rendered.style).toMatchObject({
        color: 'blue',
      });
    });

    it('prioritizes direct focus styles over direct styles', () => {
      const Test = styled('div', {
        styles: {
          color: 'red',
        },
        focus: {
          styles: {
            color: 'blue',
          },
        },
      });

      const rendered = renderComponent(Test, {
        tabIndex: 0,
      });

      act(() => {
        fireEvent.focus(rendered);
      });

      expect(rendered.style).toMatchObject({
        color: 'blue',
      });
    });

    it('prioritizes direct hover styles over direct focus styles', () => {
      const Test = styled('div', {
        focus: {
          styles: {
            color: 'red',
          },
        },
        hover: {
          styles: {
            color: 'blue',
          },
        },
      });

      const rendered = renderComponent(Test, {
        tabIndex: 0,
      });

      act(() => {
        fireEvent.focus(rendered);
        fireEvent.mouseOver(rendered);
      });

      expect(rendered.style).toMatchObject({
        color: 'blue',
      });
    });

    it('priorizes styles props on component to all styles defined with styled call', () => {
      const Test = styled('div', {
        color: 'red',
        styles: {
          color: 'red',
        },
        focus: {
          color: 'red',
          styles: {
            color: 'red',
          },
        },
        hover: {
          color: 'red',
          styles: {
            color: 'red',
          },
        },
      });

      const rendered = renderComponent(Test, {
        tabIndex: 0,
        color: 'blue',
      });

      act(() => {
        fireEvent.focus(rendered);
        fireEvent.mouseOver(rendered);
      });

      expect(rendered.style).toMatchObject({
        color: 'blue',
      });
    });
  });

  describe('inheritance', () => {
    it('cascades direct styles from parents to children', () => {
      const Parent = styled('div', {
        styles: {
          color: 'red',
          padding: 12,
        },
      });

      const Child = styled(Parent, {
        styles: {
          color: 'blue',
        },
      });

      const rendered = renderComponent(Child);
      expect(rendered.style).toMatchObject({ color: 'blue', padding: '12px' });
    });

    it('cascades style props from parents to children', () => {
      const Parent = styled('div', {
        color: 'red',
        s: 'small',
      });

      const Child = styled(Parent, {
        color: 'blue',
      });

      const rendered = renderComponent(Child);
      expect(rendered.style).toMatchObject({
        color: 'blue',
        fontSize: SMALL_FONT_SIZE,
      });
    });

    it('cascades style functions from parents to children', () => {
      const Parent = styled('div', () => ({
        s: 'small',
        color: 'red',
      }));

      const Child = styled(Parent, () => ({
        s: 'large',
      }));

      const rendered = renderComponent(Child);
      expect(rendered.style).toMatchObject({
        color: 'red',
        fontSize: LARGE_FONT_SIZE,
      });
      expect(rendered.className).toBe(LARGE_CLASS_NAME);
    });
  });

  it('only adds styles if media query is true', () => {
    const Test = styled('div', {
      media: {
        sm: {
          color: 'red',
        },
        md: {
          s: 'small',
        },
      },
    });

    const rendered = renderComponent(Test);
    expect(rendered.style).toMatchObject({ color: 'red' });
    expect(rendered.style).not.toMatchObject({ fontSize: SMALL_CLASS_NAME });
  });
});
