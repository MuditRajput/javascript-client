import React from 'react';
import Style from './style';

const TextField = (Props) => {
  const { input, highlight } = Style();
  const { defaultValue, disabled, error } = Props;
  let style;
  if (error) {
    style = { ...input, ...highlight };
  } else {
    style = { ...input };
  }
  return (
    <>
      <input type="text" defaultValue={defaultValue} disabled={disabled} className="input" style={style} />
    </>
  );
};

export default TextField;
