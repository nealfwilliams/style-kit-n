import { HtmlAttribute } from "./htmlAttributes";

export type WebBaseElement =
  'div' |
  'span' |
  'button' |
  'a' |
  'img' |
  'li' |
  'ul' |
  'ol' |
  'table' |
  'td' |
  'th' |
  'tr';

export type WebBaseProps = {
  [key in WebBaseElement]: HtmlAttribute
}

