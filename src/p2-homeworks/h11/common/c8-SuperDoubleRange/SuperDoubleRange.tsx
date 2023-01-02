import React, { MouseEvent, useEffect, useRef, useState } from 'react'
import styleDoudleRange from './SuperDoubleRange.module.css'

type SuperDoubleRangePropsType = {
    onChangeRange?: (value: [number, number]) => void
    value?: [number, number]
    // min, max, step, disable, ...
}

const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = (
    {
        onChangeRange, 
        value,
        // min, max, step, disable, ...
    }
) => {

    const [widthDoubleRangeElement, setWidthDoubleRange] = useState<number>(0)
    const [marginLeftDoubleRangeElement, setMarginLeftDoubleRangeElement] = useState<number>(0)
    
    const [rollerLeftElement, setRollerLeftElement] = useState<HTMLElement>()
    const [rollerLeftWidth, setWidthRollerLeftElement] = useState<number>(0)

    const [rollerRightElement, setRollerRightElement] = useState<HTMLElement>()
    const [rollerRightWidth, setWidthRollerRightElement] = useState<number>(0)

    useEffect(() => {

        if(!widthDoubleRangeElement || !marginLeftDoubleRangeElement) { 
            let findElement = document.getElementById("doubleRangeInput");
            if(findElement){ 
                setWidthDoubleRange(findElement.getBoundingClientRect().width);
                setMarginLeftDoubleRangeElement(findElement.getBoundingClientRect().left);
            }
        }

        if(!rollerLeftElement || !rollerLeftWidth){ 
            let findElement = document.getElementById("rollerLeft");
            if(findElement){ 
                setRollerLeftElement(findElement); 
                setWidthRollerLeftElement(findElement.getBoundingClientRect().width)
            }
        }

        if(!rollerRightElement || !rollerRightWidth) { 
            let findElement = document.getElementById("rollerRight");
            if(findElement){ 
                setRollerRightElement(findElement); 
                setWidthRollerRightElement(findElement.getBoundingClientRect().width)
            }
        }

    }, [])


    //События нажатия мыши
    const onMouseDownHandlerElementLeft = (event: any) => { 
        document.addEventListener('mousemove', onMouseMoveElementLeft);
        document.addEventListener('mouseup', onMouseUpHandlerElementLeft);
    }

    const onMouseDownHandlerElementRight = (event: any) => {
        document.addEventListener('mousemove', onMouseMoveElementRight);
        document.addEventListener('mouseup', onMouseUpHandlerElementRight);
    }

    //Gеремещениt левого бегунка
    let differenceLeft: number = 0;
    function onMouseMoveElementLeft(event: any) {

        if(!differenceLeft && rollerLeftElement) {
            differenceLeft = (event.pageX - rollerLeftElement.getBoundingClientRect().left)
        }
        
        if(rollerLeftElement) {
            
            let posRollerLeft = 0

            //Определаем интервал между курсором и левым краем бегунка.
            if(differenceLeft > 0){
                posRollerLeft = event.pageX - differenceLeft - marginLeftDoubleRangeElement;
            } else {
                posRollerLeft = event.pageX - marginLeftDoubleRangeElement;
            }

            //Проверяем границы за которые бегунок не должен выходить.
            if(posRollerLeft <= 0 ) { 
                posRollerLeft = 0 
            }else if(posRollerLeft >= widthDoubleRangeElement - rollerLeftWidth) { 
                posRollerLeft = widthDoubleRangeElement - rollerLeftWidth
            }

            //Устанавливаем бегунок на новую позицию.
            rollerLeftElement.style.left = String(posRollerLeft) + "px";

            const step = 100 / (widthDoubleRangeElement - rollerLeftWidth);
            const newValueSpanLeft = (event.pageX + differenceLeft - rollerLeftWidth) * step;

            if(value && onChangeRange && newValueSpanLeft >= 0 && newValueSpanLeft <= 100){
                const newValue: [number, number] = [...value];    
                newValue[0] = Math.round(newValueSpanLeft)
                onChangeRange(newValue);
            }
        }
    }

    //Перемещениt правого бегунка
    let differenceRight: number = 0;
    function onMouseMoveElementRight(event: any) {

            if(!differenceRight && rollerRightElement) {
                differenceRight = (rollerRightElement.getBoundingClientRect().right - event.pageX)
            }
            
            if(rollerRightElement) {

                let posRollerRight = 0
    
                //Определаем интервал между курсором и правым краем бегунка.
                if(differenceRight > 0){
                    posRollerRight = widthDoubleRangeElement + marginLeftDoubleRangeElement - (event.pageX + differenceRight);
                } else {
                    posRollerRight = widthDoubleRangeElement + marginLeftDoubleRangeElement - event.pageX;
                }

                //Проверяем границы за которые бегунок не должен выходить.
                if(posRollerRight <= 0 ) { 
                    posRollerRight = 0
                } else if(posRollerRight >= widthDoubleRangeElement - rollerRightWidth) { 
                    posRollerRight = widthDoubleRangeElement - rollerRightWidth
                }
    
                // Устанавливаем бегунок на новую позицию.
                rollerRightElement.style.right = String(posRollerRight) + "px";

                const step = 100 / (widthDoubleRangeElement - rollerRightWidth);
                const newValueSpanRight =  (event.pageX + differenceRight - rollerRightWidth) * step;

                if(value && onChangeRange && newValueSpanRight >= 0 && newValueSpanRight <= 100){
                    const newValue: [number, number] = [...value];    
                    newValue[1] = Math.round(newValueSpanRight)
                    onChangeRange(newValue);
                }

            }
        }
    

    //События отжатия мыши
    const onMouseUpHandlerElementLeft = () => {
        document.removeEventListener('mousemove', onMouseMoveElementLeft);
        document.removeEventListener('onmouseup', onMouseMoveElementLeft);
        differenceLeft = 0;
        differenceRight = 0;
        //document.onmouseup = null;
    };

    const onMouseUpHandlerElementRight = () => {
        console.log(12345);
        document.removeEventListener('mousemove', onMouseMoveElementRight);
        document.removeEventListener('onmouseup', onMouseMoveElementLeft);
        differenceLeft = 0;
        differenceRight = 0;
        //document.onmouseup = null;
    };

    return (
        <div>
            <div id="doubleRangeInput" className = {styleDoudleRange.doubleRangeInput} >
                <div id = "rollerLeft" onMouseDown = { (event) => onMouseDownHandlerElementLeft(event) } ></div>
                <div id = "rollerRight" onMouseDown = { (event) => onMouseDownHandlerElementRight(event) }></div>
            </div>
        </div>
    )
}

export default SuperDoubleRange
