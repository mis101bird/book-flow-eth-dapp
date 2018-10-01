pragma solidity ^0.4.18;
// We have to specify what version of compiler this code will compile with

contract BookBorrow {
    /* mapping field below is equivalent to an associative array or hash.
    The key of the mapping is candidate name stored as type bytes32 and value is
    an unsigned integer to store the vote count
    */
    
    mapping (bytes32 => bytes32) public bookLocationMap;
    
    
    /* Solidity doesn't let you pass in an array of strings in the constructor (yet).
    We will use an array of bytes32 instead to store the list of candidates
    */
    
    bytes32[] public bookList;
    bytes32[] public locationList;

    /* This is the constructor which will be called once when you
    deploy the contract to the blockchain. When we deploy the contract,
    we will pass an array of candidates who will be contesting in the election
    */
    function BookBorrow(bytes32[] books, bytes32[] locations) public {
        bookList = books;
        locationList = locations;

        for(uint i = 0; i < bookList.length; i++) {
            bytes32 book = bookList[i];
            bookLocationMap[book] = "bookshelf";
        }
    }

    // This function returns the total votes a candidate has received so far
    
    function borrowBook(bytes32 book, bytes32 location) public {
        bookLocationMap[book] = location;
    }

    // This function increments the vote count for the specified candidate. This
    // is equivalent to casting a vote
    function getLocation(bytes32 book) view public returns (bytes32){
        return bookLocationMap[book];
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