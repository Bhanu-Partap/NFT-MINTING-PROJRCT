import Web3 from "web3";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaWallet } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteValue, setvalue } from "../store/Reducer/web3";
import { deleteValueacc, setvalueacc } from "../store/Reducer/accounts";

const OffcanvasExample = () => {
  // const [web3, setWeb3] = useState(null);
  // const [accounts, setAccounts] = useState([]);

  const dispatch = useDispatch();
  const accountsstate = useSelector(
    (state) => state.rootReducer.accounts.address
  );
  const web3 = useSelector((state) => state.rootReducer.web3.address);

  const connectToMetamask = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        // setWeb3(web3);
        dispatch(setvalue(accounts));
        // const capitalizedAccounts = accounts.map((accounts) =>
        // accounts.toUpperCase()
        // );  
        dispatch(setvalueacc(accounts));
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Need to install MetaMask");
    }
  };

  const disconnectFromMetamask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum({
          method: "wallet_requestPermissions",
          params: [{ eth_accounts: {} }],
        });
        dispatch(deleteValue());
        dispatch(deleteValueacc());
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg  ">
        <div class="container-fluid">
          <Link class="navbar-brand" to="#">
            <span className="yellow">NFT</span>{" "}
            <span className="green"> MINT</span>
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse item-list navbar-collapse" id="navbarText">
            <ul class="navbar-nav ms-auto me-auto mb-2 mb-lg-0">
              <li class="nav-item ">
                <Link class="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to="/collection">
                  Collection
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to="/about">
                  About
                </Link>
              </li>
            </ul>
            {accountsstate.length > 0 && (
              <p className="px-3">
                Account:{" "}
                {accountsstate[0].slice(0, 4) +
                  "..." +
                  accountsstate[0].slice(38, 42)}
              </p>
            )}
            {web3 ? (
              <Button
                className="btnsize btn-clrg me-4"
                onClick={disconnectFromMetamask}
              >
                Logout <FaWallet />
              </Button>
            ) : (
              <Button
                className="btnsize btn-clrg me-4"
                onClick={connectToMetamask}
              >
                Connect <FaWallet />
              </Button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default OffcanvasExample;
