import React from 'react';
import { BiRepeat, BiBlock } from 'react-icons/bi';
import { BsFillCalendar2CheckFill } from 'react-icons/bs';
import Modal from '../Modal';
import styles from './HabbitTypeSelector.module.scss';
import ButtonCustom from '../ButtonCustom';
import FormHabbit from '../FormHabbit';

const ShowDescription = ({title, description}) => {
  return (
    <>
      <h3>{title}</h3>
      <p>{description}</p>
    </>
  )
};

function HabbitTypeSelector({ setShowSelectTypeModal, dataDetailHabbit, setDataDetailHabbit }) {
  const [habbitCreatorModal, setHabbitCreatorModal] = React.useState(false);
  const [habbitType, setHabbitType] = React.useState('regular');

  const changeHabbitType = (type) => {
    setHabbitType(type);
  };

  return (
    <Modal setValue={setShowSelectTypeModal}>
      {habbitCreatorModal && 
        <FormHabbit
          setShowModal={setHabbitCreatorModal}
          detailHabbit={dataDetailHabbit}
          setShowSelectTypeModal={setShowSelectTypeModal}
          habbitType={habbitType}
        />
      }
      <div className="row">
        <div className='col-4'>
          <div className={`${styles['habit-type']} ${habbitType === 'regular' ? 'bg-primary' : ''}`} onClick={() => changeHabbitType('regular')}>
            <BiRepeat />
            <span>Regular</span>
          </div>
        </div>
        <div className='col-4'>
          <div className={`${styles['habit-type']} ${habbitType === 'negative' ? 'bg-danger' : ''}`} onClick={() => changeHabbitType('negative')}>
            <BiBlock />
            <span>Negative</span>
          </div>
        </div>
        <div className='col-4'>
          <div className={`${styles['habit-type']} ${habbitType === 'one-time' ? 'bg-info' : ''}`} onClick={() => changeHabbitType('one-time')}>
            <BsFillCalendar2CheckFill />
            <span>One Time</span>
          </div>
        </div>
      </div>
      <div className="mt-4 card bg-dark p-4" style={{height: '150px'}}>
        {habbitType === 'regular' && 
          <ShowDescription 
            title='REGULAR'
            description='Related to your daily routine. Check it in a regular and repeated way. E.g. Do sports twice a week'
          />}
        {habbitType === 'negative' && 
          <ShowDescription 
            title='NEGATIVE'
            description='Start each day as complete. Only to uncheck it when your fail. E.g. smoking & alcohol'
          />}
        {habbitType === 'one-time' && 
          <ShowDescription 
            title='ONE-TIME'
            description='Remind you if important one-time events on a specific date you set. E.g. Take a math test on Monday'
          />}
      </div>
      <div className='mt-4'>
        <ButtonCustom
          title="Create New Habit"
          isIcon={true}
          size="large"
          iconName="add"
          handlePress={() => {
            setDataDetailHabbit(null);
            setHabbitCreatorModal(true);
          }}
        />
      </div>
    </Modal>
  )
}

export default HabbitTypeSelector;
