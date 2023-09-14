// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Cheytac is ERC721, VRFConsumerBase, Ownable {
    bytes32 internal keyHash = "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15";
    uint256 internal fee;
    uint256 public randomResult;
    address public VRFCoordinator = "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D";
    address public LinkToken = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
    uint64 private constant suscriptionId = 14223;
   
    struct Equipment {
        uint256 size;
        uint256 weight; 
        uint256 stock;
        uint256 gripdegree;
        uint256 scope;
        uint256 range;
    }

    Equipment [] public equipment;
    mapping(bytes32 => string) requestToEquipmentName;
    mapping(bytes32 => address) requestToSender;
    mapping(bytes32 => uint256) requestToTokenId;


    constructor (address _VRFCoordinator, address _LinkToken, bytes32 _keyhash) public 
        VRFConsumerBase(_VRFCoordinator, _LinkToken)
        ERC721 ("Cheytac", "CT")
    {
        VRFCoordinator = _VRFCoordinator;
        LinkToken = _LinkToken; 
        keyhash = _keyhash;
        fee = 0.1 * 10**18; // 0.1 Link;
    }

    function requestNewEquip(uint userprovidedId, string memory name) public returns (bytes32) {
        require(LINK.balanceOf(address(this)) >= fee, "Insufficent Link");

        bytes32 requestId = requestRandomness(keyHash, fee, userprovidedId);
        requestToEquipmentName[requestId] = name;
        requestToSender[requestId] = msg.sender;
        return requestId;
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return tokenURI(tokenId);
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        require(_isApprovedOrOwner(_msgSender(), tokenId),"Caller is not owner nor approved");
        _setTokenURI(tokenId, _tokenURI);
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomNumber) internal override {
        uint256 newId = equipment.length;
        uint256 size = ((randomNumber % 100) % 18);
        uint256 weight = (((randomNumber % 1000) / 10) % 18);
        uint256 stock = (((randomNumber % 1000) / 10) % 18);
        uint256 gripdegree = (((randomNumber % 100) / 10) % 18);
        uint256 scope = ((randomNumber % 100) % 18);
        uint256 range = ((randomNumber % 1000) % 18);

        equipment.push (
            Equipment(
                size,
                weight,
                stock,
                gripdegree,
                scope,
                range,
                requestToEquipmentName[requestId]
            )
        );
        _safeMint(requestToSender[requestId], newId);
    }

    function getNumberOfCharacters() public view returns (uint256) {
        return equipment.length; 
    }

    function transferFrom(address from, address to, uint256 tokenId) public override(ERC721) {
        bytes32 requestId =requestRandomness(keyHash, fee, uint32(block.number));
        requestIdToTokenId[requestId] = tokenId;
        _transfer(from, to, tokenId);
    }
}



