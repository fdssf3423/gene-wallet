const Web3 = require('web3');
const fs = require('fs');
const web3 = new Web3();

const createWallets = async (fileName, numberOfWallets) => {
  let walletsString = '';

  for (let i = 0; i < numberOfWallets; i++) {
    const wallet = web3.eth.accounts.create();
    walletsString += `["${wallet.address}", "${wallet.privateKey}"],\n`;
  }

  walletsString = walletsString.slice(0, -2);

  fs.writeFileSync(fileName, `[${walletsString}\n]`);

  console.log(`${numberOfWallets} wallets have been created and saved to ${fileName}`);
};

const fileName = process.argv[2];
const numberOfWallets = parseInt(process.argv[3], 10);

if (!fileName || isNaN(numberOfWallets)) {
  console.log('Usage: node createWallets.js <fileName> <numberOfWallets>');
} else {
  createWallets(fileName, numberOfWallets);
}