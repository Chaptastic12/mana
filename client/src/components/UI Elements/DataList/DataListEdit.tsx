import React, { useState, useContext } from 'react'
import { UserContext } from '../../../Context/User-Context';
import { UserContextInterface } from '../../../models/models';

import './DataList.css';

export interface PROPS {
    value: string;
    setValue: any;
    placeholder?: string;
    id?: string;
    name?: string;
    listName: string;
    data: any[];
    title: string;
}

const DataListEdit = (props: PROPS) => {
    const [ clicked, setClicked ] = useState<boolean>(false);
    const { user } = useContext(UserContext) as UserContextInterface;

    let options;
    if(props.name === 'status'){
        options = props.data.map(x => { return <option key={x.val} value={x.val}>{x.val}</option> } )
    } else {
        options = props.data.map( x => { return <option key={x.id} value={x.username} />})
    }

  return (
    <div className='DataList'>
        <div style={{marginRight: '5px'}}> { props.title }: </div>
        { !clicked ? <div onClick={() => !user.isGuest && setClicked(true)}> { props.value } </div> : <>
            <input list={props.listName} name={props.name} id={props.id} placeholder={props.placeholder} onChange={(e) => props.setValue(e.target.value) } onBlur={() => setClicked(false)}/>
            <datalist id={props.listName}>
                { options }
            </datalist> 
        </>}
    </div>
  )
}

export default DataListEdit