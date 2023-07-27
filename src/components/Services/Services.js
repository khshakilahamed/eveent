import React from "react";
import hallBooking from "./../../assets/Images/Home/hall-booking.jpg";
import stageMaking from "./../../assets/Images/Home/stage.jpg";
import catering from "./../../assets/Images/Home/Catering-2.webp";
import photographer from "./../../assets/Images/Home/wedding-photographer.jpeg";
import djBooking from "./../../assets/Images/Home/dj-booking.jpg";

const Services = () => {
  return (
    <div className="my-14" id="services">
      <h2 className="font-bold text-2xl mt-5">Our services</h2>

      <div className="grid md:grid-cols-2 gap-5 mt-5">
        <div className="relative">
          <img
            className=" h-auto sm:h-[382px] w-full"
            src={hallBooking}
            alt=""
          />
          <p className="absolute top-4 left-4 text-white font-bold text-lg">
            Hall Booking
          </p>
        </div>
        <div className="relative">
          <img
            className=" h-auto sm:h-[382px] w-full"
            src={stageMaking}
            alt=""
          />
          <p className="absolute top-4 left-4 text-white font-bold text-lg">
            Stage Making
          </p>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-5 mt-4">
        <div className="relative">
          <img className="h-[242px] w-full" src={catering} alt="" />
          <p className="absolute top-4 left-4 text-white font-bold text-lg">
            Catering <br />
            Services
          </p>
        </div>
        <div className="relative">
          <img className="h-[242px] w-full" src={photographer} alt="" />
          <p className="absolute top-4 left-4 text-white font-bold text-lg">
            Photographer <br /> Booking
          </p>
        </div>
        <div className="relative">
          <img className="h-[242px] w-full" src={djBooking} alt="" />
          <p className="absolute top-4 left-4 text-white font-bold text-lg">
            Dj Booking
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
