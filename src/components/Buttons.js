import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faImage } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

export default props => (
  <div className="buttons fadein">
    <div className="button">
      <label htmlFor="multi" style={{ width: "150px" }}>
        <FontAwesomeIcon icon={faImages} color="#6d84b4" size="2x" />
        <p style={{ float: "right", marginLeft: "1%" }}>Select Images</p>
      </label>

      <input
        type="file"
        id="multi"
        className="form-control btn btn-info"
        onChange={props.onChange}
        multiple
      />
    </div>
  </div>
);
