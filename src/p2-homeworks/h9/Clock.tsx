import React, {useState} from 'react'
import SuperButton from '../h4/common/c2-SuperButton/SuperButton'


type objDateType = {
    day:     string
    month:   string
    year:    string
    hours:   string
    minutes: string
    seconds: string
}


function Clock() {
    
    const [timerId, setTimerId] = useState<number>(0)
    const [date, setDate] = useState<Date>(new Date)
    const [show, setShow] = useState<boolean>(false)

    const stop = () => {
        clearInterval(timerId)
    }

    const start = () => {
        stop()
        const id: number = window.setInterval(() => {
            setDate(new Date);
        }, 1000)
        setTimerId(id)
    }

    const onMouseEnter = () => {
        setShow(true)
        console.log("show")
    }
    const onMouseLeave = () => {
        setShow(false)
        console.log("close")
    }

    const getDateFormat = (val: string) => {
            return val.length === 1 ? "0"+val : val;
    }
    
    let objDate: objDateType = {
            day:     getDateFormat(String(date.getDate())),
            month:   getDateFormat(String(date.getMonth())),
            year:    getDateFormat(String(date.getFullYear())),
            hours:   getDateFormat(String(date.getHours())),
            minutes: getDateFormat(String(date.getMinutes())),
            seconds: getDateFormat(String(date.getSeconds())),
        }

    const stringDate = objDate.day + ":" + objDate.month + ":" + objDate.year;
    const stringTime = objDate.hours + ":" + objDate.minutes + ":" + objDate.seconds

    return (
        <div>
            <div
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                {stringTime}
            </div>

            {show && (
                <div>
                    {stringDate}
                </div>
            )}

            <SuperButton onClick={start}>start</SuperButton>
            <SuperButton onClick={stop}>stop</SuperButton>

        </div>
    )
}

export default Clock
