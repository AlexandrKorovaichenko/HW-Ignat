import React, {useState} from 'react'
import {homeWorkReducer} from './bll/homeWorkReducer'
import SuperButton from '../h4/common/c2-SuperButton/SuperButton'
import style from "../../p1-main/m1-ui/u1-app/App.module.css"
import { userTypeAC } from "./bll/homeWorkReducer";


export type UserType = {
    _id: number
    name: string
    age: number
}

export type UsersType = Array<UserType>

const initialPeople = [
    {_id: 0, name: 'Кот', age: 3},
    {_id: 1, name: 'Александр', age: 66},
    {_id: 2, name: 'Коля', age: 16},
    {_id: 3, name: 'Виктор', age: 44},
    {_id: 4, name: 'Дмитрий', age: 40},
    {_id: 5, name: 'Ирина', age: 55},
]

function HW8() {

    const [people, setPeople] = useState<UsersType>(initialPeople)

    const finalPeople = people.map((p: UserType) => (
        <div key={p._id}>
            <span className = {style.spanName}> {p.name} </span>
            <span className = {style.spanAge}> {p.age} </span>
        </div>
    ))

    const sortUp    = () => setPeople( homeWorkReducer( initialPeople, { type : 'SORT-UP'}  ) )
    const sortDown  = () => setPeople( homeWorkReducer( initialPeople, { type: 'SORT-DOWN'} ) )
    const filterAge = () => setPeople( homeWorkReducer( initialPeople, { type: 'CHECK-AGE', payload: 18} ) )

    return (
        <div className = {style.hw8}>
            <hr/>
            homeworks 8

            {/*should work (должно работать)*/}
            {finalPeople}

            <div className = {style.buttonSort}>
                <SuperButton onClick={sortUp}>
                    sort up
                </SuperButton>
            </div>

            <div className = {style.buttonSort}>
                <SuperButton onClick={sortDown}>
                    sort down
                </SuperButton>
            </div>

            <div className = {style.buttonCheck}>
                <SuperButton onClick={filterAge}>
                    check 18
                </SuperButton>
            </div>

            

            <hr/>
            {/*для личного творчества, могу проверить*/}
            {/*<AlternativePeople/>*/}
            <hr/>
        </div>
    )
}

export default HW8
