import React from "react";
import QRCode from "../../3rdparty/qrcode";
import PropTypes from "prop-types";

class PaymentData extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("PaymentData Mounted");
    new QRCode(document.getElementById("qrcode"), this.props.adress);
  }

  render() {
    return (
      <div className="col-xs-12">
        <div className="well enable-comment">
          <h4>Payment request created</h4>
          <p>
            Please send <b>{this.props.amount}</b>BTC to the address{" "}
            <b>{this.props.adress}</b>
          </p>
          <br />
          <div id="qrcode" />
          <a
            className="btn btn-sm btn-default"
            href="https://webgold.wrioos.com/?list=Offer"
            role="button"
          >
            <span className="glyphicon glyphicon-remove" />Cancel
          </a>
        </div>
      </div>
    );
  }
}
PaymentData.propTypes = {
  adress: PropTypes.string,
  amount: PropTypes.string
};

export default PaymentData;
