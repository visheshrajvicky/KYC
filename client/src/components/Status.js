import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import useEth from '../contexts/EthContext/useEth';
import "./status.css"
function Status() {
    const { state: { contract, accounts } } = useEth()
    const [users, setusers] = useState([]);
    const navigate = useNavigate();

    const listallusers = async () => {
        setusers([]);
        const usercount = await contract.methods.getuserCount().call({ from: accounts[0] });
        console.log(usercount);
        for (let index = 0; index < usercount; index++) {
            const useraddress = await contract.methods.userList(index).call({ from: accounts[0] });
            const userdetail = await contract.methods.users(useraddress).call({ from: accounts[0] });
            setusers(prevItems => [...prevItems, userdetail]);
        }
    }

    function handleClick(e) {
        navigate(`/getloaninfo/${e.target.value}`);
      }
    function KycUpdate(e) {
        navigate(`/update/${e.target.value}`);
      }

    return (
        <div>
            <h2>Status Page</h2>
            <button type="button" onClick={listallusers}>Click Me!</button>
            <table>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Address</th>
                    <th>KYC Expire Date</th>
                    <th>Aadhar</th>
                    <th>KYC Update</th>
                    <th>Credit Score</th>
                    <th>Active Loans</th>
                </tr>
                {users.map(({ fname, id, cid_aadhar, score, expire_date },index) => (
                        <tr>
                            <td>{index}</td>
                            <td>{fname}</td>
                            <td>{id}</td>
                            <td>{new Date(Number(expire_date) * 1000).toDateString()}</td>
                            <td><button type="button" value = {cid_aadhar} onClick={()=> window.open(`https://ipfs.io/ipfs/${cid_aadhar}`, "_blank")}>Link</button></td>
                            <td><button type="button" value = {id} onClick={KycUpdate}>Update</button></td>
                            <td>{score}</td>
                            <td><button type="button" value = {id} onClick={handleClick}>Check</button></td>
                        </tr>
                    ))}
            </table>
        </div>
    )
}

export default Status;

