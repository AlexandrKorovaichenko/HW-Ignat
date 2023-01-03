import React, {useState} from 'react'
import SuperRange from './common/c7-SuperRange/SuperRange'
import SuperDoubleRange from './common/c8-SuperDoubleRange/SuperDoubleRange'
import styleDoudleRange from './common/c8-SuperDoubleRange/SuperDoubleRange.module.css'

function HW11() {


    const [value1, setValue1] = useState(0)
    const [value2, setValue2] = useState<[number, number]>([0, 100])


    const onChangeRangeHandler = (value: number) => {
        setValue1(value)
        setValue2([value, value2[1]])
    }

    const onChangeRangeHandler1 = (value: [number, number]) => {
        setValue1(value[0])
        setValue2(value)
    }

    return (
        <div>
            <hr/>
            homeworks 11
        
            <div>
                <span>{value1}</span>
                <SuperRange onChangeRange = {onChangeRangeHandler} value = {value1} />
            </div>

            <div className = {styleDoudleRange.doubleRangeConatainer} >
                <span> { value2[0] } </span>
                    <SuperDoubleRange onChangeRange = {onChangeRangeHandler1} value = {value2} />
                <span> { value2[1] } </span>
            </div>

            {/*<hr/>*/}
            {/*для личного творчества, могу проверить*/}
            {/*<AlternativeSuperRange/>*/}
            {/*<AlternativeSuperDoubleRange/>*/}
            {/*<hr/>*/}
        </div>
    )
}

export default HW11
