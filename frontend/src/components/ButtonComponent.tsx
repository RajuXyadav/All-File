
interface value{
  title:string,
  onClick:any
}




export default function ButtonComponent({title,onClick}:value) {
  return (
    <div>
      <button
       onClick={onClick}
        type="button"
        className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-100  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        {title}
      </button>
    </div>
  );
}
