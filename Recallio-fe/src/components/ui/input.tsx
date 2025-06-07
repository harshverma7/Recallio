interface InputProps {
  placeholder: string;
  reference?: any;
}

export function Input({ placeholder, reference }: InputProps) {
  return (
    <div>
      <input
        ref={reference}
        placeholder={placeholder}
        type={"text"}
        className="px-4 py-2 border rounded-lg shadow-sm m-2 hover:border-purple-400"
      ></input>
    </div>
  );
}

{
  /* <input
  ref={reference}
  placeholder={placeholder}
  type="text"
  className="
    w-full px-4 py-2.5 
    bg-white border border-gray-200 
    rounded-lg shadow-sm
    text-gray-900 text-base
    placeholder:text-gray-400
    transition-all duration-300
    hover:border-purple-400
    focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200
    disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none
  "
/> */
}
