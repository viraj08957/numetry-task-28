/* eslint-disable no-unused-vars */
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Testimonials = () => {
  const customers = [
    {
      id: 1,
      name: "John Doe",
      image:
        "https://media.istockphoto.com/id/1384357176/photo/portrait-of-a-handsome-mexican-man.jpg?s=1024x1024&w=is&k=20&c=0OufRtVtQ2SQs3sVGZ-uXDxgEJqF6ePpyTx8KwSUpVQ=",
      review: "Excellent service and friendly staff!",
    },
    {
      id: 2,
      name: "Jane Smith",
      image:
        "https://media.istockphoto.com/id/1283069710/photo/senior-black-business-owner.jpg?s=1024x1024&w=is&k=20&c=QLELay87m0S33Yfrbqx7GoT8o691YHp19K7Ry7tsUG0=",
      review: "I had a wonderful experience!",
    },
    {
      id: 3,
      name: "Alice Johnson",
      image:
        "https://media.istockphoto.com/id/1135381120/photo/portrait-of-a-young-woman-outdoors-smiling.jpg?s=1024x1024&w=is&k=20&c=3jNReWPZuYJ2v6FGU3-sYMTBnkGDKWN8oYGfNDD6E1Y=",
      review: "Highly recommend this company!",
    },
    {
      id: 4,
      name: "Robert Brown",
      image:
        "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1899&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      review: "Great quality and fast delivery.",
    },
    {
      id: 5,
      name: "Lucy White",
      image:
        "https://media.istockphoto.com/id/1384357158/photo/portrait-of-a-beautiful-mexican-woman.jpg?s=1024x1024&w=is&k=20&c=7VBort-ZdbLZ9vlIAledhuJbLtMs6FWN7DNf7aCTpac=",
      review: "Very satisfied with the service!",
    },
    {
      id: 6,
      name: "Michael Green",
      image:
        "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      review: "Exceptional customer support!",
    },
    {
      id: 7,
      name: "Emma Wilson",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      review: "I will definitely come back again!",
    },
    {
      id: 8,
      name: "Oliver Harris",
      image:
        "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      review: "Very professional and courteous.",
    },
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={1000}
      >
        {customers.map((customer) => (
          <div key={customer.id} className="p-4">
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <img
                src={customer.image}
                alt={customer.name}
                className="rounded-full w-24 h-24 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">{customer.name}</h3>
              <p className="mt-2 text-gray-600">{customer.review}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Testimonials;
