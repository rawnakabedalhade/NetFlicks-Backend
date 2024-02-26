import nodemailer from "nodemailer";

const tramsporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rawnakabedalhade@gmail.com",
    pass: "yfjyjvlaxnpqmsax",
  },
});

const mailOptions = {
  from: "rawnakabedalhade@gmail.com",
  to: "yasser3452@gmail.com",
  subject: "nodemailer test",
  text: "test from rawnak ",
};

tramsporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent:" + info.response);
  }
});

export default tramsporter;
