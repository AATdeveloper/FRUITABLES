import React from 'react';
import { BaseButton } from './Button.Style';
function Button({children}) {
    return (
      <BaseButton>
      {children}
      </BaseButton>
    );
}

export default Button;