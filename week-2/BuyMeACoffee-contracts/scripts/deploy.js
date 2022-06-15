const hre = require("hardhat");


async function main() {
    // Get contract to deploy
    const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
    const buyMeACoffee = await BuyMeACoffee.deploy();
  
    // Deploy the contract.
    await buyMeACoffee.deployed();
    console.log("BuyMeACoffee deployed to:", buyMeACoffee.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1)
  })