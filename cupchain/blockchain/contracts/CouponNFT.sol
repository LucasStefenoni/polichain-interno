// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title CouponNFT
 * @dev Contrato ERC721 com suporte a URIs e listagem dos NFTs do owner.
 * Adaptado para OpenZeppelin Contracts 5.x
 */
contract CouponNFT is ERC721, ERC721Enumerable, Ownable {
    uint256 public nextTokenId;

    // Armazenamento de URIs dos metadados
    mapping(uint256 => string) private _tokenURIs;

    event CouponMinted(address to, uint256 tokenId, string uri);

    constructor(address initialOwner)
        ERC721("CouponNFT", "CPN")
        Ownable(initialOwner)
    {}

    /// @notice Mint um novo NFT com URI
    function mintCoupon(address to, string memory uri) public {
        uint256 tokenId = nextTokenId++;
        _safeMint(to, tokenId);
        _tokenURIs[tokenId] = uri;
        emit CouponMinted(to, tokenId, uri);
    }

    /// @notice Burn do NFT (somente se for o dono)
    function burnCoupon(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Not owner");
        _burn(tokenId);
        delete _tokenURIs[tokenId];
    }

    /// @notice Retorna a URI do token
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721)
        returns (string memory)
    {
        string memory uri = _tokenURIs[tokenId];
        require(bytes(uri).length > 0, "ERC721: URI query for nonexistent token");
        return uri;
    }

    /// @dev Resolve conflitos de herança para supportsInterface
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    /// @dev Requisito do OpenZeppelin Contracts >= v5: resolve conflitos de _update
    function _update(
        address to,
        uint256 tokenId,
        address auth
    )
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    /// @dev Requisito do OpenZeppelin Contracts >= v5: resolve conflitos de _increaseBalance
    function _increaseBalance(address account, uint128 amount)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, amount);
    }
}
