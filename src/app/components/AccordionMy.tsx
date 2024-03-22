import React, { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

interface AccordionItem {
  id: number;
  title: string;
  content: string | React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

const AccordionMy: React.FC<AccordionProps> = ({ items }: any) => {
  const [closeItems, setCloseItems] = useState<number[]>([]);

  const toggleItem = (itemId: number) => {
    if (closeItems.includes(itemId)) {
      setCloseItems(closeItems.filter((id) => id !== itemId));
    } else {
      setCloseItems([...closeItems, itemId]);
    }
  };

  return (
    <div>
      {items.map((item: any) => (
        <div key={item.id} className="border border-gray-700 rounded mb-4">
          <div
            className={`flex justify-between items-center px-4 py-2 bg-gray-700 cursor-pointer ${
              closeItems.includes(item.id) ? "rounded-b-none" : "rounded"
            }`}
            onClick={() => toggleItem(item.id)}
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
            {closeItems.includes(item.id) ? (
              <FaChevronRight className="text-gray-100 transition-transform duration-300" />
            ) : (
              <FaChevronDown className="text-gray-100 transition-transform duration-300 transform rotate-180" />
            )}
          </div>
          <div
            className={`px-4 py-2 ${
              closeItems.includes(item.id) ? "hidden" : "block"
            }`}
          >
            <p>{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccordionMy;
