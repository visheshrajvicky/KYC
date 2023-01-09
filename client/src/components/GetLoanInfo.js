import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useEth from '../contexts/EthContext/useEth';
import "./status.css"

function GetLoanInfo(props){
    const { state: { contract, accounts } } = useEth();
    const [ laoninfo, setloaninfo ] = useState([]);
    const { id } = useParams();
    // console.log(id);

    useEffect(() => {
        if(contract != null){
            contract.methods.getLoanInfo(id).call({ from: accounts[0] }).then(res => {
                setloaninfo(res);
            })
        }
    })
    return(
        <div>
            <h1>Loan Information of</h1>
            <table>
                <tr>
                    <th>#</th>
                    <th>Purpose</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Interest Rate</th>
                </tr>
                { laoninfo.map(({ purpose, amount, date, interestRate },index) => (
                        <tr>
                            <td>{index}</td>
                            <td>{purpose}</td>
                            <td>{amount}</td>
                            <td>{new Date(Number(date) * 1000).toDateString()}</td>
                            <td>{interestRate} %</td>
                        </tr>
                    ))}
            </table>
             
        </div>
    )

}

export default GetLoanInfo;