import React ,{useState} from 'react'
import {motion, AnimatePresence} from 'motion/react'
import { useNavigation } from 'react-router-dom' //for new login button
import Footer from '../components/Footer' //will add footer later
import Header from '../components/Header'
import Item from '../components/Item'

function Homepage() {

  //using state lifting for quantity and mobilenumber
  const [quantity, setQuantity] = useState(1);
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const snacks = [
    { id: 1, name: "Chips", image: "https://t4.ftcdn.net/jpg/05/88/75/69/240_F_588756932_5ZQBUg6KLT3kFAkR4EkRNuAaPCnDVQAS.jpg" },
    { id: 2, name: "Maggie", image: "https://t4.ftcdn.net/jpg/07/67/86/55/240_F_767865595_uL1KNe8ojMVewEc8oxzMXfW9TGz5oHJB.jpg" },
    { id: 3, name: "Biscuit", image: "https://t3.ftcdn.net/jpg/00/86/53/04/240_F_86530443_WY1f5KrFwrbfKjY2hmEYzg2hMYQ6wnkJ.jpg" },
    { id: 4, name: "Chocolate", image: "https://t3.ftcdn.net/jpg/01/75/69/78/240_F_175697869_GgIoN67paxOFzGEUSTVmsEqNIUpQkkyr.jpg" },
  ];

  const handleOrder = async ({ name, quantity, mobileNumber }) => {

    //maintain cors also

    const payload = {
      itemname: name,
      quantity,
      phoneNumber: mobileNumber,
    };

    setLoading(true)
    setSuccess(false)

    try {
      const response = await fetch('https://api.snackproject.site/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setLoading(false);
        setSuccess(true)
      } else {
        setLoading(false);
        alert("Sorry we are not taking order")
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order :connect ETIMEDOUT 40.100.141.166:587");
    }
  };

  return (
    <div className='min-h-screen bg-black text-white'>
      {console.log("inside homepage",quantity)}
      <Header/>

      <motion.h1
      className='text-red-500 text-4xl text-center font-extrabold'
      whileHover={{scale:0.9}}
      >Snacks</motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {snacks.map((snack) => (
            <Item
              key={snack.id}
              image={snack.image}
              name={snack.name}
              stockPresent={true}
              onOrder={handleOrder} //passing handle order function to item..i.e child
              quantity={quantity}
              setQuantity={setQuantity}
              mobileNumber={mobileNumber}
              setMobileNumber={setMobileNumber} 
            />
          ))}
      </div>
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-16 h-16 border-4 border-yellow-400 border-dashed rounded-full animate-spin mb-4"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, ease: 'linear', duration: 1 }}
            />
            <p className="text-yellow-300 text-xl font-semibold">Sending order...</p>
          </motion.div>
        )}

        {success && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mb-4"
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </motion.svg>
            </motion.div>
            <p className="text-green-300 text-xl font-semibold mb-2">Order sent!</p>
            <p className="text-gray-300 mb-4 text-sm">Please wait, your order is arriving...</p>
            <button
              onClick={() => setSuccess(false)}
              className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
            >
              OK
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Homepage