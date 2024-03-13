interface InputProps {
   state: string;
   setState: (value: string) => void;
   placeholder: string;
   type: string;
   required: boolean;
   className?: string
}

const InputComponent = ({ type, state, setState, placeholder, required, className }: InputProps) => {
   return (
      <input
         type={type}
         value={state}
         onChange={(e) => setState(e.target.value)}
         placeholder={placeholder}
         required={required}
         className={className ? `${className}` : "w-full border border-black p-2"}
      />
   );
};

export default InputComponent;

