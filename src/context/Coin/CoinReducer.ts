import { CoinState } from "./CoinProvider";
type CoinActionType = 
| {type:'[UI] - Toggle SideBar',payload:boolean}
| {type:'[Coin] - selected coin',payload:{coins:any}}
| {type:'[Coin] - price coin',payload:{reverse:boolean}}
| {type:'[Coin] - values coin',payload:{value0:string,value1:string}}
| {type:'[Coin] - value coin 0',payload:{value0:string}}
| {type:'[Coin] - value coin 1',payload:{value1:string}}

export const CoinReducer = (state: CoinState, action: CoinActionType):CoinState => {
  switch (action.type) {
    case "[Coin] - selected coin":
      return {
        ...state,
        coins: action.payload.coins,
      };
    case "[Coin] - price coin":
      return {
        ...state,
        price: action.payload.reverse
          ? parseFloat(`${state.value1}`) / parseFloat(`${state.value0}`)
          : parseFloat(`${state.value0}`) / parseFloat(`${state.value1}`),
      };
    case "[Coin] - values coin":
      return {
        ...state,
        value0: action.payload.value0,
        value1: action.payload.value1,
      };
    case "[Coin] - value coin 0":
      return {
        ...state,
        value0: action.payload.value0,
      };
    case "[Coin] - value coin 1":
      return {
        ...state,
        value1: action.payload.value1,
      };

    default:
      return state;
  }
};
