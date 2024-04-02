// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract GMKNFT is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _tokenIdCounter;

    uint256 public tokenIdCounter;
    address public goldmakToken;
    string public baseURI =
        "https://ipfs.io/ipfs/QmWTLLkXWSuFz3F2QmCTtUxWiRDbmTEAUPUQ58LdErkMqT/";

    uint256 public constant maxTotalNFTs = 10;

    constructor()
        ERC721("GMKNFT", "GMK NFT")
        Ownable(msg.sender)
    {
        // Inicializar _tokenIdCounter en 0
        _tokenIdCounter.reset();
    }

    function setGoldmakToken(address _goldmakToken) external onlyOwner {
        goldmakToken = _goldmakToken;
    }

    function mintNFT(address to, uint256 numberOfNFTs) external {
        require(msg.sender == goldmakToken, "Unauthorized");
        require(numberOfNFTs > 0, "Number of NFTs must be greater than zero");
        require(
            _tokenIdCounter.current() + numberOfNFTs <= maxTotalNFTs,
            "Exceeds total allowed NFTs"
        );

        for (uint256 i = 0; i < numberOfNFTs; i++) {
            uint256 tokenId = _tokenIdCounter.current() + 1;
            _safeMint(to, tokenId);
            _tokenIdCounter.increment();
        }
    }

    // Función para obtener el URI del token
    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(ownerOf(tokenId) != address(0), "Token does not exist");
        return string(abi.encodePacked(baseURI, tokenId.toString()));
    }

    function transferNFT(
        address from,
        address to,
        uint256 tokenId
    ) external onlyOwner {
        require(ownerOf(tokenId) == from, "Invalid owner");
        _safeTransfer(from, to, tokenId, "");
    }

    // Función para obtener la lista de tokens de un propietario
    function getOwnedTokens(address owner)
        external
        view
        returns (uint256[] memory)
    {
        uint256 tokenCount = balanceOf(owner);
        uint256[] memory tokenIds = new uint256[](tokenCount);

        for (uint256 i = 0; i < tokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(owner, i);
        }

        return tokenIds;
    }

    // Función para obtener la lista de tokens de un propietario con URI
    function getOwnedTokensWithURI(address owner)
        external
        view
        returns (string[] memory)
    {
        uint256 tokenCount = balanceOf(owner);
        string[] memory tokenURIs = new string[](tokenCount);

        for (uint256 i = 0; i < tokenCount; i++) {
            uint256 tokenId = tokenOfOwnerByIndex(owner, i);
            tokenURIs[i] = tokenURI(tokenId);
        }

        return tokenURIs;
    }
}
