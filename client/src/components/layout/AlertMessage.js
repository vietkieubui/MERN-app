import React from "react";
import Alert from "react-bootstrap/Alert";
export default function AlertMessage({ info }) {
  return info === null ? null : (
    <Alert variant={info.type}>{info.message}</Alert>
  );
}
