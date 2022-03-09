import { Result } from "antd";
import { Link } from "react-router-dom";
import Btn from "./Components/Common/Btn";

function NotFoundPage() {
    
  return (
    <Result
      status="404"
      title="404"
      subTitle="صفحه ای با این آدرس وجود ندارد!"
      extra={<Link to="/" className="bg-sky-500 text-white rounded-md px-8 py-2"><Btn>بازگشت</Btn></Link>}
    />
  );
}

export default NotFoundPage;
