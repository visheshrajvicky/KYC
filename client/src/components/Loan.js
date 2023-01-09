import React, { useState } from 'react';
import useEth from '../contexts/EthContext/useEth';
import './form.css';

function Loan() {
    const [amount, setamount] = useState(0);
    const [rate, setrate] = useState(0);
    const [purpose, setPurpose] = useState('');
    const [accountAddress, setaccountAddress] = useState('');
    const { state: { contract, accounts } } = useEth();

    const handleChangeAmount = e => { setamount(e.target.value) };
    const handleChangePurpose = e => { setPurpose(e.target.value)};
    const handleChangeaccountAddress = e => { setaccountAddress(e.target.value) };
    const handleChangeRate = e => { setrate(e.target.value)};

    const addloandata = async e => {
        await contract.methods.addLoan(accountAddress, purpose, amount, rate ).send({ from: accounts[0] });
    }

    return (
        <div>
            <div id='cen'>
                <form id="form">
                    <fieldset>
                        <h1> Add loan data. Only bank can change this.</h1>
                        <h2>Account Address</h2>
                        <input type="text" style={{width: "100%"}} onChange={handleChangeaccountAddress} />
                        <h2>Purpose</h2>
                        <input type="text" style={{width: "50%"}} onChange={handleChangePurpose} />
                        <h2>Amount</h2>
                        <input type="number" onChange={handleChangeAmount} />
                        <h2>Interest Rate</h2>
                        <input type="number" onChange={handleChangeRate} />

                    <input type="submit" name="submit" id="submit" onClick={addloandata} />
            </fieldset>
        </form>
                </div >
            </div >
        );


}

export default Loan;