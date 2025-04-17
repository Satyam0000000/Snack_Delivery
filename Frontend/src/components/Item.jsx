import React, {useState} from "react";
import {motion} from "motion/react";

const Item = ({ image, name, stockPresent = true, onOrder , quantity, mobileNumber, setQuantity, setMobileNumber }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  

  const handleBuyClick = () => {
    setIsExpanded(true);
  };

  const handleOrderNow = () => {
    if (quantity > 0 && mobileNumber) {
      onOrder({ name, quantity, mobileNumber });
      setIsExpanded(false);
      setQuantity(1);
      setMobileNumber("");
    } else {
      alert("Please enter valid details.");
    }
  };

  const handleBackClick = () => {
    setIsExpanded(false);
    setQuantity(1);
    setMobileNumber("");
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative group w-full max-w-sm rounded-lg overflow-hidden shadow-lg ${
        isExpanded ? "h-auto p-4 border-2 border-red-500" : "h-64"
      }`}
    >
      <div className="relative">
        <motion.img
          src={image}
          alt={name}
          className="w-full object-cover"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        {!stockPresent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center text-white text-xl font-bold"
          >
            Out of Stock
          </motion.div>
        )}
      </div>

      {!isExpanded && stockPresent && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <motion.button
        onClick={handleBuyClick}
        whileHover={{ scale: 1.1 }}
        className="px-4 py-2 bg-white text-black rounded-md font-semibold shadow hover:bg-red-500 hover:text-white pointer-events-auto"
      >
        Buy
      </motion.button>
    </motion.div>
  )}

      {isExpanded && stockPresent && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-4 space-y-4 text-white bg-black p-4 rounded-lg"
        >
          <h3 className="text-lg font-semibold">{name}</h3>
          <div className="flex items-center space-x-4">
            <button
              className="px-2 py-1 bg-white text-black rounded-md hover:bg-red-500 hover:text-white"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              -
            </button>
            <span className="font-semibold">{quantity}</span>
            <button
              className="px-2 py-1 bg-white text-black rounded-md hover:bg-red-500 hover:text-white"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </button>
          </div>
          <input
            type="text"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Enter Mobile Number"
            className="w-full px-3 py-2 border border-white bg-black text-white rounded-md"
          />
          <motion.button
            onClick={handleOrderNow}
            whileHover={{ scale: 1.05 }}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-md font-semibold shadow hover:bg-red-600"
          >
            Order Now
          </motion.button>
          <motion.button
            onClick={handleBackClick}
            whileHover={{ scale: 1.05 }}
            className="w-full px-4 py-2 bg-gray-500 text-white rounded-md font-semibold shadow hover:bg-gray-600"
          >
            Back
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Item;
