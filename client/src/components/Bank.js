import React, { useState } from 'react';
import useEth from '../contexts/EthContext/useEth';
import './form.css';

function Bank() {
    const [score, setscore] = useState(0);
    const [accountAddress, setaccountAddress] = useState('');
    const { state: { contract, accounts } } = useEth();

    const handleChangescore = e => { setscore(e.target.value) };
    const handleChangeaccountAddress = e => { setaccountAddress(e.target.value) };

    const updateScore = async e => {
        await contract.methods.updateScore(accountAddress, score ).send({ from: accounts[0] });
    }

    return (
        <div>
            <div id='cen'>
                <form id="form">
                    <fieldset>
                        <h1>Update score of a account. Only bank can change this.</h1>
                        <h2>Account Address</h2>
                        <input type="text" style={{width: "100%"}} onChange={handleChangeaccountAddress} />
                        <h2>New Score</h2>
                        <input type="number"   onChange={handleChangescore} />
                    <input type="submit" name="submit" id="submit" onClick={updateScore} />
            </fieldset>
        </form>
                </div >
            </div >
        );


}

export default Bank;