import React, { useEffect, useState } from "react";
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
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (itemId: number) => {
    setOpenItems([itemId]);
  };
  
  useEffect(() => {
    if(items.length > 0) {
      setOpenItems([items[0]?.id]);
    }
  }, [items]);

  return (
    <div>
      {items.map((item: any) => (
        <div key={item.id} className="border border-gray-700 rounded mb-4">
          <div
            className={`flex justify-between items-center px-4 py-2 bg-gray-700 cursor-pointer ${
              openItems.includes(item.id) ? "rounded-b-none" : "rounded"
            }`}
            onClick={() => toggleItem(item.id)}
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
            {openItems.includes(item.id) ? (
              <FaChevronDown className="text-gray-100 transition-transform duration-300 transform rotate-180" />
            ) : (
              <FaChevronRight className="text-gray-100 transition-transform duration-300" />
            )}
          </div>
          <div
            className={`px-4 py-2 ${
              openItems.includes(item.id) ? "block" : "hidden"
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
