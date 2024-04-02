import CAKEROUTER from "./abi/cakeRouter.json";
import GMKABIJson from "./abi/goldmakToken.json";
import SWAPROUTER_MAINET from "./abi/swapRouterMainnet.json";
import SWAPROUTER_TESNETABI from "./abi/swapRouterTesnet.json";
import PANCAKEROUTERABI from "./abi/pancakeRouter.json";
import SWAPTESNETABI from "./abi/swapTesnet.json";
import { BSC_CONTRACT, TESNET_CONTRACT } from "./constants/contracts";
import { METHODS_MAINET, METHODS_TESNET } from "./constants/methodsSwap";
import {
  CHAIN_ID_MAINNET,
  CHAIN_ID_TESTNET,
  WEB3_NETWORK_MAINNET,
  WEB3_NETWORK_TESTNET,
} from "./constants/networks";
import { PAIRS_MAINNET, PAIRS_TESTNET } from "./constants/pair";
import { TOKEN_MAINNET, TOKEN_TESTNET } from "./constants/tokens";

/**
 * @ENTORNO
 */
export const PRODUCTION = false;

/**
 * @NETWORKS
 * @BLOCKCHAIN
 */
export const CHAIN_ID = PRODUCTION ? CHAIN_ID_MAINNET : CHAIN_ID_TESTNET;

export const NETWORK_MAINNET = PRODUCTION ? "mainnet" : "testnet";

export const WEB3_NETWORK = PRODUCTION
  ? WEB3_NETWORK_MAINNET
  : WEB3_NETWORK_TESTNET;

/**
 * @CONTRACTS
 * @ABI
 * @TOKENS
 */

export const CONTRACTS = PRODUCTION ? BSC_CONTRACT : TESNET_CONTRACT;

export const ROUTER_METHODS = PRODUCTION ? METHODS_MAINET : METHODS_TESNET;
export const SWAPABI = PRODUCTION ? CAKEROUTER : SWAPTESNETABI;
export const SWAPROUTERABI = PRODUCTION
  ? SWAPROUTER_MAINET
  : SWAPROUTER_TESNETABI;
export const TOKENS = PRODUCTION ? TOKEN_MAINNET : TOKEN_TESTNET;
export const PAIRS = PRODUCTION ? PAIRS_MAINNET : PAIRS_TESTNET;

export const GMKABI = GMKABIJson;
export const PANCAKEABI = PANCAKEROUTERABI; 

/**
 * @ENDPOINTS
 */
