import { x } from '@xstyled/emotion';
import { SystemProps } from '@xstyled/system';
import { TextLink, TextLinkProps, TypographyProps } from 'anolis-ui';
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import parse, { HTMLReactParserOptions, domToReact } from 'html-react-parser';
import { FC } from 'react';

import { isJsonString } from '@src/utils/isJsonString';

interface RichtextProps {
  data: string;
  styles?: {
    _h1?: TypographyProps;
    _h2?: TypographyProps;
    _h3?: TypographyProps;
    _h4?: TypographyProps;
    _a?: TextLinkProps;
    _p?: TypographyProps;
    _strong?: TypographyProps;
    _as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p';
    _typography?: TypographyProps;
    _ul?: SystemProps;
    _ol?: SystemProps;
    _li?: TypographyProps;
  };
  gtmActionPrefix?: string;
}

export const stateToHTMLOptions = {
  // sorry za any :/
  inlineStyleFn: (styles: any) => {
    const key = 'color-';
    const color = styles
      .filter((value: string) => value.startsWith(key))
      .first();

    if (!color) return undefined;

    return {
      element: 'span',
      style: {
        color: color.replace(key, ''),
        fontFamily: 'inherit',
      },
    };
  },

  // sorry za any, ale jejich typy nejsou ok
  entityStyleFn: (entity: any) => {
    const entityType = entity.get('type');

    if (entityType !== 'LINK') return undefined;

    const data = entity.getData();
    return {
      element: 'a',
      attributes: {
        href: data.url,
        target: data.targetOption,
      },
    };
  },
};

const Richtext: FC<RichtextProps> = ({ data, styles }) => {
  const options: HTMLReactParserOptions = {
    // eslint-disable-next-line react/no-unstable-nested-components
    replace: (node: any) => {
      if (!node.attribs) {
        return null;
      }

      if (node.name === 'h1') {
        return (
          <x.h1
            {...(styles?._as && { as: styles._as })}
            {...styles?._typography}
            {...styles?._h1}
          >
            {domToReact(node.children, options)}
          </x.h1>
        );
      }

      if (node.name === 'h2') {
        return (
          <x.h2
            {...(styles?._as && { as: styles._as })}
            {...styles?._typography}
            {...styles?._h2}
          >
            {domToReact(node.children, options)}
          </x.h2>
        );
      }

      if (node.name === 'h3') {
        return (
          <x.h3
            {...(styles?._as && { as: styles._as })}
            {...styles?._typography}
            {...styles?._h3}
          >
            {domToReact(node.children, options)}
          </x.h3>
        );
      }

      if (node.name === 'h4') {
        return (
          <x.h4
            {...(styles?._as && { as: styles._as })}
            {...styles?._typography}
            {...styles?._h4}
          >
            {domToReact(node.children, options)}
          </x.h4>
        );
      }

      if (node.name === 'p') {
        return (
          <x.p
            {...(styles?._as && { as: styles._as })}
            {...styles?._typography}
            {...styles?._p}
          >
            {domToReact(node.children, options)}
          </x.p>
        );
      }

      if (node.name === 'strong') {
        return (
          <x.strong
            fontWeight={500}
            display="inline"
            {...(styles?._as && { as: styles._as })}
            {...styles?._typography}
            {...styles?._strong}
          >
            {domToReact(node.children, options)}
          </x.strong>
        );
      }

      if (node.name === 'a') {
        return (
          <TextLink
            v="underlined"
            fontSize="inherit"
            lineHeight="inherit"
            color="inherit"
            href={node.attribs.href}
            target={node.attribs.target}
            {...(styles?._as && { as: styles._as })}
            {...styles?._a}
          >
            {domToReact(node.children, options)}
          </TextLink>
        );
      }

      if (node.name === 'ul') {
        return (
          <x.ul
            pl="1rem"
            {...{ style: { listStyle: 'disc' } }}
            {...styles?._ul}
          >
            {domToReact(node.children, options)}
          </x.ul>
        );
      }

      if (node.name === 'ol') {
        return (
          <x.ol
            pl="1rem"
            {...{ style: { listStyle: 'numeric' } }}
            {...styles?._ol}
          >
            {domToReact(node.children, options)}
          </x.ol>
        );
      }

      if (node.name === 'li') {
        return (
          <x.p as="li" fontFamily="text-sans" {...styles?._li}>
            {domToReact(node.children, options)}
          </x.p>
        );
      }

      return null;
    },
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isJsonString(data)
        ? parse(
            stateToHTML(convertFromRaw(JSON.parse(data)), stateToHTMLOptions),
            options
          )
        : data}
    </>
  );
};

export default Richtext;
