import { useParams } from "react-router-dom";
const Error = () => {
  // const searchData = new URLSearchParams(window.location.search);
  // const message = searchData.get("message");
  const { message } = useParams();
  return <div>Payment with Bkash : {message}</div>;
};

export default Error;
