import React, { Component } from "react";
import "./assets/css/main.css";
import "./assets/css/style.css";
import Footer from "./assets/layouts/Footer";
import Header from "./assets/layouts/Header";
import SideBar from "./assets/layouts/SideBar";
import firebase from "./Firebase";

class Home extends Component {
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
      <div className="Home">
        <Header />
        <main className="site-main">
          <section className="mb-30px">
            <div className="container">
              <div className="hero-banner">
                <div className="hero-banner__content">
                  <h3>Event Tours & Travels</h3>
                  <h1>Amazing Places on earth</h1>
                  <h4>December 12, 2020</h4>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="container">
              <div className="owl-carousel owl-theme blog-slider">
                <div className="card blog__slide text-center">
                  <div className="blog__slide__img">
                    <img
                      className="card-img rounded-0"
                      src="img/blog/blog-slider/blog-slide1.jpg"
                      alt=""
                    />
                  </div>
                </div>

                <div className="card blog__slide text-center">
                  <div className="blog__slide__img">
                    <img
                      className="card-img rounded-0"
                      src="img/blog/blog-slider/blog-slide2.jpg"
                      alt=""
                    />
                  </div>
                </div>

                <div className="card blog__slide text-center">
                  <div className="blog__slide__img">
                    <img
                      className="card-img rounded-0"
                      src="img/blog/blog-slider/blog-slide3.jpg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="card blog__slide text-center">
                  <div className="blog__slide__img">
                    <img
                      className="card-img rounded-0"
                      src="img/blog/blog-slider/blog-slide4.jpg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="blog-post-area section-margin mt-4">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  {this.state.events.map(event => (
                    <div className="single-recent-blog-post">
                      <div className="thumb">
                        <img
                          className="img-fluid"
                          src={event.preview}
                          alt=""
                          style={{ width: "400px" }}
                        />
                        <ul className="thumb-info">
                          <li>
                            <a href="#">
                              <i className="ti-user"></i>Admin
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="ti-notepad"></i>January 12,2019
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="ti-themify-favicon"></i>2 Comments
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="details mt-20">
                        <a href="blog-single.html">
                          <h3>{event.title}</h3>
                        </a>
                        <p className="tag-list-inline">
                          Tag: <a href="#">travel</a>,{" "}
                          <a href="#">life style</a>, <a href="#">technology</a>
                          , <a href="#">fashion</a>
                        </p>
                        <p>{event.description}</p>
                        <a className="button" href="#">
                          Read More <i className="ti-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  ))}
                  <div className="row">
                    <div className="col-lg-12">
                      <nav className="blog-pagination justify-content-center d-flex">
                        <ul className="pagination">
                          <li className="page-item">
                            <a
                              href="#"
                              className="page-link"
                              aria-label="Previous"
                            >
                              <span aria-hidden="true">
                                <i className="ti-angle-left"></i>
                              </span>
                            </a>
                          </li>
                          <li className="page-item active">
                            <a href="#" className="page-link">
                              1
                            </a>
                          </li>
                          <li className="page-item">
                            <a href="#" className="page-link">
                              2
                            </a>
                          </li>
                          <li className="page-item">
                            <a href="#" className="page-link" aria-label="Next">
                              <span aria-hidden="true">
                                <i className="ti-angle-right"></i>
                              </span>
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 sidebar-widgets">
                  <div className="widget-wrap">
                    <SideBar />
                  </div>
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

export default Home;
