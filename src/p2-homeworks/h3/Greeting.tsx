import React, { ChangeEvent, KeyboardEvent, KeyboardEventHandler } from 'react'
import s from './Greeting.module.css'

type GreetingPropsType = {
    name: string
    setNameCallback: (event: ChangeEvent<HTMLInputElement>) => void
    onKeyPressHundler:  (event: KeyboardEvent<HTMLInputElement>) => void
    addUser: () => void
    error: string
    totalUsers: number
}

// презентационная компонента (для верстальщика)
const Greeting: React.FC<GreetingPropsType> = (
        {name, setNameCallback, onKeyPressHundler, addUser, error, totalUsers} // деструктуризация пропсов
    ) => {
        const inputClass = error ? s.error : s.someClass;

        return (
            <div>
                <input value = {name} onChange = {setNameCallback} onKeyPress = {onKeyPressHundler} className = {inputClass}/>
                <span>{error}</span>
                <button disabled = {!(name.length>0)} onClick = {addUser}>add</button>
                <span>{totalUsers}</span>
            </div>
        )
    }

export default Greeting
