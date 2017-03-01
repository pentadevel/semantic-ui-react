import * as React from 'react';

interface SidebarPushableProps {
  [key: string]: any;

  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;
}

const SidebarPushable: React.StatelessComponent<SidebarPushableProps>;

export default SidebarPushable;
