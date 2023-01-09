import { Link } from "react-router-dom"

function Nav() {
    return(
        <nav
        style={{
          height: "40px",
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
          fontSize: "large",
          background: "beige"
        }}
      >
        <div>
          <Link to="/">Home</Link> | {" "}
          <Link to="/register">KYC Register</Link> | {" "}
          {/* <Link to="/update">KYC Update</Link> | {" "} */}
          <Link to="/status">Status</Link> | {" "}
          <Link to="/admin">Add Bank</Link> | {" "}
          <Link to="/bank">Change Credit Score</Link> | {" "}
          <Link to="/addLoan">Add Loan</Link> | {" "}
          
        </div>
        </nav>
    )
}

export default Nav;