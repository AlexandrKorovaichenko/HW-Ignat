import React from 'react'
import classStyle from './Message.module.css'

export type MessagePropsType = {
    avatar: string
    name: string
    message: string
    time: string
}

function Message(props: MessagePropsType) {

    return (
        <div>
            <div className = {classStyle.messageContainer}>

                <div className = {classStyle.avatar}>
                    <img src={props.avatar}/>
                </div>

                <div className = {classStyle.message}>
                    <div className = {classStyle.nameUser}>name</div>
                    <div className = {classStyle.messageUser}>message</div>
                    <div className = {classStyle.timeMessage}>time</div>
                </div>

            </div>
        </div>
    )

}

export default Message
