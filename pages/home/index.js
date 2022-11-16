import React from "react";
import ButtonCustom from "../../src/components/ButtonCustom";
import HabbitCard from "../../src/components/HabbitCard";
import Header from "../../src/components/Header";
import Layout from "../../src/components/Layout";

const Home = () => {
  return (
    <Layout>
      <div className="row my-4">
        <div className="col-7 ms-auto">
          <Header
            title="17 Agustus 2022"
            imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Joko_Widodo_2019_official_portrait.jpg/1200px-Joko_Widodo_2019_official_portrait.jpg"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-8">
          <div className="mb-2">
            <ButtonCustom
              title="Tambahkan Habbit"
              isIcon={true}
              size="normal"
            />
          </div>
          <HabbitCard title="Belajar Coding" iconName="home" />
          <HabbitCard title="Belajar Javascript" iconName="bar-chart" />
        </div>
        <div className="col-4">calendar area</div>
      </div>
    </Layout>
  );
};

export default Home;
