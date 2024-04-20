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

const AccordionMy: React.FC<AccordionProps> = ({ items }) => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  // Toggle an item's open/closed state
  const toggleItem = (itemId: number) => {
    if (openItems.includes(itemId)) {
      setOpenItems(openItems.filter(id => id !== itemId));  // Remove item from list
    } else {
      setOpenItems([...openItems, itemId]);  // Add item to list
    }
  };

  const style = {
    whiteSpace: 'pre-line',
  };

  useEffect(() => {
    if (items.length > 0) {
      setOpenItems([items[0]?.id]);  // Initially open the first item (optional)
    }
  }, [items]);
  return (
    <div>
      {items.map((item: AccordionItem) => (
        <div key={item.id} className="border border-gray-700 rounded mb-4">
          <div
            className={`flex justify-between items-center px-4 py-2 bg-gray-700 cursor-pointer ${
              openItems.includes(item.id) ? "rounded-b-none" : "rounded"
            }`}
            onClick={() => toggleItem(item.id)}
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
            {openItems.includes(item.id) ? (
              <FaChevronDown className="text-gray-100 transition-transform duration-300" />
            ) : (
              <FaChevronRight className="text-gray-100 transition-transform duration-300" />
            )}
          </div>
          <div
            className={`px-4 py-2 ${
              openItems.includes(item.id) ? "block" : "hidden"
            }`}
          >
            <p style={style}>{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccordionMy;
