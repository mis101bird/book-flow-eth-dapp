web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
console.log("web3.isConnected()", web3.isConnected());
abi = JSON.parse(
  '[{"constant":false,"inputs":[{"name":"book","type":"bytes32"},{"name":"location","type":"bytes32"}],"name":"borrowBook","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"book","type":"bytes32"}],"name":"getLocation","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"locationList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"bookLocationMap","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"bookList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"location","type":"bytes32"}],"name":"validLocation","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"books","type":"bytes32[]"},{"name":"locations","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]'
);
VotingContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = VotingContract.at(
  "0xf5fe82453ddc127554f68e9594e3c08c69ee0372"
);
books = ["Book1", "Book2", "Book3", "Book4"];

function borrowBook() {
  bookName = $("#bookName").val();
  locationName = $("#locationName").val();

  contractInstance.borrowBook(
    bookName,
    locationName,
    {
      from: web3.eth.accounts[0]
    },
    function() {
      var newlocation = web3.toUtf8(
        contractInstance.getLocation.call(bookName).toString()
      );
      if (newlocation !== $("#locationName").val()) {
        $("#error").text("Please check the location again...");
      } else {
        $("#error").text("");
      }
      $("#" + bookName).html(newlocation);
    }
  );
}

function returnBook() {
  bookName = $("#bookName").val();

  contractInstance.borrowBook(
    bookName,
    "bookshelf",
    {
      from: web3.eth.accounts[0]
    },
    function() {
      $("#" + bookName).html(
        web3.toUtf8(contractInstance.getLocation.call(bookName).toString())
      );
    }
  );
}

$(document).ready(function() {
  for (var i = 0; i < books.length; i++) {
    let book = books[i];
    let val = contractInstance.getLocation.call(book).toString();
    $("#" + book).html(web3.toUtf8(val));
  }
});
