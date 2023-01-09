// SPDX-License-Identifier: Vishesh
pragma solidity >=0.5.0 <0.9.0;

contract KYC {

    struct Loan{
        string purpose;
        uint amount;
        uint date;
        uint interestRate;
    }

    struct User {
        string fname;
        string lname;
        string email;
        string mobNumber;
        address id;
        uint256 aadhar_number;
        string cid_aadhar;
        bool used;
        uint256 expire_date;
        uint256 score;
        Loan [] loans;
    }

    mapping(address => User) public users;
    mapping(address => bool) public banks;

    address[] public userList; 
    address public admin; 

    constructor() {
        admin = msg.sender;
        banks[msg.sender] = true;
    }

    event flagExpiring_kyc(address user, uint256 userexpire_date);

    function addBank(address _bankAddress) public {
        require(
            msg.sender == admin,
            "You are not authorized to use this function"
        );
        banks[_bankAddress] = true;
    }

    function updateScore(address _personAddress, uint256 newScore) public {
        require(
            banks[msg.sender] == true,
            "You are not authorized to use this function, Only bank can update credit score"
        );
        users[_personAddress].score = newScore;
    }

    function getScore(address _personAddress) public view returns (uint256) {
        return users[_personAddress].score;
    }

    function addLoan(address _personAddress, string memory _purpose, uint _amount, uint _interest) public{
                require(
            banks[msg.sender] == true,
            "You are not authorized to use this function, Only bank can update credit score"
        );

        Loan memory loan = Loan(
            _purpose, 
            _amount, 
            block.timestamp, 
            _interest);
        users[_personAddress].loans.push(loan);
    } 

    function getLoanInfo(address _personAddress) public  view returns(Loan[] memory){
        return (users[_personAddress].loans);
    }


    function KycRegistration(
        string memory _fname,
        string memory _lname,
        string memory _email,
        string memory _mobNum,
        uint256 _addharnum,
        string memory _cidaadhar
    ) public returns (bool) {
        require(
            users[msg.sender].aadhar_number != _addharnum,
            "Aadhar already Exists"
        );

        users[msg.sender].fname = _fname;
        users[msg.sender].lname = _lname;
        users[msg.sender].email = _email;
        users[msg.sender].mobNumber = _mobNum;
        users[msg.sender].id = msg.sender;
        users[msg.sender].aadhar_number = _addharnum;
        users[msg.sender].cid_aadhar = _cidaadhar;
        users[msg.sender].used = true;
        users[msg.sender].expire_date = block.timestamp + 365 days;
        users[msg.sender].score = 0;

        appenduserinfo(msg.sender);

        return users[msg.sender].used;
    }

    function ValidityCheck(address id) public view returns (string memory) {
        if (block.timestamp > users[id].expire_date) {
            return "KYC report has Expired!";
        } else {
            return "KYC report is Valid!";
        }
    }

    function KycUpdate(uint256 _aadharnum, string memory _cidaadhar) public returns (string memory) {
        users[msg.sender].aadhar_number = _aadharnum;
        users[msg.sender].cid_aadhar = _cidaadhar;
        return "Updated Sucessfully";
    }

    function kycupdateInfo() public view returns(string memory fname, 
    string memory lname,
    string memory email,
    string memory number,
    address addr,
    uint256 aadhar,
    string memory cid,
    uint256 expire_date
    ){
        return(
            users[msg.sender].fname,
            users[msg.sender].lname,
            users[msg.sender].email,
            users[msg.sender].mobNumber,
            users[msg.sender].id,
            users[msg.sender].aadhar_number,
            users[msg.sender].cid_aadhar,
            users[msg.sender].expire_date
        );
    }

    function appenduserinfo(address user) private {
        userList.push(user);
    }

    function getuserCount() public view returns (uint256 count) {
        return userList.length;
    }

    function userLoop() public {
        require(
            msg.sender == admin,
            "You are not authorized to use this function"
        );

        for (uint256 i = 0; i < userList.length; i++) {
            if (
                users[userList[i]].expire_date < block.timestamp + 30 days &&
                users[userList[i]].expire_date > block.timestamp + 1 days
            ) {
                emit flagExpiring_kyc(
                    userList[i],
                    users[userList[i]].expire_date
                );
            }
        }
    }
}
