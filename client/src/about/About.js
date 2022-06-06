import React from 'react';
import "./about.css";
import { Button, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
    crossorigin="anonymous"
/>

function About() {
    return (
        <>
            <Banner />
            <AboutDescription />
            <AboutTeam />
            <AboutMessage />
        </>
    )
}

export default About

function Banner() {
    return (
        <div className="Banner fluid-container">
            <div className='BannerText'>
                <h1>About MyCalendar</h1>
                <h4>Thank you for using our cite.</h4>
            </div>
        </div>
    )
}


function AboutDescription() {
    return (
        <div className="Description  row justify-content-lg-center justify-content-md-between">
            <div className="col-md-6">
                <div id='description-icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10%" height="10%" fill="currentColor" class="bi bi-boxes pb-4" viewBox="0 0 16 16">
                        <path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434L7.752.066ZM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567L4.25 7.504ZM7.5 9.933l-2.75 1.571v3.134l2.75-1.571V9.933Zm1 3.134 2.75 1.571v-3.134L8.5 9.933v3.134Zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567-2.742 1.567Zm2.242-2.433V3.504L8.5 5.076V8.21l2.75-1.572ZM7.5 8.21V5.076L4.75 3.504v3.134L7.5 8.21ZM5.258 2.643 8 4.21l2.742-1.567L8 1.076 5.258 2.643ZM15 9.933l-2.75 1.571v3.134L15 13.067V9.933ZM3.75 14.638v-3.134L1 9.933v3.134l2.75 1.571Z" />
                    </svg>
                </div>
                <p>
                    <b>Created</b> in 2022 Summer, Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Rem
                    ducimus nisi, sed
                    dolores debitis quis facilis odio, molestias, officiis culpa repudiandae.
                </p>

            </div>
            <div className="col-md-6">
                <div id='description-icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10%" height="10%" fill="currentColor" class="bi bi-pin pb-4" viewBox="0 0 16 16">
                        <path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A5.921 5.921 0 0 1 5 6.708V2.277a2.77 2.77 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354zm1.58 1.408-.002-.001.002.001zm-.002-.001.002.001A.5.5 0 0 1 6 2v5a.5.5 0 0 1-.276.447h-.002l-.012.007-.054.03a4.922 4.922 0 0 0-.827.58c-.318.278-.585.596-.725.936h7.792c-.14-.34-.407-.658-.725-.936a4.915 4.915 0 0 0-.881-.61l-.012-.006h-.002A.5.5 0 0 1 10 7V2a.5.5 0 0 1 .295-.458 1.775 1.775 0 0 0 .351-.271c.08-.08.155-.17.214-.271H5.14c.06.1.133.191.214.271a1.78 1.78 0 0 0 .37.282z" />
                    </svg>
                </div>
                <p>
                    <b>The Purpose</b> of Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                    vel, mollitia
                    quaerat
                    deleniti autem, rem magnam culpa expedita illum dolorem, molestiae quod nihil.
                </p>

            </div>

        </div>
    )
}

function AboutTeam() {
    return (
        <div className="Team">
            <h2 className='text-center '>Meet the Team</h2>
            <TeamMembers />
        </div>


    )
}

function TeamMembers() {
    return (
        <div className="row p-5 justify-content-lg-center justify-content-md-center pt-5">
            <TeamMember />
        </div>
    )
}

function TeamMember() {
    return (
        <>
            <div className='col-md-4'>
                <Image thumbnail className='' id="headshot" src={"./about-images/sarah_headshot.jpg"} />
            </div>
            <div className='col-md-6 p-3'>
                <h5><b>Name Here</b></h5>
                <h6>Role here</h6>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqu. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqu.</p>
            </div>
        </>
    )

}
function AboutMessage() {

}

class AboutUs extends React.Component {

}