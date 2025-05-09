import React from "react";
import "./ContactUs.css";
import theme_pattern from "../../assets/theme_pattern.svg";
import mail_icon from "../../assets/mail_icon.svg";
import location_icon from "../../assets/location_icon.svg";
import call_icon from "../../assets/theme_pattern.svg";

const Contact = () => {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "52b3f1ed-f8ca-4bab-a43e-a91eb5ecc593");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      alert(res.message);
      console.log("Success", res);
    }
  };
  return (
    <div className="contact-us">
      <div id="contact" className="contact">
        <div className="contact-title">
          <h1>Get in touch</h1>
          <img src={theme_pattern} alt="" />
        </div>

        <div className="contact-section">
          <div className="contact-left">
            <h1>Lets talk</h1>
            <p> You can contact me via the form below or through email.</p>
            <div className="contact-details">
              <div className="contact-detail">
                <img src={mail_icon} alt="" />{" "}
                <p>saikirangoudrangu8@gmail.com</p>
              </div>
              <div className="contact-detail">
                <img src={call_icon} alt="" /> <p>7569092145</p>
              </div>

              <a href="https://www.google.com/maps" target="_blank">
                <div className="contact-detail">
                  <img src={location_icon} alt="" />{" "}
                  <p>Hyderabad, Telangana, India</p>
                </div>
              </a>
            </div>
          </div>

          <form onSubmit={onSubmit} className="contact-right">
            <label htmlFor="">Your Name</label>
            <input type="text" placeholder="Enter your name" name="name" />

            <label htmlFor="">Your Email</label>
            <input type="email" placeholder="Enter your email" name="email" />

            <label htmlFor="">Write your message here</label>
            <textarea
              name="message"
              rows="8"
              placeholder="Enter your message"
            ></textarea>
            <button type="submit" className="contact-submit">
              Submit now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
