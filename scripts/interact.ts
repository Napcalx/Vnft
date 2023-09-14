import { ethers } from "hardhat";

async function main () {
  const [owner] = await ethers.getSigners();
  const CT = await Cheytac.deployed()
  length = await CT.getNumberOfCharacters()
  index = 0
  while (index < length) {
    console.log('Let\'s get the overview of your character ' + index + ' of ' + length)
    let equipment Metadata = 
    let characterOverview = await dnd.characters(index)
    index++
    characterMetadata['name'] = characterOverview['name']
    if (fs.existsSync('metadata/' + characterMetadata['name'].toLowerCase().replace(/\s/g, '-') + '.json')) {
      console.log('test')
      continue
      }

      console.log(equipmentMetadata['name'])
      characterMetadata['attributes'][0]['value'] = characterOverview['strength']['words'][0]
      characterMetadata['attributes'][1]['value'] = characterOverview['dexterity']['words'][0]
      characterMetadata['attributes'][2]['value'] = characterOverview['constitution']['words'][0]
      characterMetadata['attributes'][3]['value'] = characterOverview['intelligence']['words'][0]
      characterMetadata['attributes'][4]['value'] = characterOverview['wisdom']['words'][0]
      characterMetadata['attributes'][5]['value'] = characterOverview['charisma']['words'][0]
      filename = 'metadata/' + characterMetadata['name'].toLowerCase().replace(/\s/g, '-')
      let data = JSON.stringify(characterMetadata)
      fs.writeFileSync(filename + '.json', data)
    }
    callback(dnd)
};



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
  console.error(error);
  process.exitCode = 1;
});