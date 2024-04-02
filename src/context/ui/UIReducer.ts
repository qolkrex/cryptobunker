import { UIState } from './UIProvider';

type UIActionType = 
| {type:'[UI] - Toggle SideBar',payload:boolean}

export const UIReducer = (state:UIState,action:UIActionType):UIState => { 
    switch (action.type) {
        case '[UI] - Toggle SideBar':
            return {
                ...state,
                sideBarOpen:action.payload
            };
    
        default:
            return state;
    }
 }