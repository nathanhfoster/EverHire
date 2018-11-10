import React from "react";
import { FormControl, ControlLabel, FormGroup, Button } from "react-bootstrap";

const Account = () => {
  return (
    <div className="container">
      <div className="Account">
        <h2 style={{ textAlign: "center" }}>Account</h2>
        <div className="container">
          <form style={{ marginTop: "10px" }}>
            <FormGroup style={{ width: "50%", margin: "auto" }}>
              <ControlLabel>Username</ControlLabel>
              <FormControl type="text" placeholder="Username" />
              <br />
              <ControlLabel>Password</ControlLabel>
              <FormControl type="text" placeholder="Password" />
              <br />
              <Button>Save</Button>
            </FormGroup>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;
