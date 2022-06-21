import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import Greeting from './Greeting'

type GreetingContainerPropsType = {
    users: Array<string>
    addUserCallback: (name: string) => void
}

const GreetingContainer: React.FC<GreetingContainerPropsType> = ({users, addUserCallback}) => { 
    
    const [name, setName] = useState<string>('') 
    const [error, setError] = useState<string>('') 

    const setNameCallback = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
    }


    const onKeyPressHundler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter") { addUser() }
    }

    const addUser = () => {
        let newName = (name).trim();    
        if(newName) { 
            addUserCallback(newName); setName("")
        } else { 
            setName(newName); setError("Ошибка! Имя не добавлено! ");
        }
    }

    const totalUsers = users.length;

    return (
        <Greeting
            name = {name}
            setNameCallback = {setNameCallback}
            onKeyPressHundler = {onKeyPressHundler}
            addUser = {addUser}
            error = {error}
            totalUsers = {totalUsers}
        />
    )
}

export default GreetingContainer
