import React from "react";
import PreLoader from "../common/PreLoader";

export default function NotFound() {
  return (
    <div style={{ marginTop: "25vh" }}>
      <PreLoader />
      <br />
      <br />
      <span style={{ display: "flex", justifyContent: "center" }}>
        Page not found for <code>{window.location.pathname}</code>
      </span>
    </div>
  );
}
