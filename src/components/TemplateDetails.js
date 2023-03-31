import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function TemplateDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="template-details-main">
      <div className="left-div">
        <img
          className="datadao-cover"
          src={location.state.cover}
          alt="datadao coverimage"
        />
        <h1>{location.state.title}</h1>
        <p>{location.state.info}</p>

        <h2>Registery</h2>
        <p>datadao.eth</p>

        <div>
          <button
            className="use-template"
            onClick={() => navigate("/create-data-dao")}
          >
            Use This Template
          </button>
        </div>
      </div>
      <div className="right-div">
        <h2>Template Configuration</h2>

        <div className="included-config">
          <div className="included-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              height="36px"
              viewBox="0 0 24 24"
              width="36px"
              fill="#000000"
            >
              <g>
                <rect fill="none" height="24" width="24" />
              </g>
              <g>
                <g>
                  <path d="M18,12.18l-1.5,1.64l2,2.18h-13l2-2.18L6,12.18l-3,3.27V20c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2v-4.54L18,12.18z" />
                  <path d="M10.59,14.42c0.78,0.79,2.05,0.8,2.84,0.01l4.98-4.98c0.78-0.78,0.78-2.05,0-2.83l-3.54-3.53c-0.78-0.78-2.05-0.78-2.83,0 L7.09,8.04c-0.78,0.78-0.78,2.03-0.01,2.82L10.59,14.42z M13.46,4.5l3.53,3.53l-4.94,4.94L8.52,9.44L13.46,4.5z" />
                </g>
              </g>
            </svg>
            <p>Voting</p>
          </div>
          <div className="included-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 20 20"
              height="36px"
              viewBox="0 0 20 20"
              width="36px"
              fill="#000000"
            >
              <rect fill="none" height="20" width="20" y="0" />
              <path d="M15.98,5.82L10.73,2.9c-0.45-0.25-1-0.25-1.46,0L4.02,5.82l3.8,2.11C8.37,7.36,9.14,7,10,7s1.63,0.36,2.17,0.93L15.98,5.82z M8.5,10c0-0.83,0.67-1.5,1.5-1.5s1.5,0.67,1.5,1.5s-0.67,1.5-1.5,1.5S8.5,10.83,8.5,10z M9.25,17.08l-5.23-2.9 c-0.48-0.26-0.77-0.77-0.77-1.31V7.11L7.1,9.24C7.03,9.49,7,9.74,7,10c0,1.4,0.96,2.57,2.25,2.91V17.08z M10.75,17.08v-4.18 C12.04,12.57,13,11.4,13,10c0-0.26-0.03-0.51-0.1-0.76l3.85-2.14l0,5.76c0,0.54-0.3,1.05-0.77,1.31L10.75,17.08z" />
            </svg>
            <p>Tokens</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplateDetails;
