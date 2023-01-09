import React, { useState } from 'react';
import useEth from '../contexts/EthContext/useEth';
import './form.css';

function AddBank() {
    const [bankAddress, setbankAddress] = useState('');
    const { state: { contract, accounts } } = useEth();

    const handleChangebankAddress = e => { setbankAddress(e.target.value) };

    const update = async e => {
        await contract.methods.addBank( bankAddress ).send({ from: accounts[0] });
    }

    return (
        <div>
            <div id='cen'>
                <form id="form">
                    <fieldset>
                        <h1>Add Banks Account. Only admin of the contract can do this.</h1>
                        <h2>Bank Address</h2>
                        <input type="text" style={{width: "100%"}} onChange={handleChangebankAddress} />
                    <input type="submit" name="submit" id="submit" onClick={update} />
            </fieldset>
        </form>
                </div >
            </div >
        );


}

export default AddBank;