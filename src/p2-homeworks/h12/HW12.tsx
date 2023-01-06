import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppStoreType } from "../h10/bll/store";
import SuperSelect from "../h7/common/c5-SuperSelect/SuperSelect";
import { changeThemeAC, ThemeStateType } from "./bll/themeReducer";
import s from "./HW12.module.css";

function HW12() {

    const themeState = useSelector<AppStoreType, ThemeStateType>(
        state => state.themeReducer
    );

    let themeActive = "";
    if(themeState.themeActive) {
        themeActive = themeState.themeActive;
    }

    let themes = ["red"];
    if(themeState.themes.length) {
        themes = themeState.themes;
    }

    const dispatch = useDispatch();

    const onChangeCallback = (newThemeName: string) => {
        const action = changeThemeAC(newThemeName);
        dispatch(action);
    }

    return (
        <div className={s[themeActive]}>
            <hr/>
            <span className={s[themeActive + '-text']}>
                homeworks 12
            </span>

            <div>
                <SuperSelect options={themes}
                    onChangeOption = {onChangeCallback}
                />
            </div>


            <hr/>
        </div>
    );
}

export default HW12;
