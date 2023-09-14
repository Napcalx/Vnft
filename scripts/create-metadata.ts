import { ethers } from "hardhat";

async function main () {
    const Cheytac = artifacts.require("Vnft")
    const fs = require('fs')

    const metaTemple = {
        "name": "M200 Intervention",
        "description": "Sleek, Smooth and Precise. Perfect tool for its task, Inspiring",
        "image": "",
        "CID": "QmNSHASaf1KrvMdzQFWWbHEWom95LEQ6JYrtoZMjt7bJWu",
        "attributes": [
            {
                "trait_type": "Size",
                "value": 0
            },
            {
                "trait_type": "Weight",
                "value": 0
            },
            {
                "trait_type": "Stock",
                "value": 0
            },
            {
                "trait_type": "gripdegree",
                "value": 0
            },
            {
                "trait_type": "Scope",
                "value": 0
            },
            {
                "trait_type": "Range",
                "value": 0
            }
        ]   
    }   


    module.exports = async callback => {
        const Ct = await Cheytac.deployed()
        length = await Ct.getNumberOfEquipments()
        index = 0
        while (index < length) {
            console.log('Let\'s get the overview of your equipment ' + index + ' of ' + length)
            let equipmentMetadata = metaTemple
            let equipmentOverview = await Ct.equipments(index)
            index++
            equipmentMetadata['name'] = equipmentOverview['name']
            if (fs.existsSync('metadata/' + equipmentMetadata['name'].toLowerCase().replace(/\s/g, '-') + '.json')) {
                console.log('test')
                continue
            }
            console.log(equipmentMetadata['name'])
            equipmentMetadata['attributes'][0]['value'] = equipmentOverview['size']['words'][0]
            equipmentMetadata['attributes'][1]['value'] = equipmentOverview['weight']['words'][0]
            equipmentMetadata['attributes'][2]['value'] = equipmentOverview['stock']['words'][0]
            equipmentMetadata['attributes'][3]['value'] = equipmentOverview['gripdegree']['words'][0]
            equipmentMetadata['attributes'][4]['value'] = equipmentOverview['scope']['words'][0]
            equipmentMetadata['attributes'][5]['value'] = equipmentOverview['range']['words'][0]
            filename = 'metadata/' + equipmentMetadata['name'].toLowerCase().replace(/\s/g, '-')
            let data = JSON.stringify(equipmentMetadata)
            fs.writeFileSync(filename + '.json', data)
        }
        callback(Ct)
    }
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})


