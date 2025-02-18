import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useState} from "react";
import axios from 'axios';

const Contact = () => {
  //Keeping track of the input field values for sending the email.
  const [personName, setPersonName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  //Dynamically changing the input value as the input field changes.
  const handleChange = (event) => {
    const {name, value} = event.target
    //Handling different type of changes per variable.
    if (name === "personName"){
      setPersonName(value);
    } else if (name === "emailAddress"){
      setEmailAddress(value);
    } else if (name === "subject"){
      setSubject(value);
    } else if (name === "message") {
      setMessage(value);
    }
  };

  //Function using a regex for validating the email format.
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(com)$/;
    return emailRegex.test(email);
  }

  //Main logic of the contact page
  const sendEmail = (person_name, email, subj, msg) => {
    const tempDiv = document.getElementById('status');

    //Validate emailData fields before preparing it into a dictioary format.
    if (person_name === '' || person_name.length <= 4){
      const invalidNameMsg = '<p style="color: red; padding: 10px; border-radius: 5px; font-weight: bold;">' +
      'Please enter your full name.' +
      '</p>';
      tempDiv.innerHTML = invalidNameMsg;
      return;
    } else if (!isValidEmail(email)){
      let invalidEmailMsg = '<p style="color: red; padding: 10px; border-radius: 5px; font-weight: bold;">' +
      'Please enter your email in a correct format.' +
      '</p>';
      //If the email service is off.
      if (!(email.includes('gmail') || email.includes('hotmail') || email.includes('yahoo'))){
        invalidEmailMsg = '<p style="color: red; padding: 10px; border-radius: 5px; font-weight: bold;">' +
        'Invalid Email Service (Supported types: Gmail, Hotmail, Yahoo)' +
        '</p>';
      }
      tempDiv.innerHTML = invalidEmailMsg;
      return;
    } else if (subj === ''){
      const invalidSubjectMsg = '<p style="color: red; padding: 10px; border-radius: 5px; font-weight: bold;">' +
      'Please provide a subject.' +
      '</p>';
      tempDiv.innerHTML = invalidSubjectMsg;
      return;
    } else if (msg === ''){
        const invalidMsg = '<p style="color: red; padding: 10px; border-radius: 5px; font-weight: bold;">' +
        'Please provide a message.' +
        '</p>';
        tempDiv.innerHTML = invalidMsg;
        return;
    }

    //Preparing the email data for communicating the api to send the email.
    const emailData = {
      name: person_name, 
      email: email, 
      subject: subj, 
      message: msg
    }

    //Make a post request to the contact endpoint.
    axios.post('https://personal-website-fnwpmg64f-nikhil-munagalas-projects.vercel.app/api/mailer', emailData)
    .then(response => {
      //Clear the fields (variables + input fields)
      setPersonName("");
      setEmailAddress("");
      setSubject("");
      setMessage("");

      document.getElementById('personName').value = '';
      document.getElementById('emailAddress').value = '';
      document.getElementById('subject').value = '';
      document.getElementById('message').value = '';

      //Add a success message.
      const successMsg = '<p style="color: green; padding: 10px; border-radius: 5px; font-weight: bold;">' +
                    'Email sent successfully.' +
                    '</p>';
      tempDiv.innerHTML = successMsg;
    })
    .catch(error => {
      console.log("Error: " + error);
      //Have an email message prepared just in case the email doesn't get sent.
      const unsuccessfulEmailSentMsg = '<p style="color: red; padding: 10px; border-radius: 5px; font-weight: bold;">' +
        'Unexpected email submission error, please try again.' +
        '</p>';
        tempDiv.innerHTML = unsuccessfulEmailSentMsg;
    });
  };

  return (
    <>
      <div className="contact justify-center">
        <h1 className="text-xl text-center text-white mb-6">Contact Me</h1>
        <div id = "contact-form" className="contact-form bg-white p-8 box-border rounded-lg text-center shadow-lg shadow-black/70 max-w-md mx-auto w-[90%] ">
          <div className="textbox mb-4 border border-gray-500 my-4 px-4 py-3 rounded-xl">
            <label className="block text-black text-left text-gray-800 text-base">Full Name</label>
            <input
              list="previous1-options"
              type= "text"
              id = "personName"
              name = "personName"
              value={personName}
              onChange={handleChange}
              className="form-control text-black w-full p-2 rounded-md border border-gray-300 text-base mt-1"
            />
            <datalist id="previous1-options"></datalist>
          </div>

          <div className="textbox mb-4 border border-gray-500 my-4 px-4 py-3 rounded-xl">
            <label className="block text-black text-left text-gray-800 text-base">Email Address</label>
            <input
              list = "previous2-options"
              type = "text"
              id = "emailAddress"
              name = "emailAddress"
              value = {emailAddress}
              onChange={handleChange}
              className="form-control w-full p-2 rounded-md border border-gray-300"
            />
            <datalist id="previous2-options"></datalist>
          </div>

          <div className="textbox mb-4 border border-gray-500 my-4 px-4 py-3 rounded-xl">
            <label className="block text-black text-left text-gray-800 text-base">Subject</label>
            <input
              list="previous3-options"
              type="text"
              id = "subject"
              name = "subject"
              value={subject}
              onChange={handleChange}
              className="form-control w-full p-2 rounded-md border border-gray-300"
            />
            <datalist id="previous3-options"></datalist>
          </div>

          <div className="textbox mb-4 border border-gray-500 my-4 px-4 py-3 rounded-xl">
            <label className="block text-black text-left text-gray-800 text-base">Message</label>
            <textarea id = "message" name = "message"
              value={message} onChange={handleChange} className="form-control w-full p-2 rounded-md border border-gray-300 bg-gray-100"></textarea>
          </div>

          <div className="buttons flex justify-center">
            <button 
            className="btn btn-primary w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            onClick = {() => sendEmail(personName, emailAddress, subject, message)}
            >
              Send Email
            </button>
          </div>
          <div id = "status"></div>
          <p>
            Relevant links below! (LinkedIn and Github respectively)</p>
          <div className="flex justify-center">
            <a
              href="https://github.com/nikhil68596"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={40} className="text-gray-400 hover:text-gray-500 transition-colors" />
            </a>
            <a
              href="https://www.linkedin.com/in/nikhilsai-munagala/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={40} className="text-blue-700 hover:text-blue-800 transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
