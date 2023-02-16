import React from "react";

import "./ErrorPermisos.css";

export default function ErrorPermisos() {
  return (
    <div className="error-permisos">
      <h2>No posee los permisos para acceder a esta página</h2>
      <a href="/">Volver al inicio</a>
    </div>
  );
}
