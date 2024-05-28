
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';



const Validate =()=>
{
  const [web3Api,setweb3Api]=useState({
    porvider:null, 
    web3:null
   
  });
  const [contract,setContract]=useState(null);
  //create reload
  const providerChanaged=(porvider)=>{
    porvider.on("accountsChanged",_=>window.location.reload());
    porvider.on("chainChanged",_=>window.location.reload());

  }

  useEffect( ()=>{
    const loadProvider= async()=>{
      const porvider=await detectEthereumProvider();

      if (porvider){
        providerChanaged(porvider);

        setweb3Api(
          {
            porvider,
            web3:new Web3(porvider)
          }
        )
      }else {
        console.log("Please install metamask");
      }
    }
  
loadProvider();
},[])
//create hook for Accunts 
const [account ,setAccount]=useState(null);
useEffect(()=>
{
  const getAccounts=async () =>
  {
    const accounts = await web3Api.web3.eth.getAccounts() ;
setAccount(accounts[0])
}
web3Api.web3 && getAccounts();
},[web3Api.web3]
)


//load contract content

;
useEffect(() =>{
  const loadContract= async ()=>{
     
    const contractFile= await fetch('/certificate.json');
    console.log(contractFile.json)
    const convertContractFileToJson= await contractFile.json();

    const abi =convertContractFileToJson.abi
    const networkId=await web3Api.web3.eth.net.getId();
    const networkObject=convertContractFileToJson.networks[networkId];
    if (networkObject)
    {
    const address =networkObject.address;

    const deployedcontract = await  new web3Api.web3.eth.Contract(abi,address)
     setContract(deployedcontract);
    
       
   
   
  
   
    }
    else{
window.alert("please connect with Ganache     network")
    }
  }
 web3Api.web3 && loadContract();
 },[web3Api.web3]) 


    const valid= async()=>{

        let t = document.getElementById("inputHash").value.toString()
        const c = await contract.methods.verifyDocument(t).call();
      
        if (c)
        {
          console.log(c)
          document.getElementById("btnValid").outerText=c
         
          document.getElementById("imgcert").src=`https://ipfs.filebase.io/ipfs/${t}`
          document.getElementById("stuName").outerText=c;
      
        }
        else
        {
          console.log("not found")
          document.getElementById("inputHash").value="Not Found"
        }
       }

    return(
<div>

    {/*start valid section*/}
<div className="input-group mb-3">
  <label className="input-group-text">Certificate Hash </label>
  <input type="text" className="form-control" id='inputHash'/>
  <button className="input-group-text" onClick={valid} id='btnValid'>Validate</button>
</div>
<img  id ="imgcert" width='300' height='300' ></img>
<label id="stuName" > </label>

{/*end avalid section*/}
</div>
        
    )  
}
export default Validate