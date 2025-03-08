import express from "express"
import dotenv from 'dotenv';
//importing nodemailer
import nodemailer from 'nodemailer';


dotenv.config();


//env file for it : My_Email=satyamgoswami2705@gmail.com;
// To_Email=satyamg.tt.23@nitj.ac.in;
// Password=aqrcjbhknyvfgfmn;

// Create a transporter object
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use false for STARTTLS; true for SSL on port 465
    auth: {
      user: process.env.My_Email,
      pass: process.env.Password,
    }
  });



const app = new express()
//middle ware for post
app.use(express.json());
app.use(express.urlencoded({ extended:false}));

app.get('/' , (req,res) => {
    res.send('server is ready')
})

app.get('/api/email' , (req,res) => {
    res.send('Yha sai jaayega email yayay')
})

app.post('/api/email' , (req,res) => {
    //data received from front will come inside it 
    //all details using nodemailer will be transferred from here
    const {itemname , quantity , phoneNumber} = req.body;
    if (!itemname || !quantity || !phoneNumber) {
        return res.status(400).json({ error: "All fields are required" });
      }

    // Configure the mailoptions object
    const mailOptions = {
        from: process.env.My_Email,
        to: process.env.To_Email,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log('Error:', error);
          return res.status(500).json({error: "Failed to send message check", details: error.message})
        } else {
          console.log('Email sent: ', info.response);
          return res.status(200).json({message: "Email sent successfully"})
        }
      });
})


const port = 8000 || process.env.PORT

app.listen(port , () => {
    console.log(`server at http://localhost:${port} ${process.env.Password}`)
})