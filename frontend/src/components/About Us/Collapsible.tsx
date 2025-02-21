import { useState } from "react";

interface CollapsibleProps {
  name: string;
  children: React.ReactNode;
}

const Collapsible: React.FC<CollapsibleProps> = ({ name, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#E9D0B8] text-[#1b1b1b] font-semibold cursor-pointer p-[18px] w-full border-0 text-left focus:outline-none text-[15px] flex justify-between items-center"
      >
        {name}
        <span className="text-[13px] text-black">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      <div
        className={`bg-[#E9D0B8] overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[200px] p-[10px]" : "max-h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Collapsible;
