var fs = require("fs");
var Web3 = require("web3");
var solc = require("solc");
var path = require("path");

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var code = fs.readFileSync(path.resolve(__dirname, "Voting.sol"), "utf8");
var compiledCode = solc.compile(code, 1);

var abiDefinition = JSON.parse(compiledCode.contracts[":Voting"].interface);
var byteCode = compiledCode.contracts[":Voting"].bytecode;
let votingContract;

const execute = async () => {
  try {
    votingContract = await web3.eth.contract(abiDefinition);
    return await votingContract.new(
      [
        "Alson",
        "Ben",
        "Chary",
        "Chris",
        "Cloe",
        "Daly",
        "Eric",
        "Grace",
        "Han-Qi-Wang",
        "Ian-Su",
        "Jim-Ho",
        "Joanna",
        "Joey",
        "Kate",
        "Meng-Gen",
        "Randy",
        "Samuel",
        "Timo",
        "Titan",
        "Tony",
        "Vicky"
      ],
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
            contractInstance.voteForCandidate("Alson", {
              from: web3.eth.accounts[0]
            });
            console.log(
              "Alson voting:",
              contractInstance.totalVotesFor("Alson").toString()
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
