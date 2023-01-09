import React, { useState, useEffect } from 'react';
import useEth from '../contexts/EthContext/useEth';
import axios from 'axios';
import './form.css';

function Update() {
    const [aadharNum, setaadharNum] = useState('');
    const [file, setFile] = useState([]);
    const { state: { contract, accounts } } = useEth();
    // const [userdata, setuserdata] = useState();
    const handleChangeaadharNum = e => { setaadharNum(e.target.value) };
    function handleChange(event) {
        setFile(event.target.files[0])
    }

    useEffect(() => {
        // if(contract !=null){
        //     contract.methods.kycupdateInfo().call({ from: accounts[0] }).then(res => {
        //         return <p>I am a paragraph.</p>;
        //         // userdetail = (
        //         //     <>
        //         //     <p>I am a paragraph.</p>
        //         //     <p>I am a paragraph too.</p>
        //         //   </>
        //         // );
        //     })
        // }
    });

    // const getuserinfo = async e => {
    //         await contract.methods.kycupdateInfo().call({ from: accounts[0] }).then(user =>{
    //             const url = user.cid;
    //             return (
    //                 <div>        
    //                 <h2>Name of applicant</h2>
    //                 <div id="fullName">
    //                     <input type="text" name="fName" id="fname" value={user.fname} readonly/>
    //                     <input type="text" name="lName" id="lname" value={user.lname} readonly/>
    //                 </div>
    //                 <h2>Contact details</h2>
    //                     <div id='sub'>
    //                     <input types='email' name='email' value={user.email} readonly/>
    //                     <input type="tel" name="phone" id="phone" value={user.number} readonly/>
    //                     </div>
    //                     <h2>Aadhar details</h2>
    //                     <input type="text" style={{ width: "40rem" }} data-type="adhaar-number" value={user.aadhar} readOnly/>
    //                     <a href={url}>Aadhar</a>
    //                     <h2>Account Address</h2>
    //                     <input type="text" style={{width: "100%"}} value={user.addr} readOnly/>
    //             </div>
    //             );
    //         })
    // }

    const update = async e => {

        e.preventDefault()
        const url = 'https://ipfs.infura.io:5001/api/v0/add?pin=true';
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': "Basic MksydzhxM0xoYlAxQVhPa3o4NGpGdHg4ZkVCOjhlMmYxOTAxNDQ1NTMzMTI4YzFlNTU1Y2Y0M2ZkYmRl"
            },
        };
        try {
            axios.post(url, formData, config).then((response) => {
                var data = response.data.split("}");
                data = data[0] + '}';
                data = JSON.parse(data);
                contract.methods.KycUpdate(aadharNum, data.Hash).send({ from: accounts[0] });
            });
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <div>
            <div id='cen'>
                <form id="form">
                    <fieldset>
                        <h1>KYC Update</h1>
                        <h2>Aadhar details</h2>
                        <input type="text" style={{ width: "40rem" }} data-type="adhaar-number" maxLength="12" onChange={handleChangeaadharNum} />
                        <input id="file-upload" type="file" name="file" onChange={handleChange} />
                        <input type="submit" name="submit" id="submit" onClick={update} />
                    </fieldset>
                </form>
            </div >
        </div >
    );


}

export default Update;