import React, { useEffect, useState } from "react";
import slide1 from "../../assets/images/slider-image-5.jpeg";
import slide2 from "../../assets/images/slider-image-4.jpeg";
// import slide3 from "../../assets/images/slider-image-3.jpeg";
import grocery1 from "../../assets/images/bag.jpg";
import grocery2 from "../../assets/images/music.jpg";
import Slider from "react-slick";

export default function MainSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1, //هيحرك كام واحد لما تقلب
    autoplay: false,
    autoplaySpeed: 1000,
  };
  return (
    <>
      <div className="container  mt-[7rem]">
        <div className="flex flex-wrap mt-2 g-0 justify-center ">
          <div className="overflow-hidden md:w-3/12">
            <Slider {...settings} className="mb-10 w-full">
              <img
                src={slide1}
                className="w-[234px]  object-cover"
                alt="vegetables"
              />
              <img
                src={slide2}
                className="w-[234px] h-[50%] object-cover"
                alt="bag"
              />
            </Slider>
          </div>
          <div className=" md:w-3/12 h-[100%]">
            <img
              src={grocery1}
              className="w-full h-[50%] object-cover"
              alt="bag"
            />
            <img
              src={grocery2}
              className="w-full h-[50%] object-cover"
              alt="music"
            />
          </div>
        </div>
      </div>
    </>
  );
}
