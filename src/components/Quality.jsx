import React from "react";
import QualityCard from "./QualityCard";

const QualitySection = () => {
  const qualities = [
    {
      icon: "bi-truck",
      title: "Free Shipping",
      description:
        "Seitan echo park health goth you probably haven't heard of them hot chicken williamsburg. Synth marfa trust fund vibecession.",
    },
    {
      icon: "bi-bag-check",
      title: "Quality Products",
      description:
        "Seitan echo park health goth you probably haven't heard of them hot chicken williamsburg. Synth marfa trust fund vibecession.",
    },
    {
      icon: "bi-headset",
      title: "Best Customer Service",
      description:
        "Seitan echo park health goth you probably haven't heard of them hot chicken williamsburg. Synth marfa trust fund vibecession.",
    },
  ];

  return (
    <section className="quality-section py-5">
      <div className="container">
        <div className="row">
          {qualities.map((item, index) => (
            <QualityCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default QualitySection;
