
export type ThemeStateType = {
    themes: Array<string>
    themeActive: string
}

const initState: ThemeStateType = {
    themes: ["dark", "red", "some"],
    themeActive: "dark"
};

type SetThemeType = {
    type: "SET-THEME"
    themeName: string
}

export const changeThemeAC = (themeName: string): SetThemeType => {
    return { type: "SET-THEME",
             themeName
            } as const
};

export const themeReducer = (state: ThemeStateType = initState, action: SetThemeType): ThemeStateType => {
    switch (action.type) {
        case "SET-THEME": {
            return {...state, themeActive: action.themeName};
        }
        default: return state;
    }
};