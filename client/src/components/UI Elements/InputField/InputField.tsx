import React from 'react'

import './InputField.css'

export interface Props {
    label: string;
    placeholder: string;
    value: string;
    as: string;
    updateValue: React.Dispatch<React.SetStateAction<string>>;
}
const InputField = (props: Props) => {
  return (
    <div className='InputField'>
        <label> { props.label} </label><br/>
        <input type={props.as} 
            placeholder={props.placeholder} 
            value={props.value} 
            onChange={(e) => props.updateValue(e.target.value)} 
        />
    </div>
  )
}

export default InputField