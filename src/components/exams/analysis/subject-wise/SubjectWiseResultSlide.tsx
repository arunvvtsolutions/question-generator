import React from "react";
import SubjectWiseResultCard from "./SubjectWiseResultCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { NextArrow, PrevArrow } from "./SlideButtonWrap";
import { IExamSectionWiseProps } from "@/types/exam";
interface Section {
  name: string;
  attendedQues: number;
  total: number;
}

interface Subject {
  name: string;
  sections: Section[];
}

export interface ISubjectWiseResultProps {
  SubjectWiseData: Subject[];
}

const SubjectWiseResultSlide = ({
  subjectWiseData,
}: {
  subjectWiseData: IExamSectionWiseProps[];
}) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,

          arrows: false,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className=" mx-[-5px]   lg:pb-[20px] pb-[0px]  ">
      <Slider {...settings}>
        {subjectWiseData.map((subject, index) => (
          <div key={index} className="px-[5px]">
            <SubjectWiseResultCard subjectWiseData={subject} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SubjectWiseResultSlide;
