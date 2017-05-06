import * as React from 'react';

import { RadioProps } from '../../addons/Radio';
import { FormFieldProps } from './FormField';
type BaseRadioProps = RadioProps & FormFieldProps;

export interface FormRadioProps extends BaseRadioProps {
  [key: string]: any;

  /** An element type to render as (string or function). */
  as?: any;

  /** A FormField control prop. */
  control?: any;
}

declare const FormRadio: React.StatelessComponent<FormRadioProps>;

export default FormRadio;
