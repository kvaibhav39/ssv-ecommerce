import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/style.css";

const CompanyList = ({ companyDetail, address, follow_me, facts }) => {
  const [nav1, setNav1] = useState(null);

  return (
    <div className="about_page_section">
      {companyDetail[0].company_images !== "[]" && (
        <div className="about_page_slider">
          <Slider asNavFor={nav1} ref={(slider1) => setNav1(slider1)}>
            {companyDetail &&
              JSON.parse(companyDetail[0].company_images).map((c, i) => (
                <div key={i}>
                  <img
                    src={`${process.env.REACT_APP_FILE_BASE_URL}/${c}`}
                    key={c}
                    alt="project item"
                  />
                </div>
              ))}
          </Slider>
        </div>
      )}
      <div className="about_detaile_row">
        <div className="about_detaile_text_content col_span_2">
          <h2>Company History </h2>
          <div style={{ whiteSpace: "pre-line" }}>
            {companyDetail[0].company_history}
          </div>
        </div>
        <div className="about_detaile_text_content">
          <h2>Address </h2>
          <p>
            {address.address_one}, {address.address_two}
          </p>
        </div>
        <div className="about_detaile_text_content">
          <h2>Email </h2>
          <p>{address.email}</p>
        </div>
        <div className="about_detaile_text_content">
          <h2>Support Call </h2>
          <p>{address.support_call}</p>
        </div>
        <div className="about_detaile_text_content">
          <h2>Support Whatsapp </h2>
          <p>{address.support_whatsapp}</p>
        </div>
        <div className="about_detaile_text_content">
          <h2>Facebook </h2>
          <a href={follow_me.facebook_url} target="_blank" rel="noreferrer">
            {follow_me.facebook_url}
          </a>
        </div>
        <div className="about_detaile_text_content">
          <h2>Twitter </h2>
          <a href={follow_me.twitter_url} target="_blank" rel="noreferrer">
            {follow_me.twitter_url}
          </a>
        </div>
        <div className="about_detaile_text_content">
          <h2>Youtube </h2>
          <a href={follow_me.youtube_url} target="_blank" rel="noreferrer">
            {follow_me.youtube_url}
          </a>
        </div>
        <div className="about_detaile_text_content">
          <h2>Instagram </h2>
          <a href={follow_me.instagram_url} target="_blank" rel="noreferrer">
            {follow_me.instagram_url}
          </a>
        </div>
        <div className="about_detaile_text_content">
          <h2>Landmarks </h2>
          <p>{facts.landmarks}</p>
        </div>
        <div className="about_detaile_text_content">
          <h2>Commercial Unit </h2>
          <p>{facts.commercial_unit}</p>
        </div>
        <div className="about_detaile_text_content">
          <h2>Happy Customers </h2>
          <p>{facts.happy_customers}</p>
        </div>
        <div className="about_detaile_text_content">
          <h2>Year Of Experience </h2>
          <p>{facts.year_of_experience}</p>
        </div>
        <div className="about_detaile_text_content">
          <h2>Lakh Of Constructed Space </h2>
          <p>{facts.lakh_of_constructed_space}</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyList;
