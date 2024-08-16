import React from "react";
import { Button, Col, Container, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
function Landing() {
  return (
    <>
      <Container className="mt-5 mb-5 align-items-center justify-content-evenly w-100">
        <Row>
          <Col>
            <h3>
              Welcome To <span className="text-warning">Media Player</span>
            </h3>
            <p style={{ textAlign: "justify" }}>
              Our application offers a seamless experience for media
              enthusiasts. You can effortlessly play YouTube videos with a
              user-friendly interface, providing high-quality playback directly
              from the platform. Enjoy the convenience of downloading both audio
              and video from YouTube videos, allowing you to save your favorite
              content for offline access. As a single-page application, it
              ensures smooth navigation without constant page reloads, enhancing
              the overall user experience. Whether you are watching videos,
              managing your downloads, or exploring various media options, our
              application integrates these functionalities in a cohesive,
              intuitive manner. Enjoy a robust and versatile media solution
              tailored to meet all your entertainment needs.
            </p>
            <Link to="/home">
              <button className="btn btn-warning mt-5">
                Get Started <i class="fa-solid fa-arrow-right"></i>
              </button>
            </Link>
          </Col>
          <Col>
            {/* <img src="https://media.tenor.com/lhlDEs5fNNEAAAAC/music-beat.gif" alt="" className="ms-5" style={{height:"20rem"}} /> */}
            <img
              // src="https://i.imgur.com/pESjsss.gif"
              // src="ncs.gif"
              src="https://c.tenor.com/aqqDW0JyRWUAAAAC/tenor.gif"
              alt=""
              className="ms-5"
              style={{ height: "20rem", width: "30rem" }}
            />
          </Col>
        </Row>
      </Container>
      <div className="container mt-5 mb-5">
        <h3 className="mt-3 mb-3">Features</h3>
        <div className="cards d-flex flex-column flex-md-row align-items-center justify-content-evenly">
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://c.tenor.com/x7Ra06eQY4UAAAAd/tenor.gif"
            />
            <Card.Body>
              <Card.Title>Single Page Application</Card.Title>
              <Card.Text>
                Navigate through the application seamlessly with our single-page
                design. Enjoy a fluid and responsive user experience without the
                hassle of constant page reloads. Our application ensures quick
                access to all features and content, providing a cohesive and
                efficient browsing experience.
              </Card.Text>
              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://i.giphy.com/RMwgs5kZqkRyhF24KK.webp"
            />
            <Card.Body>
              <Card.Title>Play YouTube Videos</Card.Title>
              <Card.Text>
                Enjoy seamless playback of YouTube videos directly within the
                application. Our integrated player supports high-definition
                streaming, ensuring a smooth and engaging viewing experience.
                With easy access to controls and playback options, watching your
                favorite videos has never been simpler.
              </Card.Text>
              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWxsaHk5dXZhYmRzOTg0cHNycHN1Mzl6OGdhOTVzdXd5MXJwenM1byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jP4qxu5ZskpXinpLL3/giphy.webp"
            />
            <Card.Body>
              <Card.Title>Download Audio and Video</Card.Title>
              <Card.Text>
                Save your favorite YouTube content for offline access with our
                robust downloading feature. You can choose to download either
                audio or video files, making it convenient to enjoy media
                on-the-go without needing an internet connection. Manage your
                downloads effortlessly with our intuitive interface.
              </Card.Text>
              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="container mb-5 mt-5 border border-2 border-secondary rounded p-5">
        <Row>
          <Col>
            <h3 className="mb-3">Simple and powerful</h3>
            <p>
              <span className="fs-5 fw-bolder">Free to use : </span> Enjoy all
              the features of our application at no cost. There are no hidden
              fees or premium versions, allowing you to fully experience
              everything without any financial commitment. Access all
              functionalities and stay up-to-date with our latest updates
              without spending a penny.
            </p>
            <p>
              <span className="fs-5 fw-bolder">Play Everything : </span> Stream
              and watch a wide range of content effortlessly. Our platform
              supports various media formats, ensuring compatibility with all
              your favorite videos and audio files. Enjoy uninterrupted playback
              and explore an extensive library of content, all from one
              convenient location.
            </p>
            <p>
              <span className="fs-5 fw-bolder">No ads : </span> Experience a
              seamless viewing experience without any interruptions from
              advertisements. Our application provides an ad-free environment,
              allowing you to focus on enjoying your content. Say goodbye to
              disruptive ads and hello to uninterrupted entertainment.
            </p>
          </Col>
          <Col className="mt-5 d-flex flex-column flex-md-row">
            <iframe
              width="691"
              height="389"
              className="embed-responsive-16by9"
              // style={{width:"100%", height:"100%"}}
              src="https://www.youtube.com/embed/n9SkxksDuWU"
              title="BB Cooper &amp; Jake Daniels - Figure You Out"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Landing;
