import express from "express"
import dotenv from 'dotenv';
//importing nodemailer
import nodemailer from 'nodemailer';

// install dependencies using npm i googleapis
import {google} from 'googleapis'

//making its variable...like we always do 
const OAuth2 = google.auth.OAuth2;

dotenv.config();



//creating express variable....like we always do
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

    //creates the OAuth client and provides it with the refresh token
const createTransporter = async () => {
    try{
        const oauth2Client = new OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            "https://developers.google.com/oauthplayground"
          );
        
          oauth2Client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN
          });

          //get the access token by calling the getAccessToken method.
    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
          if (err) {
            reject("Failed to create access token :(");
          }
          resolve(token);
            });
        }).catch((err) => console.log('Acess token error : ',err));
    
        //creating the transporter object
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
                 type: "OAuth2",
                 user: process.env.My_Email,
                 accessToken: accessToken.token,
                 clientId: process.env.CLIENT_ID,
                 qclientSecret: process.env.CLIENT_SECRET,
                 refreshToken: process.env.REFRESH_TOKEN
              }
        });
    
            return transporter;

    }catch(error){
        console.error('Error is : ' , error)
    }  

  };

    const {itemname , quantity , phoneNumber} = req.body;
    if (!itemname || !quantity || !phoneNumber) {
        return res.status(400).json({ error: "All fields are required" });
      }
    
    const sendEmail = async (emailOptions) => {
        let emailTransporter = await createTransporter();
        await emailTransporter.sendMail(emailOptions);
      };
      
      sendEmail({
        subject: "Order",
        text: "I am sending an email from nodemailer!",
        to: process.env.To_Email,
        from: process.env.My_Email
      });

})


const port = 8000 || process.env.PORT

app.listen(port , () => {
    console.log(`server at http://localhost:${port} ${process.env.Password}`)
})