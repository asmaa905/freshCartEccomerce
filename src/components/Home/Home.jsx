import React, { useEffect, useState } from "react";
import RecentProducts from "./../RecentProducts/RecentProducts";
import SlickSlider from "./../slickSlider/slickSlider";
import MainSlider from "./../mainSlider/mainSlider";
export default function Home() {
  return (
    <>
      <MainSlider></MainSlider>
      <SlickSlider></SlickSlider>
      <RecentProducts></RecentProducts>
    </>
  );
}
