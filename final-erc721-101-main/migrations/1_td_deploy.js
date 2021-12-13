const Str = require('@supercharge/strings')
// const BigNumber = require('bignumber.js');

var TDErc20 = artifacts.require("ERC20TD.sol");
var evaluator = artifacts.require("Evaluator.sol");
var evaluator2 = artifacts.require("Evaluator2.sol");
var exSolution = artifacts.require("ExerciceSolution.sol");

module.exports = (deployer, network, accounts) => {
    deployer.then(async () => {
        await deployTDToken(deployer, network, accounts); 
        await deployEvaluator(deployer, network, accounts); 
        await setPermissionsAndRandomValues(deployer, network, accounts); 
        await deployRecap(deployer, network, accounts); 
		// await forceAdresses(deployer, network, accounts); 
		await testDeployement(deployer, network, accounts); 

    });
};

async function deployTDToken(deployer, network, accounts) {
	TDToken = await TDErc20.new("TD-ERC721-101","TD-ERC721-101",web3.utils.toBN("0"))
	
	// TDToken = await TDErc20.at("0x46a9Dc47185F769ef9a11927B0f9d2fd0dEc3304")
}

async function deployEvaluator(deployer, network, accounts) {
	Evaluator = await evaluator.new(TDToken.address)
	// Evaluator = await evaluator.at("0x6B19d275dA33857a3f35F7c1034048Ba1abF75CD") 
	Evaluator2 = await evaluator2.new(TDToken.address)
}

async function setPermissionsAndRandomValues(deployer, network, accounts) {
	await TDToken.setTeacher(Evaluator.address, true)
	await TDToken.setTeacher(Evaluator2.address, true)
	randomNames = []
	randomLegs = []
	randomSex = []
	randomWings = []
	for (i = 0; i < 20; i++)
		{
		randomNames.push(Str.random(15))
		randomLegs.push(Math.floor(Math.random()*5))
		randomSex.push(Math.floor(Math.random()*2))
		randomWings.push(Math.floor(Math.random()*2))
		// randomTickers.push(web3.utils.utf8ToBytes(Str.random(5)))
		// randomTickers.push(Str.random(5))
		}

	console.log(randomNames)
	console.log(randomLegs)
	console.log(randomSex)
	console.log(randomWings)
	// console.log(web3.utils)
	// console.log(type(Str.random(5)0)
	await Evaluator.setRandomValuesStore(randomNames, randomLegs, randomSex, randomWings);
	await Evaluator2.setRandomValuesStore(randomNames, randomLegs, randomSex, randomWings);
}

async function deployRecap(deployer, network, accounts) {
	console.log("TDToken " + TDToken.address)
	console.log("Evaluator " + Evaluator.address)
	console.log("Evaluator2 " + Evaluator2.address)
}
async function forceAddress(deployer, network, accounts) {
	
}

async function testDeployement (deployer, network, accounts) {
	// myNFT = await 
	balance = await TDToken.balanceOf(accounts[0])	
	console.log("Notre balance est de : "+ balance.toString())


	ExSolution = await exSolution.new("TDERC721","TDERC721",Evaluator.address,1)
	await Evaluator.submitExercice(ExSolution.address)

	balance = await TDToken.balanceOf(accounts[0])	
	console.log("Notre balance est de : "+ balance.toString())


	await Evaluator.ex1_testERC721()

	balance = await TDToken.balanceOf(accounts[0])	
	console.log("Notre balance après EX1 est de : "+ balance.toString())

	await Evaluator.ex2a_getAnimalToCreateAttributes();

	sex = await Evaluator.readSex(accounts[0]);
	name = await Evaluator.readName(accounts[0]);
	wings = await Evaluator.readWings(accounts[0]);
	legs = await Evaluator.readLegs(accounts[0]);


	await ExSolution.declareAnimal(name,wings, legs, sex);
	

	animalNumber = await ExSolution.getCounter();
	
	

	await Evaluator.ex2b_testDeclaredAnimal(animalNumber);

	balance = await TDToken.balanceOf(accounts[0])	
	console.log("Notre balance après EX2 est de : "+ balance.toString())

	

}


async function forceAdresses(deployer, network, accounts)

	{
		TDToken = await TDErc20.at("0x8B7441Cb0449c71B09B96199cCE660635dE49A1D")
		Evaluator = await evaluator.at("0xa0b9f62A0dC5cCc21cfB71BA70070C3E1C66510E")
		Evaluator2 = await evaluator2.at("0x4f82f7A130821F61931C7675A40fab723b70d1B8")
	}
