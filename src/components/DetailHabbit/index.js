import React from "react";
import { deleteHabbit } from "../../utils/firebaseFunc";
import ButtonCustom from "../ButtonCustom";
import CalendarComponent from "../CalendarComponent";
import Heading from "../Heading";
import Modal from "../Modal";

const DetailHabbit = ({ setValue, dataDetailHabbit, setShowModal }) => {
  return (
    <Modal setValue={setValue}>
      <h3>{dataDetailHabbit?.data?.name}</h3>
      <div className="d-flex my-4">
        <div className="me-4">
          <CalendarComponent
            setValue={() => null}
            value={dataDetailHabbit?.data?.date.toDate()}
            activeStartDate={dataDetailHabbit?.data?.date.toDate()}
          />
        </div>
      </div>
      <div>
        <Heading title="Note" />
        <p className="fs-6 opacity-50">{dataDetailHabbit?.data?.note}</p>
      </div>
      <div className="mt-4 d-flex">
        {setShowModal && (
          <div className="me-3">
            <ButtonCustom
              title="Edit"
              size="normal"
              iconName="create"
              isIcon={true}
              handlePress={() => {
                setShowModal(true);
                setValue(false);
              }}
            />
          </div>
        )}
        <ButtonCustom
          title="Delete"
          size="normal"
          iconName="trash"
          isIcon={true}
          handlePress={() => {
            setValue(false);
            deleteHabbit("habbits", dataDetailHabbit.id);
          }}
        />
      </div>
    </Modal>
  );
};

export default DetailHabbit;
