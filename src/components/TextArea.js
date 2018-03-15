import React, {PropTypes} from 'react';

const TextArea = ({name, label, onChange, value, error}) => {
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass += ' ' + 'has-error';
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <textarea
          name={name}
          className="form-control"
          style={{resize:'none'}}
          value={value}
          onChange={onChange}
          rows="4"/>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string
};

export default TextArea;
