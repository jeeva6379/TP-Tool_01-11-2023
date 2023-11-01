import react from "react";
import { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { Link } from "react-router-dom";

import "./App.css"
const SubmitPaper = () => {
  
    const containerStyle = {
        textAlign: 'center',
        padding: '20px',
      };
      
      const headingStyle = {
        fontSize: '2rem',
        margin: '20px 0',
      };

      
      
      const payTableTd = {
        padding:  '.2rem 1rem',
        border: '1px solid #0006'
      };
      const payStyle = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
  
      };
      
      const priceStyle = {
        fontSize: '1rem',
      };
      
      const linkStyle = {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        textDecoration: 'none',
        width: '300px',
        marginInline: "1rem"
      };
 
  return (
    <div className="container">
     
     <div style={containerStyle}>
      <h1 style={headingStyle}>Submit Paper</h1>

      <div className="text-end">
      <Button href="/Dashboard" className="bg-warning text-dark p-1 ">
            Back
          </Button>
      </div>
      <h4 style={payStyle} className="pay mt-3">
        Buy Credits
      </h4>
      
      

<table className='mx-auto mb-5' >
<tr><td style={payTableTd}>$2</td>  <td style={payTableTd}>5000 Words</td> </tr>
<tr><td style={payTableTd}>$4</td>  <td style={payTableTd}>10,000 words</td></tr> 
<tr><td style={payTableTd}>$6</td>  <td style={payTableTd}>15,000 words</td> </tr>
<tr><td style={payTableTd}>$8</td>  <td style={payTableTd}>20,000 words</td> </tr>
<tr><td style={payTableTd}>$10</td>  <td style={payTableTd}>25,000 words</td> </tr>
</table>

      
<p>
        <a
          href="https://www.paypal.com/paypalme/InventiveResOrg"
          style={linkStyle}
          target="_blank"
        >
          PayPal
        </a>
    
        <a
          href="https://razorpay.com/payment-button/pl_Mv5Y7VghyOwsxB/view"
          style={linkStyle}
          target="_blank"
        >
          RazorPay
        </a>
      </p>
      <div><form><script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_Mv5Y7VghyOwsxB" async> </script> </form>
</div>

<div  className="my-5">
<p>After you have completed the payment, you will receive login credentials as well as instructions for obtaining the TP Report.</p>
<p>TP Report contains the Tortured Phrases or poorly-written phrases within the article.</p>


</div>
<Button href="/Login" className="bg-secondary text-light p-1 border-dark border-2">
            Login
          </Button>
    </div>
     </div>
    
  );
};

export default SubmitPaper;

