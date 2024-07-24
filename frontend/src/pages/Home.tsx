import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const Navigate=useNavigate();
  useEffect(()=>{
    const token=localStorage.getItem('token');
    if(!token)
    {
      Navigate('/sign-in');;
    }
  },[Navigate]);
  return (
    <div className="flex-1 ml-64 p-4">
      Home
    </div>
  )
}

export default Home