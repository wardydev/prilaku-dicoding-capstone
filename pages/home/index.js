import React from "react";
import ButtonCustom from "../../src/components/ButtonCustom";
import CalendarComponent from "../../src/components/CalendarComponent";
import HabbitCard from "../../src/components/HabbitCard";
import Header from "../../src/components/Header";
import Heading from "../../src/components/Heading";
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
              iconName="add"
            />
          </div>
          <div className="mt-3">
            <HabbitCard
              title="Belajar Coding"
              iconName="home"
              color="#432C7A"
            />
          </div>
          <div className="mt-3">
            <HabbitCard title="Belajar Javascript" iconName="bar-chart" />
          </div>
        </div>
        <div className="col-4">
          <div className="mb-4">
            <Heading title="Date" />
            <CalendarComponent />
          </div>
          <div>
            <Heading title="At Time" />
            <div className="row">
              <div className="col-6 mb-3">
                <ButtonCustom
                  title="All"
                  isIcon={true}
                  size="normal"
                  iconName="home"
                  isFullWidth={true}
                />
              </div>
              <div className="col-6 mb-3">
                <ButtonCustom
                  title="Morning"
                  isIcon={true}
                  size="normal"
                  iconName="home"
                  isFullWidth={true}
                />
              </div>
              <div className="col-6 mb-3">
                <ButtonCustom
                  title="Evening"
                  isIcon={true}
                  size="normal"
                  iconName="home"
                  isFullWidth={true}
                />
              </div>
              <div className="col-6 mb-3">
                <ButtonCustom
                  title="Afternoon"
                  isIcon={true}
                  size="normal"
                  iconName="home"
                  isFullWidth={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
