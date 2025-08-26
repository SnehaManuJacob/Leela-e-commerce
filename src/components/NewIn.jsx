import React from "react";
import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Classic Hoop Earrings",
    price: "$79.99",
    desc: "Gold plated vermeil classic hoops",
    img: "https://i.pinimg.com/1200x/53/c0/60/53c060235c0f26a4c2bfc24a75f62979.jpg",
  },
  {
    id: 2,
    name: "Molten Ring",
    price: "$59.99",
    desc: "Organic molten-inspired design",
    img: "https://i.pinimg.com/1200x/04/84/aa/0484aaec4e2dcde42becd2d1e1f3ea75.jpg",
  },
  {
    id: 3,
    name: "Twisted Necklace",
    price: "$149.99",
    desc: "Elegant twisted rope chain",
    img: "https://i.pinimg.com/1200x/57/ee/82/57ee82779c8d830bff10c326308f77d5.jpg",
  },
  {
    id: 4,
    name: "Statement Bangle",
    price: "$199.99",
    desc: "Bold statement wristwear",
    img: "https://i.pinimg.com/1200x/1d/57/92/1d57921fbc6237b9e7932f9a24121ab6.jpg",
  },
];

export default function NewIn() {
  return (
    <section className="container py-5">
      <h2 className="section-title mb-4">New In</h2>
      <div className="row">
        {products.map((p) => (
          <div className="col-6 col-md-3 mb-4" key={p.id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
