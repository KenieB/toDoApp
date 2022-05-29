import React from "react";
import { Alert } from "react-bootstrap";
/**
 * Defines the alert message to render if the specified error is truthy.
 * @param error
 *  an instance of an object with `.message` property as a string, typically an Error instance.
 * @returns {JSX.Element}
 *  a bootstrap danger alert that contains the message string.
 */

function ErrorAlert({ error }) {
  return (
    error && (
      <Alert key="danger" variant="danger" className="text-center">
        Error: {error.message}
      </Alert>
    )
  );
}

export default ErrorAlert;
