import React, { Component } from "react";
import Header from "./assets/layouts/Header";
import Footer from "./assets/layouts/Footer";
import File from "./components/File";
import LocationSearchInput from "./components/LocationSearchInput";
import { Link } from "react-router-dom";
import firebase from "./Firebase";
import Dropzone from "react-dropzone";
import axios from "axios";
import "react-google-places-autocomplete/dist/assets/index.css";
import "./assets/css/addEvent.css";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";

class AddEvent extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("events");
    this.state = { preview: null };
    this.state = {
      title: "",
      description: "",
      seatcount: "",
      location: "",
      preview: ""
    };
  }
  handleChange = location => {
    this.setState({ location });
  };

  handleSelect = location => {
    geocodeByAddress(location)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log("Success", latLng))
      .catch(error => console.error("Error", error));
  };
  notify = () => toast("Wow so easy !");
  handleDrop = files => {
    // Push all the axios request promise into a single array
    const uploaders = files.map(file => {
      // Initial FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `Adrian`);
      formData.append("upload_preset", "ictlife"); // Replace the preset name with your own
      formData.append("api_key", "945544582481993"); // Replace API key with your own Cloudinary key
      formData.append("timestamp", (Date.now() / 1000) | 0);

      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      return axios
        .post("https://api.cloudinary.com/v1_1/appex/image/upload", formData, {
          headers: { "X-Requested-With": "XMLHttpRequest" }
        })
        .then(response => {
          const data = response.data;
          const fileURL = data.secure_url; // You should store this URL for future references in your app
          const preview = fileURL;
          this.setState({ preview });
          console.log(data);
        });
    });

    // Once all the files are uploaded
    axios.all(uploaders).then(() => {
      // ... perform after upload is successful operation
    });
  };
  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };
  onSubmit = e => {
    e.preventDefault();

    const { title, description, seatcount, location, preview } = this.state;

    this.ref
      .add({
        title,
        description,
        seatcount,
        location,
        preview
      })
      .then(docRef => {
        this.setState({
          title: "",
          description: "",
          seatcount: "",
          location: "",
          preview: ""
        });
        this.props.history.push("/");
        swal({
          title: "Done!",
          text: "You have successfully added an Event",
          icon: "success",
          timer: 3000,
          button: false
        });
        this.setState({ redirect: this.state.redirect === false });
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    const { title, description, seatcount, location, preview } = this.state;
    const searchOptions = {
      componentRestrictions: { country: ["ke"] },
      types: ["(cities)"]
    };
    const dropzoneStyle = {
      width: "20%",
      height: "150px",
      border: "1px solid black"
    };
    const dropzoneStyleActive = {
      width: "20%",
      height: "150px",
      border: "5px solid green"
    };

    return (
      <div className="AddEvent">
        <Header />
        <main className="site-main">
          <ToastContainer />
          <section>
            <div className="container">
              <div
                className="card"
                style={{
                  maxWidth: "90%",
                  marginRight: "5%",
                  marginLeft: "5%",
                  marginBottom: "5%",
                  marginTop: "5%",
                  background: "lightgray"
                }}
              >
                <div className="card-body">
                  <form onSubmit={this.onSubmit}>
                    <div className="row" style={{ justifyContent: "center" }}>
                      <div className="col-75">
                        <div className="col-17">
                          <label for="ename">Event Title</label>
                        </div>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          placeholder="Your Event name.."
                          value={title}
                          onChange={this.onChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="row" style={{ justifyContent: "center" }}>
                      <div
                        className="col-75"
                        style={{ justifyContent: "center" }}
                      >
                        <div className="col-17">
                          <label for="eventpics">Event Pictures</label>
                        </div>
                        <div
                          style={{
                            background: "#2aa1be",
                            height: "60%",
                            width: "100%",
                            justifyContent: "center",
                            color: "white"
                          }}
                        >
                          <Dropzone
                            onDrop={this.handleDrop}
                            accept="image/*"
                            multiple={true}
                            style={dropzoneStyle}
                            onChange={this.onChange}
                            activeStyle={dropzoneStyleActive}
                          >
                            {({ getRootProps, getInputProps }) => (
                              <section className="container">
                                <div {...getRootProps()}>
                                  <input {...getInputProps()} required />
                                  <p style={{ textAlign: "center" }}>
                                    Drag 'n' drop some files here, or click to
                                    select files
                                    <br />
                                    <br />
                                    <i class="fas fa-upload fa-3x"></i>
                                  </p>
                                </div>

                                {preview && (
                                  <img
                                    key={preview}
                                    src={preview}
                                    alt="preview"
                                    style={{ width: "30%" }}
                                  />
                                )}
                              </section>
                            )}
                          </Dropzone>
                        </div>
                      </div>
                    </div>
                    <div className="row" style={{ justifyContent: "center" }}>
                      <div className="col-75">
                        <div className="col-19">
                          <label for="location">Add Location</label>
                        </div>
                        <PlacesAutocomplete
                          value={this.state.location}
                          onChange={this.handleChange}
                          onSelect={this.handleSelect}
                          searchOptions={searchOptions}
                        >
                          {({
                            getInputProps,
                            suggestions,
                            getSuggestionItemProps,
                            loading
                          }) => (
                            <div>
                              <input
                                {...getInputProps({
                                  placeholder: "Search Places ...",
                                  className: "location-search-input",
                                  name: "location"
                                })}
                                onChange={this.onChange}
                                required
                              />
                              <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                  const className = suggestion.active
                                    ? "suggestion-item--active"
                                    : "suggestion-item";
                                  // inline style for demonstration purpose
                                  const style = suggestion.active
                                    ? {
                                        backgroundColor: "#fafafa",
                                        cursor: "pointer"
                                      }
                                    : {
                                        backgroundColor: "#ffffff",
                                        cursor: "pointer"
                                      };
                                  return (
                                    <div
                                      {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style
                                      })}
                                    >
                                      <span>{suggestion.description}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </PlacesAutocomplete>
                      </div>
                    </div>
                    <div className="row" style={{ justifyContent: "center" }}>
                      <div className="col-75">
                        <div className="col-17">
                          <label for="seatcount">No of Seats Available</label>
                        </div>
                        <input
                          type="text"
                          id="seatcount"
                          name="seatcount"
                          placeholder="No Of Seats.."
                          value={seatcount}
                          onChange={this.onChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="row" style={{ justifyContent: "center" }}>
                      <div className="col-75">
                        <div className="col-19">
                          <label for="description">Description</label>
                        </div>
                        <textarea
                          id="description"
                          name="description"
                          className="form-control"
                          placeholder="Write something.."
                          style={{ height: "200px" }}
                          onChange={this.onChange}
                          value={description}
                        ></textarea>
                      </div>
                    </div>

                    <br></br>
                    <div
                      style={{ justifyContent: "right", paddingRight: "11%" }}
                    >
                      <input
                        type="submit"
                        value="Create Event"
                        style={{ float: "right" }}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }
}

export default AddEvent;
