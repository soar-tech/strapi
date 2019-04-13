/**
 *
 * InputCheckbox
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { isEmpty, isFunction, isObject } from 'lodash';
import InputCheckboxWithErrors from 'components/InputCheckboxWithErrors';
import Label from 'components/Label';
import cn from 'classnames';

import styles from './styles.scss';

/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/label-has-for */
class InputObject extends React.Component {
  handleChange = () => {
    const target = {
      name: this.props.name,
      type: 'checkbox',
      value: !this.props.value,
    };

    this.props.onChange({ target });
  }

  render() {
    const {
      autoFocus,
      className,
      disabled,
      name,
      label,
      labelStyle,
      labelClassName,
      onBlur,
      onFocus,
      style,
      tabIndex,
      value,
      onChange,
      validations: { object }
    } = this.props;

    return (
      <div className={styles.multiSelectContainer}>
        <Label
          className={labelClassName}
          htmlFor={name}
          message={label}
          style={labelStyle}
        />
        <div className={styles.multiSelect}>
          <div className="row">
          {Object.keys(object).map(function (keyName, keyIndex) {
            const lowercaseKey = object[keyName].toLowerCase();
            const currentKey = object[keyName];
            return (
              <InputCheckboxWithErrors 
                value={value[lowercaseKey]} 
                label={label}
                autoFocus={autoFocus}
                className={className}
                disabled={disabled}
                name={currentKey}
                onBlur={e => {
                  value[lowercaseKey] = e.target.checked;
                  const newData = {
                    target: {
                      value: value,
                      name: name
                    }
                  }
                  onBlur(newData);
                }}
                onFocus={onFocus}
                style={style}
                tabIndex={tabIndex}
                onChange={e => {
                  value[lowercaseKey] = e.target.checked;
                  const newData = {
                    target: {
                      value: value,
                      name: name
                    }
                  }
                  onChange(newData);
                }}
              />
            )
          })}
          </div>
        </div>
      </div>
    )
  }
}

InputObject.defaultProps = {
  autoFocus: false,
  className: '',
  disabled: false,
  label: '',
  onBlur: () => {},
  onFocus: () => {},
  style: {},
  tabIndex: '0',
  value: {},
};

InputObject.propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.shape({
      id: PropTypes.string,
      params: PropTypes.object,
    }),
  ]),
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  style: PropTypes.object,
  tabIndex: PropTypes.string,
  value: PropTypes.object,
};

export default InputObject;
