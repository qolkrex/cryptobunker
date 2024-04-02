import { TOKEN_ARRAY } from "../config/constants/tokens";
import { PAIRS } from "../config/index";
import { TOKENS } from "../config/index";
import { amountBigReverse } from "./bigNumber";
import { combinations } from "./combinations";

export type Coin = 'CELO' | 'CUSD' | 'FIRU'
type Tok = keyof typeof TOKENS;
type PairsKey = keyof typeof PAIRS;

// export const getAmountReserves = (reserves:any, token0:string, token1:string, amount:string) => {
//   const filter = TOKEN_ARRAY.filter(
//     (arr) => token0 !== arr && token1 !== arr && arr
//   );
//   const combination = combinations(filter);
//   const data = getPair(reserves, combination, token0, token1);
//   // const routes = getRoutes(data, amount);

//   let i = 0;
//   for (let index = 0; index < routes.length; index++) {
//     if (routes[index].recivided > routes[i].recivided) {
//       i = index;
//     }
//   }
//   if (routes.length > 0)
//     routes[i].recivided =
//       routes[i] !== undefined && routes[i]?.recivided.toFixed(6).toString();

//   return routes[i];
// };

const getPair = (reserves:any, combination:string[], token0:string, token1:string) => {
  const data = [];
  combination.map((pairs) => {
    const elements = {
      element: {},
      bandera: true,
    };
    const tokens = {
      init: "",
      end: "",
    };

    for (let i = 0; i < pairs.length + 1; i++) {
      tokens.init = pairs[0] === pairs[i] ? token0 : tokens.end;
      tokens.end = pairs[i] === undefined ? token1 : pairs[i];
      const resolve = setPair(reserves, i, tokens.init, tokens.end);
      if (!resolve) {
        elements.bandera = false;
        break;
      }
      elements.element = {
        ...elements.element,
        ...resolve,
      };
    }
    elements.bandera && data.push(elements.element);
  });
  data.push(setPair(reserves, 0, token0, token1));
  return data;
};

const setPair = (reserves:any, i:any, init:string, end:string) => {

  const pairKey=`${init}_${end}` as PairsKey;

  const resolve =
    PAIRS[pairKey] !== undefined
      ? PAIRS[pairKey]
      : PAIRS[pairKey];
  return getReserves(reserves, resolve, i, init, end);
};

const getReserves = (reserves:any, data:any, i:any, init:any, end:any) => {
  const reserve = reserves.filter(
    (r:any) => `${init}_${end}` === r.pair || (`${end}_${init}` === r.pair && r)
  );
  if (data === undefined) return false;
  if (reserve.length === 0) return false;

  return {
    [i]: {
      pair: data,
      reserves0: comprobeReserve(data.token0, init, reserve),
      reserves1: comprobeReserve(data.token0, end, reserve),
      token0: init,
      token1: end,
    },
  };
};

const comprobeReserve = (token0Reserve:any, token:Tok, reserve:any) => {
  return token0Reserve.toUpperCase() === TOKENS[token].address.toUpperCase()
    ? reserve[0][0]
    : reserve[0][1];
};

const totalInit = {
  values: {
    recivided: 0,
    amountFee: 0,
    priceXToken0: 0,
    priceXToken1: 0,
    fee: 0,
    priceImpact: 0,
    route: [],
  },
};

// const getRoutes = (data:any, amount:any) => {
//   const routes:any = [];
//   const total:any = totalInit;

//   for (let i = 0; i < data.length; i++) {
//     total.values = { ...totalInit };
//     total.values.recivided = parseFloat(amount);
//     total.values.amountFee = parseFloat(amount);
//     total.values.fee = 0;
//     total.values.priceImpact = 0;
//     total.values.route = [];

//     Object.keys(data[i]).map((route, index) => {
//       const tokenId0=data[i][route].token0 as Coin;
// 			const tokenId1=data[i][route].token1 as Coin;
//       const reserves0 = amountBigReverse(
//         data[i][route].reserves0,
//         TOKENS[tokenId0].decimals
//       );
//       const reserves1 = amountBigReverse(
//         data[i][route].reserves1,
//         TOKENS[tokenId1].decimals
//       );
//       total.values.route.push(data[i][route].token0);

//       total.values.recivided =
//         reserves1 -
//         (reserves0 * reserves1) / (reserves0 + total.values.recivided * 0.997);
//       total.values.priceXToken0 = total.values.recivided / parseFloat(amount);
//       total.values.priceXToken1 =
//         1 / total.values.recivided / parseFloat(amount);
//       total.values.amountFee = total.values.amountFee * 0.997;
//       total.values.fee =
//         parseFloat(total.values.fee) + total.values.amountFee * 0.003;
//       total.values.priceImpact =
//         total.values.priceImpact +
//         (1 -
//           reserves0 /
//             reserves1 /
//             ((total.values.recivided * 0.997) /
//               (reserves1 -
//                 (reserves0 * reserves1) /
//                   (reserves0 + total.values.recivided * 0.997)))) *
//           100;

//       if (Object.keys(data[i]).length - 1 === index) {
//         total.values.route.push(data[i][route].token1);
//         routes.push(total.values);
//       }
//     });
//   }
//   return routes;
// };
