import { UsersType, UserType } from "../HW8";


export type userTypeAC = {
    type: "SORT-UP" | "SORT-DOWN" | "CHECK-AGE"
    payload?: number
}


function sortNameUP(a: UserType, b: UserType):number { 
    return a.name.localeCompare(b.name);
}


function sortNameDOWN(a: UserType, b: UserType):number {
    return b.name.localeCompare(a.name);
}


export const homeWorkReducer = (state: UsersType, action: userTypeAC): UsersType => { 
    
    switch (action.type) {


        case 'SORT-UP': {
            let newState = state.map(element => {
                return {...element}
            })
            newState = newState.sort(sortNameUP);
            return newState;
        }


        case 'SORT-DOWN': {
            let newState = state.map(element => {
                return {...element}
            })

            console.log(newState);
            newState = newState.sort(sortNameDOWN);
            return newState;
        }


        case 'CHECK-AGE': {
            let newState = state.map(element => {
                return {...element}
            })
            
            newState = newState.filter(element => {
                if(action.payload){
                    return element.age >= action.payload;
                } else return true;
            });

            return newState;
        }


        default: return state

    }
}