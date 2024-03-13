interface InputProps {
   state: string;
   setState: (value: string) => void;
   placeholder: string;
   type: string;
   required: boolean;
}

const InputComponent = ({ type, state, setState, placeholder, required }: InputProps) => {
   return (
      <input
         type={type}
         value={state}
         onChange={(e) => setState(e.target.value)}
         placeholder={placeholder}
         required={required}
         className="w-full md:w-[70%] lg:w-[60%] xl:w-[50%] p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
      />
   );
};

export default InputComponent;

