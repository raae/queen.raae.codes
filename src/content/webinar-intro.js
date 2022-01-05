import React from "react";

const WebinarIntro = (props) => {
  const { title, url } = props;
  return (
    <>
      <small>
        <mark>{"Webinar"}</mark> by Queen Raae
      </small>

      <h1>{title}</h1>

      <iframe
        width="100%"
        height="800"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        allowtransparency="true"
        src={`${url}?navlinks=false&embed=true`}
        style={{ border: "1px solid #EEE", borderRadius: "3px" }}
        allowfullscreen="true"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        allow="microphone; camera;"
      ></iframe>
    </>
  );
};

export default WebinarIntro;
