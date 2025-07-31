// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CouponNFT is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;

    event CouponMinted(address to, uint256 tokenId, string uri);

    constructor(address initialOwner) ERC721("CouponNFT", "CPN") Ownable(initialOwner) {}

    function mintCoupon(address to, string memory uri) public onlyOwner {
        uint256 tokenId = nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        emit CouponMinted(to, tokenId, uri);
    }

    function burnCoupon(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Not owner");
        _burn(tokenId);
    }
}