pragma solidity ^0.4.18;
// We have to specify what version of compiler this code will compile with

contract BookBorrower {
    mapping (bytes32 => bytes32) public bookLocationMap;
    bytes32[] public bookList;
    bytes32[] public locationList;
    
    /*
    varify: book exist + location exist --> update mapping
    */

    /* This is the constructor which will be called once when you
    deploy the contract to the blockchain. When we deploy the contract,
    we will pass an array of candidates who will be contesting in the election
    */
    function BookBorrower(bytes32[] books, bytes32[] locations) public {
        bookList = books;
        locationList = locations;

        
        for(uint i = 0; i < books.length; i++) {
            bookLocationMap[books[i]] = "bookshelf";
        }
    }

    function getBookLocation(bytes32 bookName) public returns (bytes32) {
        return bookLocationMap[bookName];
    }

    /*
    // This function returns the total votes a candidate has received so far
    function totalVotesFor(bytes32 candidate) view public returns (uint8) {
        require(validCandidate(candidate));
        return votesReceived[candidate];
    }

    // This function increments the vote count for the specified candidate. This
    // is equivalent to casting a vote
    function voteForCandidate(bytes32 candidate) public {
        require(validCandidate(candidate));
        votesReceived[candidate] += 1;
    }*/

    function hasBookshelf(bytes32[] locations) public returns (bool) {
        for(uint i = 0; i < locations.length; i++) {
            if (locations[i] == "bookshelf") {
                return true;
            }
        }
        return false;
    }

    /*
    function validCandidate(bytes32 candidate) view public returns (bool) {
        for(uint i = 0; i < candidateList.length; i++) {
            if (candidateList[i] == candidate) {
                return true;
            }
        }
        return false;
    }
    */
}
