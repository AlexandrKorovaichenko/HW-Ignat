import React, {useState} from 'react'
import Affairs from './Affairs'

// types
export type AffairPriorityType = 'high' | 'middle' | 'low' ;
export type MyAffairType = Array<AffairType>;
export type AffairType = {
    _id: number
    name: string
    priority: string
} 
export type FilterType = 'all' | AffairPriorityType



// constants
const defaultAffairs: MyAffairType = [ 
    {_id: 1, name: 'React', priority: 'high'},
    {_id: 2, name: 'anime', priority: 'low'},
    {_id: 3, name: 'games', priority: 'low'},
    {_id: 4, name: 'work', priority: 'high'},
    {_id: 5, name: 'html & css', priority: 'middle'},
]

// pure helper functions
export const filterAffairs = (affairs: MyAffairType, filter: FilterType): MyAffairType => { 
    if (filter === 'all') return affairs
    else return affairs.filter((element) => {return element.priority === filter} )
}
export const deleteAffair = (affairs: MyAffairType, _id: number): MyAffairType => { 
    return affairs.filter((element) => {return element._id !== _id})
}

function HW2() {
    const [affairs, setAffairs] = useState<MyAffairType>(defaultAffairs) 
    const [filter, setFilter] = useState<FilterType>('all')

    const filteredAffairs = filterAffairs(affairs, filter)
    const deleteAffairCallback = (_id: number) => setAffairs(deleteAffair(affairs, _id)) 

    return (
        <div>
            <hr/>
            homeworks 2

            {/*should work (должно работать)*/}
            <Affairs
                data={filteredAffairs}
                setFilter={setFilter}
                deleteAffairCallback={deleteAffairCallback}
            />

            <hr/>
            {/*для личного творчества, могу проверить*/}
            {/*<AlternativeAffairs/>*/}
            <hr/>
        </div>
    )
}

export default HW2
