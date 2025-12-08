import React from "react";
import ProductCarousel from "../components/ProductCarousel/ProductCarousel";

const Test = ({ item }) => {

    const mockItems = [
  {
    id: 1,
    title: "Rumours",
    artists: [{ name: "Fleetwood Mac" }],
    price: 29.99,
    cover_image_url: "" 
  },
  {
    id: 2,
    title: "Thriller",
    artists: [{ name: "Michael Jackson" }],
    price: 24.99,
    cover_image_url: ""
  },
  {
    id: 3,
    title: "The Dark Side of the Moon",
    artists: [{ name: "Pink Floyd" }],
    price: 34.50,
    cover_image_url: ""
  },
  {
    id: 4,
    title: "Back to Black",
    artists: [{ name: "Amy Winehouse" }],
    price: 21.00,
    cover_image_url: ""
  },
  {
    id: 5,
    title: "Hotel California",
    artists: [{ name: "Eagles" }],
    price: 27.99,
    cover_image_url: ""
  },
  {
    id: 6,
    title: "Nevermind",
    artists: [{ name: "Nirvana" }],
    price: 32.00,
    cover_image_url: ""
  },
  {
    id: 7,
    title: "Kind of Blue",
    artists: [{ name: "Miles Davis" }],
    price: 45.00,
    cover_image_url: ""
  },
  {
    id: 8,
    title: "Random Access Memories",
    artists: [{ name: "Daft Punk" }],
    price: 39.99,
    cover_image_url: ""
  },
  {
    id: 9,
    title: "Legend",
    artists: [{ name: "Bob Marley" }],
    price: 19.99,
    cover_image_url: ""
  },
  {
    id: 10,
    title: "Purple Rain",
    artists: [{ name: "Prince" }],
    price: 28.50,
    cover_image_url: ""
  },
  {
    id: 11,
    title: "A Love Supreme",
    artists: [{ name: "John Coltrane" }],
    price: 42.00,
    cover_image_url: ""
  },
  {
    id: 12,
    title: "Lemonade",
    artists: [{ name: "Beyoncé" }],
    price: 31.00,
    cover_image_url: ""
  }
];

    return (
        <>
        <ProductCarousel products={mockItems}>
        </ProductCarousel>
        </>
    )
}

export default Test;