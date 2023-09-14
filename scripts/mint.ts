import { ethers } from "hardhat";

async function main () {
  const [signer] = await ethers.getSigners();

  const Vnft = await ethers.getContractAt("Cheytac", "0x3D7a4E450B324E656E0F79fC4aFb5FEd72Bb5f68");

  await Vnft.mint(signer.address, "QmUfzmkhaUKRVWWFAW4GhoJ2iP4o7pCewAJvwA4TUwUgc8");

};


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
