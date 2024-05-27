import { useBlogs } from "../hooks";
import AvatarComponent from "./AvatarComponent";

export default function BodySection() {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div className=" bg-gray-500  ">
        <span className="flex space-x-4 mt-12 justify-center bg-slate-400 " >

        
          <AvatarComponent />
          <div>
            Name
            <div>designation</div>
            <div>Date</div>
          </div>
       
        </span>
        <div className="flex justify-center">
          <div>title</div>
          <div>content</div>
        </div>
      </div>
    </div>
  );
}
