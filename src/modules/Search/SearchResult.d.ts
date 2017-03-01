import * as React from 'react';

export interface SearchResultProps {
  [key: string]: any;

  /** An element type to render as (string or function). */
  as?: any;

  /** The item currently selected by keyboard shortcut. */
  active?: boolean;

  /** Additional classes. */
  className?: string;

  /** Additional text with less emphasis. */
  description?: string;

  /** A unique identifier. */
  id?: number;

  /** Add an image to the item. */
  image?: string;

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>, data: SearchResultProps) => void;

  /** Customized text for price. */
  price?: string;

  /**
   * A function that returns the result contents.
   * Receives all SearchResult props.
   */
  renderer?: (props: SearchResultProps) => Array<React.ReactElement<any>>;

  /** Display title. */
  title?: string;
}

const SearchResult: React.ComponentClass<SearchResultProps>;

export default SearchResult;
