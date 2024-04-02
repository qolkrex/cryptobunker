import { Web3State } from './Web3Provider';

type Web3ActionType = 
| {type:'[Web3] - provider',payload:{web3:any,provider:any,providerString:string}}
| {type:'[Web3] - account',payload:string}
| {type:'[Web3] - chainId',payload:number}
| {type:'[Web3] - token',payload:{authToken:string,authTimeOut:string}}

export const Web3Reducer = (state:Web3State,action:Web3ActionType):Web3State => { 
    switch (action.type) {
        case "[Web3] - provider":
          return {
            ...state,
            wallet: action.payload.web3,
            provider: action.payload.provider,
            providerString: action.payload.providerString,
          };
        case "[Web3] - account":
          return {
            ...state,
            account: action.payload,
          };
    
        case "[Web3] - chainId":
          return {
            ...state,
            chainId: action.payload,
          };
        case "[Web3] - token":
          return {
            ...state,
            authToken: action.payload.authToken,
            authTimeOut: action.payload.authTimeOut,
          };
        default:
          throw new Error()
      }
 }