import React from 'react'
import { Comment } from '../../models/models';
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { v4 as uuid} from 'uuid'

import './Comment.css';
import { randomUUID } from 'crypto';

export interface Props {
    comment: Comment;
    deleteComment: () => any;
}
const CommentDiv = (props: Props) => {
  return (
    <div style={{paddingBottom: '20px'}}>
            <div className='CommentDiv' key={uuid()}>
                <div className='CommentDiv__Author'>Posted by: { props.comment.author.username } <div className='deleteIcon' onClick={() => props.deleteComment()}> <AiOutlineCloseCircle /></div></div>
                <div className='CommentDiv__Comment' style={{ whiteSpace: 'pre-line' }}>{ props.comment.comment }</div>
                <hr />
                <div className='CommentDiv__Date'>Created on: { props.comment.createdDate }</div>
            </div>
        </div>
    )
}

export default CommentDiv