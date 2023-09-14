import { ethers } from "hardhat";

async function main() {
    const [owner] = await ethers.getSigners();

    console.log("Deploying contract", owner.address);

    const NFT = await ethers.deployContract("Cheytac", ["0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D", "0x326C977E6efc84E512bB9C30f76E30c160eD06FB", "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15"]);

    await NFT.waitForDeployment()

    console.log("Contract deployed at", NFT.target);
};


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
  })