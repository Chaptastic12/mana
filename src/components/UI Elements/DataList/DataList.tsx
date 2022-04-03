import React from 'react'
import { useNavigate } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5'

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
    link: string;
}

const DataList = (props: PROPS) => {
    const navigate = useNavigate();

  return (
    <div className='DataList'>
        <div className='DataList__Icon'><IoSearchOutline /></div><input list={props.listName} name={props.name} id={props.id} placeholder={props.placeholder} value={props.value} onChange={(e) => { props.setValue(e.target.value); navigate(props.link + e.target.value) } } onBlur={() => props.setValue('')} />
        <datalist id={props.listName}>
            {props.data.map(x => { return <option key={x.id} value={x.projectReference} > {x[props.useInDropDown]} </option> })}
        </datalist>
    </div>
  )
}

export default DataList