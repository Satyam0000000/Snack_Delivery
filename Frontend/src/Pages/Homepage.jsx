import React ,{useState} from 'react'
import {motion} from 'motion/react'
import { useNavigation } from 'react-router-dom' //for new login button
import Footer from '../components/Footer' //will add footer later
import Header from '../components/Header'
import Item from '../components/Item'

function Homepage() {

  //using state lifting for quantity and mobilenumber
  const [quantity, setQuantity] = useState(1);
  const [mobileNumber, setMobileNumber] = useState("");
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

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        alert("Order placed and email sent successfully!");
      } else {
        alert("Failed to send email: ");
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
    </div>
  )
}

export default Homepage