import * as React from 'react';

interface SidebarPusherProps {
  [key: string]: any;

  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Controls whether or not the dim is displayed. */
  dimmed?: boolean;
}

const SidebarPusher: React.StatelessComponent<SidebarPusherProps>;

export default SidebarPusher;
