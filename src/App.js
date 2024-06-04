
import React, { useEffect, useState } from 'react';
const ethers = require("ethers");
function App() {
  const [contract, setContract] = useState(null);
  const [stuName, setStuName] = useState();
  const [certPath, setCertPath] = useState();
  const [inHash, setinHash] = useState();
  //load contract content
  const loadContract = async () => {
    const contractFile = await fetch('/certificate.json');
    const convertContractFileToJson = await contractFile.json();

    const abi = convertContractFileToJson.abi

    const networkObject = convertContractFileToJson.networks[11155111n];
    if (networkObject) {
      const address = networkObject.address;
      const node = "https://rpc.sepolia.org";
      const provider = new ethers.JsonRpcProvider(node);


      let privatekey = "8331e81d49fa5bfd94ed24fc4609a356c15ac36bdf91df721895f71a8675666b";
      let wallet = new ethers.Wallet(privatekey, provider);

      //let contractaddress = "0x8b65d3961725c7968bafb053f06a1a5993c1";
      let deployedcontract = new ethers.Contract(address, abi, wallet);


      setContract(deployedcontract);
    }
  }
  useEffect(() => {
    //Runs only on the first render
    loadContract();
  }, []);

  const valid = async () => {
  const t = await document.getElementById("inputHash").value.toString();
    if (t)
    {
    setinHash(t);
        //const c = await contract.methods.verifyDocument(t).call();
    let c= await contract.verifyDocument(t);
    
    if (c) {
      setStuName(c);
      setCertPath(`https://ipfs.filebase.io/ipfs/${t}`);
    }
    else {
      setStuName('');
    }
    }
     else {window.location.reload()}
  }
  return (
    <div className='App' >
      {/* start nav bar*/}
      <nav className="navbar  navbar-dark bg-dark" >
        <a className="navbar-brand" ><h4><span className="text-success"></span>YCV </h4> </a>
        <form className="d-flex" role="search">
        </form>
      </nav>
      {/** hero */}
      <section className='bg-dark text-light text-center text-sm-start py-4'>
        <div className='container'>
          <div className='d-flex align-items-center justify-content-center'>
            <div className='py-3'>
              <h1>Yemen<span className='display-5 text-success fw-bold'> Certificate Validation</span></h1>
              <p className='py-3 lead '>input Certificate hash To look for the Certificate hash in Blockchain if the hash if found   the Certificate store in IPFS  is showen    </p>
            </div>
            <div className='align-items-right'><img className='d-none img-fluid w-100  d-sm-block align-left' src='download (3).jfif'alt =""></img>
            </div>
          </div>
        </div>
      </section>
      {/* end the navbar*/}
      {/*startheader  section*/}
      <hr className='my-2 bg-danger'></hr>
      {/*end  valid section*/}
      {/*start valid section*/}
      <section className='py-5 container'>
        <div className=" input-group mb-3 align-items-center justify-content-center">
          <label className="input-group-text">Certificate Hash </label>
          <input type="text" className="form-control" id='inputHash' />
          <button className="btn btn-outline-secondary" onClick={valid} id='btnValid'>Search</button>
        </div>
        {(function () {
          if (stuName) {
            return <div className="card text-center">
              <div className="card-body align-items-center justify-content-center">
                <img src={certPath} alt ="certimge" width="60%" height="600" ></img>
                <h5 className="card-title ">{stuName}</h5>
              </div>
            </div>;
          } else if (inHash!='' && (stuName === '')) {
            return <div className=" input-group mb-3 align-items-center justify-content-center">
              <label className=' align-center' style={{ fontSize: '30px', fontweight: 'bold', backgroundColor: 'red' }} >Certificate's hash is not found </label>
            </div>;
          }
        })()}
      </section>
      {/*end avalid section*/}
      <footer className='mastfoot mt-5 fixed-bottom'>
        <div className='container'>
          <p className='lead text-center bg-dark by-3 text-white'> @Copyright : 2023 Muna Khawi</p>
        </div>
      </footer>
    </div>
  )
}
export default App;
