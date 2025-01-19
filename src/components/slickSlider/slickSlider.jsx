import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "./slickSlide.css";
export default function SlickSlider() {
  const [Categories, setCategories] = useState(null);
  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setCategories(res.data.data);
      });
  }
  useEffect(() => {
    getCategories();
  }, []);
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    autoplay: false,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1, dots: false },
      },
    ],
  };
  return (
    <>
      <div className="container">
        {Categories && (
          <Slider className="my-[3rem]" {...settings}>
            {Categories.map((c) => (
              <>
                <div key={c._id}>
                  <img
                    className="w-full h-[270px] object-cover"
                    src={c.image}
                    alt={c?.name}
                  />
                  <h3
                    className="text-[25px] leading-[34px] font-[500] text-[#212529]"
                    style={{ padding: "10px 0 0 18px" }}
                  >
                    {c.name}
                  </h3>
                </div>
              </>
            ))}
          </Slider>
        )}
      </div>
    </>
  );
}
