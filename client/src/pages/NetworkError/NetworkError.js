import React from 'react'
import { Outlet } from 'react-router-dom';

export default function NetworkError() {
  return (
      <div>
      <div style={{ color: "grey", textAlign: "center", marginTop: "4rem" }}>
        <h1>Network Error!! Server is Down.</h1>
      </div>
    </div>
  );
}
