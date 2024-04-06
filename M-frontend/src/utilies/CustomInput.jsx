import React from "react";

function CustomInput(props) {
  const {
    type,
    label,
    id,
    className,
    name,
    value,
    onChange,
    onBlur,
    autoComplete,
    accept
  } = props;

  return (
    <>
      <div>
        <input
          type={type}
          className={` ${className}`}
          id={id}
          placeholder={label}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          accept={accept}
        />
      </div>
    </>
  );
}

export default CustomInput;
