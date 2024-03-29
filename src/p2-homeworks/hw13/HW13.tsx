import React, {useState} from 'react'
import s from './HW13.module.css'
import s2 from '../../p1-main/m1-ui/u1-app/App.module.css'
import SuperButton from '../h4/common/c2-SuperButton/SuperButton'
import axios from 'axios'
import success200 from './images/200.svg'
import error400 from './images/400.svg'
import error500 from './images/500.svg'
import errorUnknown from './images/error.svg'

/*
* 1 - дописать функцию send
* 2 - дизэйблить кнопки пока идёт запрос
* 3 - сделать стили в соответствии с дизайном
* */

const HW13 = () => {

    const [code, setCode] = useState<string>('')
    const [text, setText] = useState<string>('')
    const [info, setInfo] = useState<string>('')
    const [image, setImage] = useState('')
    const [currentDisable, setDisable] = useState<boolean>(false)

    const send = (x?: boolean | null) => () => {
        const url = x === null
                ? 'https://xxxxxx.ccc' // имитация запроса на не корректный адрес
                : 'https://incubator-personal-page-back.herokuapp.com/api/3.0/homework/test'

        setCode('')
        setImage('')
        setText('')
        setInfo('...loading')
        setDisable(true)

        axios
            .post(url, {success: x})
            .then((res) => {
                setCode('Код 200!')
                setImage(success200)
                setText(res.data.errorText)
                setInfo(res.data.info)
                setDisable(false)
            })
            .catch((e) => {

                console.log('errore ' , e);
                
                if(e.response && e.response.status === 400){
                    setCode('Код 400!')
                    setImage(error400)
                    setText(e.response.data.errorText)
                    setInfo(e.response.data.info)
                }

                if(e.response && e.response.status === 500){
                    setCode('Код 500!')
                    setImage(error500)
                    setText("ошибка сервера")
                    setInfo("Коды 5xx выделены под случаи необработанных исключений при выполнении операций на стороне сервера")
                }


               

                if(e.response && e.response.status === 0){ 
                    setCode('Код 0!')
                    setImage(errorUnknown)
                    setText("неизвестная ошибка")
                    setInfo("недокументированная ошибка возникает, когда программист рукожоп :)")
                }

                setDisable(false)

            })

    }




    return (
        <div id={'hw13'}>

            <div className={s2.hwTitle}>Homework #13</div>
            <div className={s2.hLine}></div>
            <div className={s2.hw}>

                <div className={s.buttonsContainer}>

                    <SuperButton id={ 'hw13-send-true' }
                            onClick={ send(true) }
                            xType={ 'secondary' }
                            disabled = {currentDisable}
                            className = {currentDisable ? "noActive" : "active"}
                        >Send true</SuperButton>

                    <SuperButton id={'hw13-send-false'}
                            onClick={send(false)}
                            xType={'secondary'}
                            disabled = {currentDisable}
                            className = {currentDisable ? "noActive" : "active"}
                        >Send false</SuperButton>

                    <SuperButton id={'hw13-send-undefined'}
                            onClick={send(undefined)}
                            xType={'secondary'}
                            disabled = {currentDisable}
                            className = {currentDisable ? "noActive" : "active"}
                        >Send undefined</SuperButton>

                    <SuperButton id={'hw13-send-null'}
                            onClick={send(null)} // имитация запроса на не корректный адрес
                            xType={'secondary'}
                            disabled = {currentDisable}
                            className = {currentDisable ? "noActive" : "active"}
                        >Send null</SuperButton>

                </div>

                <div className={s.responseContainer}>
                    
                    <div className={s.imageContainer}>
                        {image && <img src={image} className={s.image} alt="status"/>}
                    </div>

                    <div className={s.textContainer}>

                        <div id={'hw13-code'} className={s.code}>
                            {code}
                        </div>

                        <div id={'hw13-text'} className={s.text}>
                            {text}
                        </div>

                        <div id={'hw13-info'} className={s.info}>
                            {info}
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default HW13
