import React, { Component } from "react";
import firebase from "./Firebase";
import { Link } from "react-router-dom";
import Footer from "./assets/layouts/Footer";
import Header from "./assets/layouts/Header";
import sidebar from "./assets/layouts/SideBar";
import SideBar from "./assets/layouts/SideBar";

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {},
      key: ""
    };
  }

  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection("events")
      .doc(this.props.match.params.id);
    ref.get().then(doc => {
      if (doc.exists) {
        this.setState({
          event: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id) {
    firebase
      .firestore()
      .collection("events")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        this.props.history.push("/");
      })
      .catch(error => {
        console.error("Error removing document: ", error);
      });
  }

  render() {
    return (
      <div class="event">
        <Header />

        <section class="mb-30px">
          <div class="container">
            <div class="hero-banner hero-banner--sm">
              <div class="hero-banner__content">
                <h1>Event details</h1>
                <nav aria-label="breadcrumb" class="banner-breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      {this.state.event.title}
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
                <div class="main_blog_details">
                  <a href="#">
                    <h4>{this.state.event.title}</h4>
                  </a>
                  <br></br>
                  <img
                    class="img-fluid"
                    src={this.state.event.preview}
                    alt=""
                    style={{ width: "20%", height: "20%" }}
                  />
                  <div class="user_details">
                    <div class="float-left">
                      <a href="#">Lifestyle</a>
                      <a href="#">Gadget</a>
                    </div>
                    <div class="float-right mt-sm-0 mt-3">
                      <div class="media">
                        <div class="media-body">
                          <h5>Mark wiens</h5>
                          <p>{this.state.event.location}</p>
                        </div>

                        <div class="d-flex"></div>
                      </div>
                    </div>
                  </div>
                  <p>{this.state.event.description}</p>
                  <div class="elfsight-app-4799e990-21f4-4068-b94c-efceaf82c5ff"></div>
                  <div class="news_d_footer flex-column flex-sm-row">
                    <a href="#">
                      <span class="align-middle mr-2">
                        <i class="ti-heart"></i>
                      </span>
                      Lily and 4 people like this
                    </a>
                    <a
                      class="justify-content-sm-center ml-sm-auto mt-sm-0 mt-2"
                      href="#"
                    >
                      <span class="align-middle mr-2">
                        <i class="ti-themify-favicon"></i>
                      </span>
                      06 Comments
                    </a>
                    <div class="news_socail ml-sm-auto mt-sm-0 mt-2">
                      <a href="#">
                        <i class="fab fa-facebook-f"></i>
                      </a>
                      <a href="#">
                        <i class="fab fa-twitter"></i>
                      </a>
                      <a href="#">
                        <i class="fab fa-dribbble"></i>
                      </a>
                      <a href="#">
                        <i class="fab fa-behance"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div class="navigation-area">
                  <div class="row">
                    <div class="col-lg-6 col-md-6 col-12 nav-left flex-row d-flex justify-content-start align-items-center">
                      <div class="thumb">
                        <a href="#">
                          <img
                            class="img-fluid"
                            src="img/blog/prev.jpg"
                            alt=""
                          />
                        </a>
                      </div>
                      <div class="arrow">
                        <a href="#">
                          <span class="lnr text-white lnr-arrow-left"></span>
                        </a>
                      </div>
                      <div class="detials">
                        <p>Prev Post</p>
                        <a href="#">
                          <h4>A Discount Toner</h4>
                        </a>
                      </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-12 nav-right flex-row d-flex justify-content-end align-items-center">
                      <div class="detials">
                        <p>Next Post</p>
                        <a href="#">
                          <h4>Cartridge Is Better</h4>
                        </a>
                      </div>
                      <div class="arrow">
                        <a href="#">
                          <span class="lnr text-white lnr-arrow-right"></span>
                        </a>
                      </div>
                      <div class="thumb">
                        <a href="#">
                          <img
                            class="img-fluid"
                            src="img/blog/next.jpg"
                            alt=""
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="comments-area">
                  <h4>05 Comments</h4>
                  <div class="comment-list">
                    <div class="single-comment justify-content-between d-flex">
                      <div class="user justify-content-between d-flex">
                        <div class="thumb">
                          <img src="img/blog/c1.jpg" alt="" />
                        </div>
                        <div class="desc">
                          <h5>
                            <a href="#">Emilly Blunt</a>
                          </h5>
                          <p class="date">December 4, 2017 at 3:12 pm </p>
                          <p class="comment">
                            Never say goodbye till the end comes!
                          </p>
                        </div>
                      </div>
                      <div class="reply-btn">
                        <a href="" class="btn-reply text-uppercase">
                          reply
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="comment-list left-padding">
                    <div class="single-comment justify-content-between d-flex">
                      <div class="user justify-content-between d-flex">
                        <div class="thumb">
                          <img src="img/blog/c2.jpg" alt="" />
                        </div>
                        <div class="desc">
                          <h5>
                            <a href="#">Elsie Cunningham</a>
                          </h5>
                          <p class="date">December 4, 2017 at 3:12 pm </p>
                          <p class="comment">
                            Never say goodbye till the end comes!
                          </p>
                        </div>
                      </div>
                      <div class="reply-btn">
                        <a href="" class="btn-reply text-uppercase">
                          reply
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="comment-list left-padding">
                    <div class="single-comment justify-content-between d-flex">
                      <div class="user justify-content-between d-flex">
                        <div class="thumb">
                          <img src="img/blog/c3.jpg" alt="" />
                        </div>
                        <div class="desc">
                          <h5>
                            <a href="#">Annie Stephens</a>
                          </h5>
                          <p class="date">December 4, 2017 at 3:12 pm </p>
                          <p class="comment">
                            Never say goodbye till the end comes!
                          </p>
                        </div>
                      </div>
                      <div class="reply-btn">
                        <a href="" class="btn-reply text-uppercase">
                          reply
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="comment-list">
                    <div class="single-comment justify-content-between d-flex">
                      <div class="user justify-content-between d-flex">
                        <div class="thumb">
                          <img src="img/blog/c4.jpg" alt="" />
                        </div>
                        <div class="desc">
                          <h5>
                            <a href="#">Maria Luna</a>
                          </h5>
                          <p class="date">December 4, 2017 at 3:12 pm </p>
                          <p class="comment">
                            Never say goodbye till the end comes!
                          </p>
                        </div>
                      </div>
                      <div class="reply-btn">
                        <a href="" class="btn-reply text-uppercase">
                          reply
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="comment-list">
                    <div class="single-comment justify-content-between d-flex">
                      <div class="user justify-content-between d-flex">
                        <div class="thumb">
                          <img src="img/blog/c5.jpg" alt="" />
                        </div>
                        <div class="desc">
                          <h5>
                            <a href="#">Ina Hayes</a>
                          </h5>
                          <p class="date">December 4, 2017 at 3:12 pm </p>
                          <p class="comment">
                            Never say goodbye till the end comes!
                          </p>
                        </div>
                      </div>
                      <div class="reply-btn">
                        <a href="" class="btn-reply text-uppercase">
                          reply
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="comment-form">
                  <h4>Leave a Reply</h4>
                  <form>
                    <div class="form-group form-inline">
                      <div class="form-group col-lg-6 col-md-6 name">
                        <input
                          type="text"
                          class="form-control"
                          id="name"
                          placeholder="Enter Name"
                          onfocus="this.placeholder = ''"
                          onblur="this.placeholder = 'Enter Name'"
                        />
                      </div>
                      <div class="form-group col-lg-6 col-md-6 email">
                        <input
                          type="email"
                          class="form-control"
                          id="email"
                          placeholder="Enter email address"
                          onfocus="this.placeholder = ''"
                          onblur="this.placeholder = 'Enter email address'"
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        id="subject"
                        placeholder="Subject"
                        onfocus="this.placeholder = ''"
                        onblur="this.placeholder = 'Subject'"
                      />
                    </div>
                    <div class="form-group">
                      <textarea
                        class="form-control mb-10"
                        rows="5"
                        name="message"
                        placeholder="Messege"
                        onfocus="this.placeholder = ''"
                        onblur="this.placeholder = 'Messege'"
                        required=""
                      ></textarea>
                    </div>
                    <a href="#" class="button submit_btn">
                      Post Comment
                    </a>
                  </form>
                </div>
              </div>

              <div class="col-lg-4 sidebar-widgets">
                <div class="widget-wrap">
                  <SideBar />
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

export default Event;
