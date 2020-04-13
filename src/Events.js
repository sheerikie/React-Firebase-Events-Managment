import React, { Component } from "react";
import Header from "./assets/layouts/Header";
import Footer from "./assets/layouts/Footer";
import { Link } from "react-router-dom";
import "./App.css";
import firebase from "./Firebase";
import SideBar from "./assets/layouts/SideBar";

class Events extends Component {
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
      <div className="AddEvent">
        <Header />

        <section class="mb-30px">
          <div class="container">
            <div class="hero-banner hero-banner--sm">
              <div class="hero-banner__content">
                <h1>Events Page</h1>
                <nav aria-label="breadcrumb" class="banner-breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      Event Page
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        <section class="blog-post-area section-margin">
          <div class="container">
            <div class="row">
              <div class="col-lg-8">
                <div class="row">
                  {this.state.events.map(event => (
                    <div class="col-md-6">
                      <div class="single-recent-blog-post card-view">
                        <div class="thumb">
                          {" "}
                          <img
                            class="card-img rounded-0"
                            src={event.preview}
                            alt=""
                            style={{ width: "100%" }}
                          />
                          <ul class="thumb-info">
                            <li>
                              <a href="#">
                                <i class="ti-user"></i>Admin
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i class="ti-themify-favicon"></i>2 Comments
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div class="details mt-20">
                          <Link to={`/event/${event.key}`}>
                            <h3>{event.title}</h3>
                          </Link>
                          <p>{event.description}</p>
                          <a class="button" href="#">
                            Read More <i class="ti-arrow-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div class="row">
                  <div class="col-lg-12">
                    <nav class="blog-pagination justify-content-center d-flex">
                      <ul class="pagination">
                        <li class="page-item">
                          <a href="#" class="page-link" aria-label="Previous">
                            <span aria-hidden="true">
                              <i class="ti-angle-left"></i>
                            </span>
                          </a>
                        </li>
                        <li class="page-item active">
                          <a href="#" class="page-link">
                            1
                          </a>
                        </li>
                        <li class="page-item">
                          <a href="#" class="page-link">
                            2
                          </a>
                        </li>
                        <li class="page-item">
                          <a href="#" class="page-link" aria-label="Next">
                            <span aria-hidden="true">
                              <i class="ti-angle-right"></i>
                            </span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 sidebar-widgets">
                <div class="widget-wrap">
                  <SideBar></SideBar>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }
}

export default Events;
