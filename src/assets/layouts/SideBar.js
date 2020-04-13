import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../../Firebase";
class SideBar extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("events");
    this.unsubscribe = null;
    this.state = {
      events: []
    };
  }

  onCollectionUpdate = querySnapshot => {
    const events = [];
    querySnapshot.forEach(doc => {
      const { title, location, description, seatcount, preview } = doc.data();
      events.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description,
        seatcount,
        location,
        preview
      });
    });
    this.setState({
      events
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div className="SideBar">
        <div class="single-sidebar-widget newsletter-widget">
          <h4 class="single-sidebar-widget__title">Newsletter</h4>
          <div class="form-group mt-30">
            <div class="col-autos">
              <input
                type="text"
                class="form-control"
                id="inlineFormInputGroup"
                placeholder="Enter email"
                onfocus="this.placeholder = ''"
                onblur="this.placeholder = 'Enter email'"
              />
            </div>
          </div>
          <button class="bbtns d-block mt-20 w-100">Subcribe</button>
        </div>
        <div class="single-sidebar-widget popular-post-widget">
          <h4 class="single-sidebar-widget__title">Popular Post</h4>
          <div class="popular-post-list">
            {this.state.events.map(event => (
              <div class="single-post-list">
                <div class="thumb">
                  <img
                    class="card-img rounded-0"
                    style={{ width: "30%" }}
                    src={event.preview}
                    alt=""
                  />
                  <ul class="thumb-info">
                    <li>
                      <a href="#">Adam Colinge</a>
                    </li>
                    <li>
                      <a href="#">Dec 15</a>
                    </li>
                  </ul>
                </div>
                <div class="details mt-20">
                  <a href="blog-single.html">
                    <h6>{event.title}</h6>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default SideBar;
