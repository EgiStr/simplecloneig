import React from "react";
import { $ } from "jquery";

function Register() {
  $("#textarea1").val("New Text");
  return (
    <div>
      <h1>CloneIG</h1>
      <div className="input-field">
        <input id="icon_prefix" type="text" class="validate" />
        <label for="icon_prefix">First Name</label>
      </div>
      <div className="input-field">
        <input id="icon_prefix" type="text" class="validate" />
        <label for="icon_prefix">First Name</label>
      </div>
    </div>
  );
}

export default Register;
