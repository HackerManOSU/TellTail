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
        className={`collapsible ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {name}
      </button>
      <div className={`description ${isOpen ? "open" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default Collapsible;
