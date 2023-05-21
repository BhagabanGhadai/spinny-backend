const nodemailer = require('nodemailer');
const {env}=require('../env')

exports.SEND_EMAIL=async (email,otp)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: env.EMAIL,
            pass: env.PASSWORD
        }
    });
    
    const mailOptions = {
        from: env.EMAIL,
        to: email,
        subject: 'OTP for signup at spinny',
        text: `
        Hello Sir/Madam
                
                       The OTP for SingUp with Spinny
                       Use your secret code!
        
                       ${otp}
                       copy the code and paste for complete the signup options
                       If you did not forget your password, you can ignore this email.
        
                `
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    
}

exports.SEND_EMAIL_ON_LOAN=async (email)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: env.EMAIL,
            pass: env.PASSWORD
        }
    });
    
    const mailOptions = {
        from: env.EMAIL,
        to: email,
        subject: 'Recieved Your Loan Application request',
        text: `
        Hello Sir/Madam
                
                      We have Recieved Your Application for Car Loan.
        
                       for more loans or any queries reach us out on
                       1800-00-7892.
        
                `
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    
}

exports.SEND_EMAIL_ON_LOGIN=async (email,otp)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: env.EMAIL,
            pass: env.PASSWORD
        }
    });
    
    const mailOptions = {
        from: env.EMAIL,
        to: email,
        subject: 'Recieved Your Loan Application request',
        text: `
        Hello Sir/Madam
                
                      the otp for login into spinny is.

                      ${otp}
        
                       for more loans or any queries reach us out on
                       1800-00-7892.
        
                `
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    
}