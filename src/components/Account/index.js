import React from "react";
import { Image, Well } from "react-bootstrap";
import placeholder from "../../images/placeholder.png";

const Account = () => {
  return (
    <div className="container">
      <div className="Account">
        <Image
          src={placeholder}
          circle
          style={{ margin: "10px 100px 10px 350px" }}
        />
        <Well style={{ width: "50%", margin: "auto" }} bsSize="small">
          Username
        </Well>
        <br />
        <Well style={{ width: "50%", margin: "auto" }} bsSize="small">
          Email
        </Well>
      </div>
    </div>
  );
};

export default Account;
