var fs = require("fs");
var Web3 = require("web3");
var solc = require("solc");
var path = require("path");

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var code = fs.readFileSync(path.resolve(__dirname, "BookBorrow.sol"), "utf8");
var compiledCode = solc.compile(code, 1);

var abiDefinition = JSON.parse(compiledCode.contracts[":BookBorrow"].interface);
console.log(compiledCode.contracts[":BookBorrow"].interface);
var byteCode = compiledCode.contracts[":BookBorrow"].bytecode;
let votingContract;

const execute = async () => {
  try {
    votingContract = await web3.eth.contract(abiDefinition);
    return await votingContract.new(
      ["Book1", "Book2", "Book3", "Book4"],
      ["Sam", "Tom", "Mary", "bookshelf"],
      {
        data: byteCode,
        from: web3.eth.accounts[0],
        gas: 4700000
      },
      function(err, deployedContract) {
        if (!err) {
          // e.g. check tx hash on the first call (transaction send)
          if (!deployedContract.address) {
            console.log(
              "please wait for address at new round, transactionHash:",
              deployedContract.transactionHash
            ); // The hash of the transaction, which deploys the contract

            // check address on the second call (contract deployed)
          } else {
            console.log("deployedContract.address", deployedContract.address);
            const contractInstance = votingContract.at(
              deployedContract.address
            );
            contractInstance.borrowBook("Book1", "Tom", {
              from: web3.eth.accounts[0]
            });
            console.log(
              "Book1:",
              web3.toUtf8(
                contractInstance.getLocation("Book1", {
                  from: web3.eth.accounts[0]
                })
              )
            );
          }
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

execute();
