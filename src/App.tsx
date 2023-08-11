import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import "./App.css";

var banks = [];

function App() {
  var [binBank, setBinBank] = useState("");
  var [bankInfo, setBankInfo] = useState<any>({});
  var [accountNumber, setAccountNumber] = useState("");
  var [state, setState] = useState(0);
  var [QRLink, setQRLink] = useState<string>("");
  var [amount, setAmount] = useState(0);
  var [message, setMessage] = useState("");
  var [accountName, setAccountName] = useState("");
  var [url, setURL] = useState("");

  var [opt, setOtp] = useState<any>([
    { label: "AGRIBANK" },
    { label: "QTBANK" },
  ]);

  const handleAccountNumber = (e: any) => {
    setAccountNumber(e.target.value);
  };
  const handleAmount = (e: any) => {
    setAmount(e.target.value);
  };
  const handleAccountName = (e: any) => {
    setAccountName(e.target.value.toUpperCase());
  };
  const handleMessage = (e: any) => {
    setMessage(e.target.value);
  };

  if (state === 0) {
    setState(1);
    console.log(5);
    axios.get("https://api.vietqr.io/v2/banks", {}).then((response) => {
      var Options = [];
      for (var i = 0; i < response.data["data"].length; i++) {
        Options.push({
          label: response.data["data"][i]["shortName"],
          binCode: response.data["data"][i]["bin"],
        });
      }
      setOtp(Options);
    });
  }
  const handleBin = (event: any, value: string, reason: any, details: any) => {
    // e.target --> React Component --> khong co field 'value'
    // e.target cua cac cai khac --> HTML DOM --> co field 'value'
    setBinBank(value["binCode"]);
  };
  const createQRcode = (e: any) => {
    var URL = `https://img.vietqr.io/image/${binBank}-${accountNumber}-compact2.pgn?amount=${amount}&addInfo=${message}&accountName=${accountName}`;
    setURL(URL);
  };
  // call fb
  return (
    <div>
      <input
        className="accountNumber"
        onChange={handleAccountNumber}
        placeholder="Nhập số tài khoản tại đây"
      />

      <br></br>
      <Autocomplete
        className="banks"
        disablePortal
        options={opt}
        onChange={handleBin}
        sx={{ width: "50%" }}
        renderInput={(params) => <TextField {...params} label="Ngân hàng" />}
      />
      <input
        className="message"
        onChange={handleMessage}
        placeholder="Mời nhập nội dung chuyển khoản"
      />
      <tr></tr>
      <input
        className="amount"
        onChange={handleAmount}
        placeholder="Nhập số tiền bạn muốn chuyển"
      />
      <tr></tr>
      <input
        className="accountName"
        onChange={handleAccountName}
        placeholder="Tên tài khoản"
      />
      <tr></tr>
      <button className="Button" type="button" onClick={createQRcode}>
        Click to get QR code
      </button>
      <tr> </tr>
      <img src={url} alt="" />
    </div>
  );
}

// AutoComplete:
// { disablePortal: true, options=..., onChange=handleBin }
// Javascript co mot cai Event Listener
// Luc load trang => Then Event Listener chay vo han
// Neu value cua Autocomplete thay doi => Then Event Listener se goi ham Autocomplete.onChange

export default App;
