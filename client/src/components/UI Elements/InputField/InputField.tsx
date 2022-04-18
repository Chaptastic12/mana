import React from 'react'

import './InputField.css'

export interface Props {
    label: string;
    placeholder: string;
    value: string;
    updateValue: React.Dispatch<React.SetStateAction<string>>;
}
const InputField = (props: Props) => {
  return (
    <div>
        <label> { props.label} </label>
        <input type='text' 
            placeholder={props.placeholder} 
            value={props.value} 
            onChange={(e) => props.updateValue(e.target.value)} 
        />
    </div>
  )
}

export default InputField