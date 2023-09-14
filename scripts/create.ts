import { ethers } from "hardhat";

async function main () {
  const [signer] = await ethers.getSigners();

  console.log(signer.address);

  const Vnft = await ethers.getContractAt("Cheytac", "0x4C37249DC076fDb2A1AD67C8823d0CE8Fdb1cfDF");

  console.log('Creating requests on contract:', signer.address)
  const deploy = await Vnft.requestNewEquip("M200 Intervention Grey");

  console.log("Name of the New NFT", deploy);


};

//0x4C37249DC076fDb2A1AD67C8823d0CE8Fdb1cfDF
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

