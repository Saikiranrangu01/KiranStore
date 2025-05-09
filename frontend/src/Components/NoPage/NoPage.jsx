import React from "react";

const NoPage = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      height: "100vh",
      flexDirection: "column",
      textAlign: "center"
    }}>
      <h1>404</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <a href="/" style={{color:"red",fontSize:"35px"}}>Go back to Home</a>
    </div>
  );
};

export default NoPage;
