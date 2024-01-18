import axios from "axios";

const Home = () => {
  const handleBkashPayment = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/payment/bkash/create",
        {
          amount: 10,
          orderId: 1,
        },
        {
          withCredentials: true,
        }
      );
      window.location.href = data.bkashURL;
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleSSLPayment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/payment/ssl/initialize",
        {
          amount: 100, // Provide the amount dynamically or as needed
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);

      // Redirect the user to the payment gateway page
      window.location.href = response.data.GatewayPageURL;
    } catch (error) {
      // console.error("Error initiating payment:", error.response.data);
      console.error(error);
    }
  };

  return (
    <>
      <h1>Bkash & SSLCOMMERZ Payment System</h1>
      <div className="card">
        <button onClick={handleBkashPayment}>Pay with Bkash</button>
        <button onClick={handleSSLPayment}>Pay with SSLCOMMERZ</button>
      </div>
    </>
  );
};

export default Home;
