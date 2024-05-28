// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

//0xb84b12e953f5bcf01b05f926728e855f2d4a67a9  contract address on rinkeby
//deployed using remix 

contract certificate {
 
 
 uint256 count;
 mapping( string=>string) documents;

 
 function storHash( string  memory Stname,string  memory ipfsHash)  public
{
    count++;
    documents[ipfsHash] =Stname ;

}

function verifyDocument(string memory hashToVerify) view public returns ( string memory)
 {
   return (documents[hashToVerify]);
    
 }

 function DocumentCount() view public returns ( uint256)
 {
     
   return count ;
    
 }
}
