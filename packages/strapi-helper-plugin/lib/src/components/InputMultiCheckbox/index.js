/**
 *
 * InputCheckbox
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import InputCheckboxWithErrors from 'components/InputCheckboxWithErrors';
import Label from 'components/Label';

import styles from './styles.scss';

/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/label-has-for */
class InputMultiCheckbox extends React.Component {
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
      onChange,
      style,
      value,
      tabIndex,
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
                multiselect={true} 
                value={value ? value[lowercaseKey] : false} 
                label={currentKey}
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
                key={keyIndex}
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
};

export default InputMultiCheckbox;
