import React, { useEffect } from 'react'
import SuperButton from '../h4/common/c2-SuperButton/SuperButton'
import { SetLoadingActionCreator } from "../h10/bll/loadingReducer"
import { useDispatch, useSelector } from 'react-redux';
import { AppStoreType } from './bll/store';
//import store from "./bll/store"

function HW10() {

    // useSelector, useDispatch
    const dispatch = useDispatch();
    const loading = useSelector((store: AppStoreType) => { return store.loadingReducer.loading; });

    const setLoading = () => {
        dispatch(SetLoadingActionCreator(loading));
    };

    useEffect(() => { 
        if(loading) {
                setTimeout(() => {
                dispatch(SetLoadingActionCreator(loading));
            }, 2000);
        }
    })

    return (
        <div>
            <hr/>
            homeworks 10

            {/*should work (должно работать)*/}
            {loading
                ? (
                    <div>крутилка...</div>
                ) : (
                    <div>
                        <SuperButton onClick={setLoading}>set loading...</SuperButton>
                    </div>
                )
            }

            <hr/>
            {/*для личного творчества, могу проверить*/}
            {/*<Alternative/>*/}
            <hr/>
        </div>
    )
}

export default HW10
