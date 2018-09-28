var fs = require("fs");
var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var solc = require("solc");

code = fs.readFileSync("Voting.sol").toString();
compiledCode = solc.compile(code);

var abiDefinition = JSON.parse(
  compiledCode.contracts[":BookBorrower"].interface
);
var bookContract = web3.eth.contract(abiDefinition);
var byteCode = compiledCode.contracts[":BookBorrower"].bytecode;
var deployedContract = bookContract.new(["Book1"], ["John"], {
  data: byteCode,
  from: web3.eth.accounts[0],
  gas: 4700000
});

contractInstance = bookContract.at(deployedContract.address);
web3.toUtf8(
  contractInstance.getBookLocation("Book1", { from: web3.eth.accounts[0] })
);
