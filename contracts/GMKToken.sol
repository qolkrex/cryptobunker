// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface GMKNFT is IERC721 {
    function mintNFT(address to, uint256 numberOfNFTs) external;
}

interface ICustodyContract {
    function isWhiteList(address account) external view returns (bool);

    function isRoundAdmin(address account) external view returns (bool);
}

interface IRouter {
    function WETH() external pure returns (address);

    function getAmountsOut(uint256 amountIn, address[] calldata path)
        external
        view
        returns (uint256[] memory amounts);

    function swapETHForExactTokens(
        uint256 amountOut,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable returns (uint256[] memory amounts);

    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);
}

contract GoldmakToken is ERC20, Ownable {
    struct RoundStruct {
        uint256 numberofRound;
        uint256 date;
        uint256 priceGMK;
        uint256 maxGMKSelled;
        uint256 amountGMKxNFT;
        uint256 currentGMKSelled;
        bool isActive;
    }
    mapping(uint256 => RoundStruct) public Rounds;

    uint256 public constant MAX_SUPPLY = 25_000_000 * 1e8; // 25 millones de tokens

    address public usdtToken = 0x337610d27c682E347C9cD60BD4b3b107C9d34dDd; // Dirección del contrato del token USDT (necesitarás importar el contrato ERC20 de USDT)

    uint256 public gmkPriceInUSDT; // Precio inicial de GMK en USDT

    mapping(string => address) private tokenAcepted;

    address public gmknftContract;

    event DebugLog(string message, uint256 value);
    event TokensPurchased(
        address indexed buyer,
        uint256 usdtAmount,
        uint256 mgkAmount
    );
    event ApprovalEvent(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    uint256 public roundIncrement;
    uint256 public currentRound;

    // private
    address private ROUTER = 0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3; // pancakeswap
    address private TOKEN;
    address private ADDRESSTORECIEVEUSDT =
        0x744C060a98fAB71433aEe8B56556d78DEB48cE8a;
    address private CUSTODYCONTRACT;

    constructor() ERC20("Goldmak", "GMK") Ownable(msg.sender) {
        tokenAcepted["USDT"] = 0x337610d27c682E347C9cD60BD4b3b107C9d34dDd;
    }

    modifier onlyWhitelisted() {
        require(
            ICustodyContract(CUSTODYCONTRACT).isWhiteList(msg.sender),
            "Usuario no se encuentra en la whitelist"
        );
        _;
    }

    modifier onlyRoundAdmin() {
        require(
            ICustodyContract(CUSTODYCONTRACT).isRoundAdmin(msg.sender),
            "Usuario no es un roundadmin"
        );
        _;
    }

    modifier activeRound() {
        require(
            roundIncrement > 0 && Rounds[currentRound].isActive,
            "No active Round found"
        );
        _;
    }

    function transferOwner(address newOwner) external onlyOwner {
        _transferOwnership(newOwner);
    }

    function setGmknftContract(address _contract) external onlyOwner {
        gmknftContract = _contract;
    }

    function setCustodyContract(address _contract) external onlyOwner {
        CUSTODYCONTRACT = _contract;
    }

    function buyPublicSaleEth() public payable onlyWhitelisted activeRound {
        address[] memory _path = getPath(IRouter(ROUTER).WETH());
        uint256[] memory values = getAmountsOut(msg.value, _path);
        uint256 _quantity = (values[1] / Rounds[currentRound].priceGMK);

        IRouter(ROUTER).swapETHForExactTokens{value: msg.value}(
            values[1],
            _path,
            ADDRESSTORECIEVEUSDT,
            block.timestamp
        );

        // Verificar que no se supere el suministro máximo
        require(totalSupply() + _quantity <= MAX_SUPPLY, "Exceeds max supply");

        uint256 gmkRemaining = Rounds[currentRound].maxGMKSelled -
            Rounds[currentRound].currentGMKSelled;
        if ((gmkRemaining - (_quantity * 1e8)) < 0) {
            _mint(msg.sender, gmkRemaining * 1e8);
            Rounds[currentRound].currentGMKSelled =
                Rounds[currentRound].currentGMKSelled +
                gmkRemaining;
            if (_quantity >= Rounds[currentRound].amountGMKxNFT) {
                uint256 numberOfNFTs = _quantity /
                    Rounds[currentRound].amountGMKxNFT;
                if (numberOfNFTs > 0) {
                    GMKNFT(gmknftContract).mintNFT(msg.sender, numberOfNFTs);
                }
            }
        } else {
            Rounds[currentRound].currentGMKSelled =
                Rounds[currentRound].currentGMKSelled +
                (_quantity * 1e8);
            _mint(msg.sender, _quantity * 1e8);
            // Generar NFTs adicionales por cada 1000 tokens comprados
            if (_quantity >= Rounds[currentRound].amountGMKxNFT) {
                uint256 numberOfNFTs = uint256(
                    _quantity / Rounds[currentRound].amountGMKxNFT
                );
                if (numberOfNFTs > 0) {
                    GMKNFT(gmknftContract).mintNFT(msg.sender, numberOfNFTs);
                }
            }
        }
    }

    function getCalculateReceive(uint256 _amount)
        public
        view
        returns (uint256)
    {
        uint256 _amountReceive = (_amount / Rounds[currentRound].priceGMK);
        return _amountReceive;
    }

    function buyPublicSaleToken(uint256 usdtAmount)
        public
        onlyWhitelisted
        activeRound
    {
        uint256 _quantity = getCalculateReceive(usdtAmount);
        require(totalSupply() + _quantity <= MAX_SUPPLY, "Exceeds max supply");

        require(
            IERC20(usdtToken).balanceOf(msg.sender) >= usdtAmount,
            "Insufficient USDT balance"
        );

        IERC20(usdtToken).transferFrom(
            msg.sender,
            ADDRESSTORECIEVEUSDT,
            usdtAmount
        );

        uint256 gmkRemaining = Rounds[currentRound].maxGMKSelled -
            Rounds[currentRound].currentGMKSelled;
        if ((gmkRemaining - (_quantity * 1e8)) < 0) {
            _mint(msg.sender, gmkRemaining * 1e8);
            Rounds[currentRound].currentGMKSelled =
                Rounds[currentRound].currentGMKSelled +
                gmkRemaining;
            if (_quantity >= Rounds[currentRound].amountGMKxNFT) {
                uint256 numberOfNFTs = _quantity /
                    Rounds[currentRound].amountGMKxNFT;

                if (numberOfNFTs > 0) {
                    GMKNFT(gmknftContract).mintNFT(msg.sender, numberOfNFTs);
                }
            }
        } else {
            Rounds[currentRound].currentGMKSelled =
                Rounds[currentRound].currentGMKSelled +
                (_quantity * 1e8);
            _mint(msg.sender, _quantity * 1e8);
            // Generar NFTs adicionales por cada 1000 tokens comprados
            if (_quantity >= Rounds[currentRound].amountGMKxNFT) {
                uint256 numberOfNFTs = uint256(
                    _quantity / Rounds[currentRound].amountGMKxNFT
                );
                if (numberOfNFTs > 0) {
                    GMKNFT(gmknftContract).mintNFT(msg.sender, numberOfNFTs);
                }
            }
        }
    }

    function getGMKAmountForUSDT(uint256 usdtAmount)
        external
        view
        returns (uint256)
    {
        // Dirección del token USDT en PancakeSwap
        address usdtTokenInPancakeSwap = 0x337610d27c682E347C9cD60BD4b3b107C9d34dDd;

        // Dirección del contrato del token GMK
        //  address gmkToken = address(this);

        // Ruta de intercambio: USDT -> GMK
        address[] memory path = new address[](2);
        path[0] = usdtTokenInPancakeSwap;
        path[1] = IRouter(ROUTER).WETH();

        // Obtiene la cantidad de GMK que recibirás por cierta cantidad de USDT
        uint256[] memory amounts = IRouter(ROUTER).getAmountsOut(
            usdtAmount,
            path
        );

        // El resultado es la cantidad de GMK
        return amounts[1];
    }

    function getPath(address _address)
        internal
        view
        returns (address[] memory)
    {
        address[] memory _path;
        if (IRouter(ROUTER).WETH() == _address) {
            _path = new address[](2);
            _path[0] = _address;
            _path[1] = tokenAcepted["USDT"];
        } else {
            _path = new address[](3);
            _path[0] = _address;
            _path[1] = IRouter(ROUTER).WETH();
            _path[2] = tokenAcepted["USDT"];
        }
        return _path;
    }

    function getBalanceToken(string memory _token)
        public
        view
        returns (uint256)
    {
        return IERC20(tokenAcepted[_token]).balanceOf(address(this));
    }

    function getBalance() public view returns (uint256) {
        return IERC20(TOKEN).balanceOf(address(this));
    }

    function getAmountsOut(uint256 _amount, address[] memory _path)
        public
        view
        returns (uint256[] memory)
    {
        return IRouter(ROUTER).getAmountsOut(_amount, _path);
    }

    function withdrawTokenAcepted(address _recipient) external onlyOwner {
        IERC20(tokenAcepted["USDT"]).transfer(
            _recipient,
            getBalanceToken("USDT")
        );
        payable(_recipient).transfer(address(this).balance);
    }

    function getBalanceTotal() external view returns (uint256, uint256) {
        uint256 usdtBalance = getBalanceToken("USDT");
        uint256 bnbBalance = address(this).balance;

        return (usdtBalance, bnbBalance);
    }

    function mint(uint256 _quantity) external onlyOwner {
        require(roundIncrement > 0, "No active Round found");
        uint256 gmkRemaining = Rounds[currentRound].maxGMKSelled -
            Rounds[currentRound].currentGMKSelled;
        if (gmkRemaining - _quantity < 0) {
            _mint(msg.sender, gmkRemaining);
            Rounds[currentRound].currentGMKSelled =
                Rounds[currentRound].currentGMKSelled +
                gmkRemaining;
        }
        Rounds[currentRound].currentGMKSelled =
            Rounds[currentRound].currentGMKSelled +
            _quantity;
        _mint(msg.sender, _quantity);
    }

    // La variable priceGMK se recibe como WEI
    function setupRound(
        uint256 dateStartRound,
        uint256 priceGMKInUSDT,
        uint256 maxGMKSelled,
        uint256 amountGMKxNFT
    ) public onlyRoundAdmin {
        roundIncrement++;

        RoundStruct memory newRound = RoundStruct({
            numberofRound: roundIncrement,
            date: dateStartRound,
            priceGMK: priceGMKInUSDT,
            maxGMKSelled: maxGMKSelled,
            amountGMKxNFT: amountGMKxNFT,
            currentGMKSelled: 0,
            isActive: true
        });

        gmkPriceInUSDT = priceGMKInUSDT;

        Rounds[roundIncrement] = newRound;
        currentRound = roundIncrement;
        if (currentRound > 1) {
            Rounds[roundIncrement - 1].isActive = false;
        }
    }

    function getInfoCurrentRound() public view returns (RoundStruct memory) {
        require(roundIncrement > 0, "No active Round found");
        return Rounds[currentRound];
    }

    function getInfoRound(uint256 numberOfRound)
        public
        view
        returns (RoundStruct memory)
    {
        require(roundIncrement > 0, "No active Round found");
        return Rounds[numberOfRound];
    }

    function getUSDTCollectedInRound(uint256 numberOfRound)
        public
        view
        returns (uint256)
    {
        require(roundIncrement > 0, "No active Round found");
        uint256 USDTCollected = (Rounds[numberOfRound].currentGMKSelled *
            Rounds[numberOfRound].priceGMK) / 1e8;
        return USDTCollected;
    }

    function totalRounds() public view returns (uint256) {
        return roundIncrement;
    }

    function isActiveCurrentRound() public view returns (bool) {
        require(roundIncrement > 0, "No active Round found");
        return Rounds[currentRound].isActive;
    }

    function currentGMKSellInCurrentRound() public view returns (uint256) {
        require(roundIncrement > 0, "No active Round found");
        return Rounds[currentRound].currentGMKSelled;
    }

    function disableCurrentRound() internal onlyRoundAdmin {
        require(
            Rounds[currentRound].isActive == false,
            "Error: The current round is disabled"
        );
        Rounds[currentRound].isActive = false;
    }
}
