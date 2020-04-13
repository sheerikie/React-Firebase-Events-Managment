import React, { Component } from "react";
import firebase from "./Firebase";
import { Link } from "react-router-dom";
import Header from "./assets/layouts/Header";
import Footer from "./assets/layouts/Footer";
import File from "./components/File";
import LocationSearchInput from "./components/LocationSearchInput";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      seatcount: "",
      location: ""
    };
  }

  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection("events")
      .doc(this.props.match.params.id);
    ref.get().then(doc => {
      if (doc.exists) {
        const event = doc.data();
        this.setState({
          key: doc.id,
          title: event.title,
          description: event.description,
          seatcount: event.seatcount,
          location: event.location
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ event: state });
  };

  onSubmit = e => {
    e.preventDefault();

    const { title, description, seatcount, location } = this.state;

    const updateRef = firebase
      .firestore()
      .collection("events")
      .doc(this.state.key);
    updateRef
      .set({
        title,
        description,
        seatcount,
        location
      })
      .then(docRef => {
        this.setState({
          key: "",
          title: "",
          description: "",
          location: "",
          seatcount: ""
        });
        this.props.history.push("/edit/" + this.props.match.params.id);
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    return (
      <div className="Edit">
        <Header />
        <main className="site-main">
          <Link to={`/event/${this.state.key}`} class="btn btn-primary">
            event List
          </Link>
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
                          value={this.state.title}
                          onChange={this.onChange}
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
                        <File onChange={this.onChange}></File>
                      </div>
                    </div>
                    <div className="row" style={{ justifyContent: "center" }}>
                      <div className="col-75">
                        <div className="col-19">
                          <label for="location">Add Location</label>
                        </div>
                        <LocationSearchInput
                          onChange={this.onChange}
                          value={this.state.location}
                          name="location"
                        ></LocationSearchInput>
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
                          value={this.state.seatcount}
                          onChange={this.onChange}
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
                          value={this.state.description}
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

export default Edit;
