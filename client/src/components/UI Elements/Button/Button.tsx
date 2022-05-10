import React, { useContext} from 'react'
import { UserContext } from '../../../Context/User-Context'
import { UserContextInterface } from '../../../models/models'

export interface Props {
    children: React.ReactNode;
    styles?: string;
    function: () => any;
}

const Button = (props: Props) => {

    const { user } = useContext(UserContext) as UserContextInterface;

    let hideButton = 'inline-block';
    if(user.isGuest && props.styles === 'dangerButton'){
        hideButton = 'none'
    }

  return (
    <button className={`${props.styles}`} style={{display: hideButton}} disabled={user.isGuest} onClick={() => props.function()}>{props.children}</button>
  )
}

export default Button