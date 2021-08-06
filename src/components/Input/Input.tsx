import React, { ChangeEvent, InputHTMLAttributes, ReactElement } from "react";
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from "classnames";
import Icon from "../Icon/Icon";

type InputSize = 'lg' | 'sm';
type Affix = string | ReactElement;

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size' | 'prefix'> {
  disabled?: boolean;
  size?: InputSize;
  /**Icons from font awesome */
  icon?: IconProp;
  prefix?: Affix;
  suffix?: Affix;
  onChange?: (evt: ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps>  = ({
  disabled,
  size,
  icon,
  prefix,
  suffix,
  style,
  ...restProps
}) => {
  const classes = classNames('yj-input-wrapper', {
    'is-disabled': disabled,
    [`yj-input-size-${size}`]: size,
    'yj-input-group': prefix || suffix,
    'yj-input-group-prefix': prefix,
    'yj-input-group-suffix': suffix
  });

  const fixControlledComp = (value: any) => (
    (value === null || typeof value === 'undefined')
      ? ''
      : value
  );

  if ('value' in restProps) {
    delete restProps.defaultValue;
    restProps.value = fixControlledComp(restProps.value);
  };

  return (
    <div className={classes} style={style}>
      {prefix && <div className="input-group-prefix">{ prefix }</div>}
      {
        icon && <div className="icon-wrapper">
                  <Icon icon={icon} title={`title-${icon}`} />
                </div>
      }
      <input
        className="yj-input-inner"
        disabled={disabled}
        {...restProps}
      />
      {suffix && <div className="input-group-suffix">{ suffix }</div>}
    </div>
  );
};

export default Input;

