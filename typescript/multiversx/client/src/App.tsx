import "bootstrap/dist/css/bootstrap.min.css";
import { Input } from "reactstrap";
import { MultiversXService, Response } from "@genezio-sdk/multiverse-ts";
import { useState, useEffect } from "react";

export default function App() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

  useEffect(() => {
    if (address && address.length > 0) {
      MultiversXService.queryAddress(address).then((res: Response) => {
        setBalance(res.balance.toString() + "EGLD");
      });
    } else {
      setBalance("");
    }
  }, [address]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "80%" }}>
        <h1 style={{ textAlign: "center" }}>Genezio MultiversX Demo</h1>
        <Input
          className="form-control"
          placeholder="Address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div style={{ textAlign: "center" }}>Balance is: {balance}</div>
      </div>
    </div>
  );
}
