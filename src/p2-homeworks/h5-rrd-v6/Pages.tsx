import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import PreJunior from './pages/PreJunior'

export const PATH = {
    LITTLE_JUNIOR:  '/little-jun',
    SIMPLE_JUNIOR:  '/simple-jun',
    BIG_JUNIOR:     '/big-jun',
}

function Pages() {
    return (
        <div>
            {/*Routes выбирает первый подходящий роут*/} 
            <Routes>
                {/*в начале мы попадаем на страницу '/' и переходим сразу на страницу PRE_JUNIOR*/}
                {/*<Route path = {'/'} element = {<Navigate to = {PATH.LITTLE_JUNIOR}/>}/>*/}
                <Route path = {PATH.LITTLE_JUNIOR} element = {<PreJunior />}/>
                {/*он отрисуется если пользователь захочет попасть на несуществующую страницу*/}
                {/*<Route path={'/*'} element={<Error404/>}/>*/}
            </Routes>
        </div>
    )
}

export default Pages
