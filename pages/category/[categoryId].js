import React from "react";
import Image from "next/image";
import client from "../../src/config/client";

const DetailCategory = ({ data }) => {
  console.log(data);
  return (
    <div>
      {data?.map((category) => {
        return (
          <div key={category.id}>
            <h5>{category.title}</h5>
            <img src={category.image} alt="data-image" />
          </div>
        );
      })}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const id = context.params.categoryId;

  try {
    const res = await client.get(`/category/${id}`);
    const data = res.data;
    return { props: { data } };
  } catch (err) {
    console.log(err);
  }
};

export default DetailCategory;
