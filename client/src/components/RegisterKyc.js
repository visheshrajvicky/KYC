import React, { useState } from 'react';
import useEth from '../contexts/EthContext/useEth';
import axios from 'axios';
import './form.css';

function Register() {
    const [firstName, setfirstName] = useState('');
    const [lName, setlName] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [aadharNum, setaadharNum] = useState('');
    // const [cidAadhar, setcidAadhar] = useState('');
    const { state: { contract, accounts } } = useEth();
    const [file, setFile] = useState([]);
    // const INFURA_ID = '2K2w8q3LhbP1AXOkz84jFtx8fEB';
    // const INFURA_SECRET_KEY = '8e2f1901445533128c1e555cf43fdbde';
   

    const handleChangefName = e => { setfirstName(e.target.value) };
    const handleChangelName = e => { setlName(e.target.value) };
    const handleChangeemail = e => { setemail(e.target.value) };
    const handleChangephone = e => { setphone(e.target.value) };
    const handleChangeaadharNum = e => { setaadharNum(e.target.value) };

    function handleChange(event) {
        setFile(event.target.files[0])
      }
      
    const kycRegister = async e => {
        // console.log(cidAadhar);
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
        try{
            axios.post(url, formData, config).then((response) => {
                var data = response.data.split("}");
                    data = data[0] + '}';
                 data = JSON.parse(data);
                contract.methods.KycRegistration(firstName, lName, email, phone, aadharNum, data.Hash).send({ from: accounts[0] });
              });
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div>
            <div id='cen'>
                <form id="form">
                    <fieldset>
                        <h1>KYC Registration</h1>

                        <h2>Name of applicant</h2>

                        <div id="fullName">
                            <input type="text" name="fName" id="fname" placeholder="First Name" required onChange={handleChangefName} />
                            <input type="text" name="lName" id="lname" placeholder="Last Name" required onChange={handleChangelName} />
                        </div>

                        <h2>Contact details</h2>
                        <div id='sub'>
                            <input types='email' name='email' placeholder='email@gmail.com' onChange={handleChangeemail} />
                            <input type="tel" name="phone" id="phone" placeholder="Telephone Number" required onChange={handleChangephone} />
                        </div>
                        <h2>Aadhar Number</h2>
                        <input type="text" data-type="adhaar-number" maxLength="12" onChange={handleChangeaadharNum} />
                        <input id="file-upload" type="file" name="file" onChange={handleChange} />
                        <input type="submit" name="submit" id="submit" onClick={kycRegister} />
                    </fieldset>
                </form>
            </div >
        </div >



    );


}

export default Register;