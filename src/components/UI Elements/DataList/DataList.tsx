import React from 'react'

import './DataList.css';

export interface PROPS {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    placeholder?: string;
    id?: string;
    name?: string;
    listName: string;
    data: any[];
    useInDropDown: string;
}

const DataList = (props: PROPS) => {

  return (
    <div className='DataList'>
        <input list={props.listName} name={props.name} id={props.id} placeholder={props.placeholder} value={props.value} onChange={(e) => props.setValue(e.target.value) } onBlur={() => props.setValue('')} />
        <datalist id={props.listName}>
            {props.data.map(x => { return <option key={x.id} value={x[props.useInDropDown]}>{x.projectReference} </option> })}
        </datalist>
    </div>
  )
}

export default DataList