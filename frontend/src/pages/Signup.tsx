import { Link, useNavigate } from "react-router-dom";
import ButtonComponent from "../components/ButtonComponent";
import InputBox from "../components/InputBox";
import YouTubeVideo from "../components/YouTubeVide";
import {  useState } from "react";
import { SignupType } from "@roy777xyz/new_comman-app";
import axios from "axios";
import { BACKEND_URL } from "../config";



export default function Signup() {
  const navigate = useNavigate()
   
  // Inlize kiya h state ka
  const [postInputs,setPostInputs] = useState<SignupType>({
    name: "",
    email: "",
    password: "",
  })
    
  async function sendRequest(){
    try{

      const response  = await axios.post(`${BACKEND_URL}/api/v1/user/signup`,postInputs);
      const jwt =  response.data;
      localStorage.setItem("token",jwt);
      navigate('/blogs')
    }catch(e){
       alert("while error occur during signup ")
    }
  }

  return (
    <div>
      <div>
        <div className="bg-grey-lighter min-h-screen flex flex-col">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex  justify-center py-20">
              <div className="container max-w-sm mx-auto px-2">
                <div className="bg-slate-300 px-6 py-8 rounded shadow-md text-black w-full">
                  <h1 className="mb-8 text-3xl text-center">Sign up</h1>



                  <InputBox placeholder="Username" type="text" onChange={(e)=>{
                      setPostInputs({
                        ...postInputs,
                         name: e.target.value
                      })
                  }} />


                  <InputBox placeholder="Email" type="text" onChange={(e)=>{
                        setPostInputs({
                          ...postInputs,
                          email: e.target.value
                        })
                  }}/>


                  <InputBox placeholder="password" type="password" onChange={(e)=>{
                      setPostInputs({
                        ...postInputs,
                        password: e.target.value
                      })
                  }} />



                  <div className="flex  justify-center ">
                    <ButtonComponent title="New User" onClick={sendRequest} />
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
                  Already account click here?{" "}
                  <span
                    className="w-fit border-solid  
                  border-b-2 border-blue-500 cursor-pointer"
                  >
                    <Link to="/signin">
                    Sign in
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
