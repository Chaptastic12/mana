import React, { useState, useEffect, useRef, useContext } from 'react'
import { UserContext } from '../../Context/User-Context';
import { UserContextInterface } from '../../models/models';

import './EditableInput.css'

export interface PROPS {
    hasLabel: boolean;
    label?: string;
    field: string;
    text: string;
    type: String;
    editTicketField: Function;
}
const EditableInput = (props: PROPS) => {

    const [ fieldText, setFieldText ] = useState(props.text);
    const [ clicked, setClicked ] = useState(false);
    const { user } = useContext(UserContext) as UserContextInterface;

    const inputRef = useRef<HTMLInputElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setFieldText(props.text);
    }, [props.text])

    const handleBlur = () => {
        setClicked(false);
        props.editTicketField(fieldText, props.field);
    }

    const spanClickHandler = () => {
        //Add check to see if user is allowed to edit fields
        if(!user.isGuest){
            setClicked(true);
            if(props.type === 'input') { setTimeout(() => inputRef.current?.focus(), 100 ) } else
            if(props.type === 'textarea') { setTimeout(() => textAreaRef.current?.focus(), 100 ) }
        }
    }
    
    let fieldToUse;
    if(props.type === 'input'){ fieldToUse = <input className='EditableInput__Input' ref={inputRef} value={ fieldText } onChange={(e) => setFieldText(e.target.value)} onBlur={() => handleBlur()} /> } else
    if(props.type === 'textarea') { fieldToUse = <textarea rows={1}cols={100} className='EditableInput__Input' ref={textAreaRef} value={ fieldText }  onChange={(e) => setFieldText(e.target.value)} onBlur={() => handleBlur()} /> }

    return (
        <div className='EditableInput'>
            { props.hasLabel && <label> { props.label } </label>}
            { !clicked ? <div className='EditableInput__Text' style={{ whiteSpace: 'pre-line' }} onClick={() => spanClickHandler() }>{ props.text }</div> : fieldToUse }
        </div>
        )
}

export default EditableInput