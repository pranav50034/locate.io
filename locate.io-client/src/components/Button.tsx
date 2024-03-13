interface ButtonProps {
    text: string;
    onClick: () => void;
    disabled?: boolean;
}
const Button = ({ text, onClick, disabled }: ButtonProps) => {
   return (
      <button
         className="bg-black text-white font-bold py-2 px-4 rounded self-center mb-3"
         onClick={onClick}
         disabled={disabled}
      >
         {text}
      </button>
   );
};

export default Button;
