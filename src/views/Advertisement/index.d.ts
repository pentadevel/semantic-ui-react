import * as React from 'react'

interface AdvertisementProps {
  [key: string]: any;

  /** An element type to render as (string or function). */
  as?: any;

  /** Center the advertisement. */
  centered?: boolean;

  /** Additional classes. */
  className?: string;

  /** Text to be displayed on the advertisement. */
  test?: boolean | string | number;

  /** Varies the size of the advertisement. */
  unit?: 'medium rectangle'| 'large rectangle'| 'vertical rectangle'| 'small  rectangle'|
  'mobile banner'| 'banner'| 'vertical banner'| 'top banner'| 'half banner'|
  'button'| 'square button'| 'small button'|
  'skyscraper'| 'wide skyscraper'|
  'leaderboard'| 'large leaderboard'| 'mobile leaderboard'| 'billboard'|
  'panorama'|
  'netboard'|
  'half page'|
  'square'| 'small square';
}

export const Advertisement: React.StatelessComponent<AdvertisementProps>;
