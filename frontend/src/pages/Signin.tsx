import InputBox from "../components/InputBox";
import ButtonComponent from "../components/ButtonComponent";
import YouTubeVideo from "../components/YouTubeVide";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
 

interface SigninType{
   email: string,
   password:string
}

export default function Signin() {
const navigate = useNavigate()
  



  const [postInput,setPostInput] = useState<SigninType>({
          email:'',
          password:''
  })

  async function sendRequests(){
    const response =  await axios.post(`${BACKEND_URL}/api/v1/user/signin`,postInput)
    const jwt = response.data;
    localStorage.setItem("token",jwt)
    navigate('/blogs')
 }


  return (
    <div>
    <div>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex  justify-center py-20">
            <div className="container max-w-sm mx-auto px-2">
              <div className="bg-slate-300 px-6 py-8 rounded shadow-md text-black w-full">
                <h1 className="mb-8 text-3xl text-center">Sign in</h1>

               
                <InputBox placeholder="Email" type="text" onChange={(e)=>{
                     setPostInput({
                          ...postInput,
                          email: e.target.value
                     })
                }} />
                <InputBox placeholder="password" type="password" onChange={(e)=>{
                       setPostInput({
                         ...postInput,
                         password: e.target.value
                       })
                }} />

                <div className="flex  justify-center ">
                  <ButtonComponent title="New User" onClick={sendRequests} />
                </div>

                <div className="text-center text-sm text-grey-dark mt-4">
                  By signing up, you agree to the <span></span>
                  <a
                    className="no-underline border-b border-grey-dark text-grey-dark"
                    href="#"
                  >
                    Terms of Service <span></span>
                  </a>
                  and <span></span>
                  <a
                    className="no-underline border-b border-grey-dark text-grey-dark"
                    href="#"
                  >
                    Privacy Policy
                  </a>
                </div>
              </div>

              <div className="text-grey-dark mt-6">
                Don't have account?{" "}
                <span
                  className="w-fit border-solid  
                border-b-2 border-blue-500 cursor-pointer"
                >
                  <Link to="/signup">
                   Sign up
                  </Link>
                </span>
              </div>
            </div>
          </div>
          <div>
            <YouTubeVideo/>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
