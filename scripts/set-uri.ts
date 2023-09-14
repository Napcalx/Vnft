import { ethers } from "hardhat"

async function main () {

    const Vnft = await ethers.getContractAt('Cheytac', "0x4C37249DC076fDb2A1AD67C8823d0CE8Fdb1cfDF")
    console.log("Contract Name and Address has been Retrieved")
    
    console.log('Let\'s set the tokenURI of your characters')

    const deploy = await Vnft.setTokenURI(0, "https://amethyst-watery-wildebeest-997.mypinata.cloud/ipfs/QmUfzmkhaUKRVWWFAW4GhoJ2iP4o7pCewAJvwA4TUwUgc8")
    console.log("Here is the token information", deploy)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})