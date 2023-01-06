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

    let widthDoubleRangeElement = 0;
    let marginLeftDoubleRangeElement = 0;
    let rollerLeftWidth = 0;
    let rollerRightWidth = 0;

    
    const findDoubleRangeElement = document.getElementById("doubleRangeInput");
    if(findDoubleRangeElement){
        widthDoubleRangeElement = findDoubleRangeElement.getBoundingClientRect().width;
        marginLeftDoubleRangeElement = findDoubleRangeElement.getBoundingClientRect().left;
    }

    
    const rollerLeftElement = document.getElementById("rollerLeft");
    if(rollerLeftElement){
        rollerLeftWidth = rollerLeftElement.getBoundingClientRect().width;
    } else {
        rollerLeftWidth = 0;
    }


    const rollerRightElement = document.getElementById("rollerRight");
    if(rollerRightElement){
        rollerRightWidth = rollerRightElement.getBoundingClientRect().width;
    } else {
        rollerRightWidth = 0;
    }


    //++ Синхронизация Левого бегунка
    let posRollerLeft = 0
    if(value && rollerLeftElement){ 
        const step = 100 / (widthDoubleRangeElement - rollerLeftWidth);
        posRollerLeft = value[0] / step - marginLeftDoubleRangeElement;
        posRollerLeft = Math.round(posRollerLeft)

        if(posRollerLeft <= 0 ) { 
            posRollerLeft = 0 
        }else if(posRollerLeft >= widthDoubleRangeElement - rollerLeftWidth) { 
            posRollerLeft = widthDoubleRangeElement - rollerLeftWidth
        }
    
        rollerLeftElement.style.left = String(posRollerLeft) + "px";
    }
    //-- Синхронизация Левого бегунка

    
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
            posRollerLeft = event.pageX - differenceLeft - marginLeftDoubleRangeElement;

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
