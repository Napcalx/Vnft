import { ethers } from "hardhat";

async function main () {
  const [cheytac] = await ethers.getSigners();
  const CT = await cheytac.deployed()

  const Vnft = await ethers.getContractAt("Cheytac", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 ");
  const signer = await ethers.provider.resolveName("cheytac")

  await Vnft.requestNewEquip(signer.address);

};

//0x3D7a4E450B324E656E0F79fC4aFb5FEd72Bb5f68
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
