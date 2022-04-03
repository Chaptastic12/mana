import React, { useState, useRef } from 'react'

import './EditableInput.css'

export interface PROPS {
    hasLabel: boolean;
    label?: string;
    field: string;
    text: string;
    editTicketField: Function;
}
const EditableInput = (props: PROPS) => {

    const [ fieldText, setFieldText ] = useState(props.text);
    const [ clicked, setClicked ] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleBlur = () => {
        setClicked(false);
        props.editTicketField(fieldText, props.field);
    }

    return (
        <div className='EditableInput'>
            { props.hasLabel && <label> { props.label } </label> }
            { !clicked ? <span onClick={() => { setClicked(true); setTimeout(() => inputRef.current?.focus(), 100 ) } }>{ props.text }</span> : <input className='EditableInput__Input' ref={inputRef} value={ fieldText } onChange={(e) => setFieldText(e.target.value)} onBlur={() => handleBlur()} /> }
        </div>
        )
}

export default EditableInput