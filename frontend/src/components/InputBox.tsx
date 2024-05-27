
import { ChangeEvent } from "react";


interface LabelledInput{
  placeholder:string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  type: string
}



export default function InputBox({placeholder,onChange,type}:LabelledInput) {
  return (
    <div>
      <input
        type={type}
        className="block border border-grey-light w-full p-3 rounded mb-4 text-black"
        name="fullname"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
