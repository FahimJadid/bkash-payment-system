import axios from "axios";

const Home = () => {
  const handlePayment = async () => {
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

  return (
    <>
      <h1>Bkash Payment System</h1>
      <div className="card">
        <button onClick={handlePayment}>Pay with Bkash</button>
      </div>
    </>
  );
};

export default Home;
