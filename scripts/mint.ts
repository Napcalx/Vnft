import { ethers } from "hardhat";

async function main() {
    const [owner] = await ethers.getSigners();

    console.log("Deploying contract", owner.address);

    const NFT = await ethers.deployContract("Cheytac", ["0x326C977E6efc84E512bB9C30f76E30c160eD06FB", "14223"]);

    await NFT.waitForDeployment()

    console.log("Contract deployed at", NFT.target);
};


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
});