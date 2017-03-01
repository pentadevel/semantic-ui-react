import * as React from 'react';
import {
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  DropdownMenu,
  DropdownProps
} from '../../modules/Dropdown';

export interface SelectProps extends DropdownProps {
}

interface SelectComponent extends React.StatelessComponent<SelectProps> {
  Divider: typeof DropdownDivider;
  Header: typeof DropdownHeader;
  Item: typeof DropdownItem;
  Menu: typeof DropdownMenu;
}

const Select: SelectComponent;

export default Select;
