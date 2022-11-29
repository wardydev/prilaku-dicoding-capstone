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

function HabbitTypeSelector({ setSelectTypeModal, dataDetailHabbit, setDataDetailHabbit }) {
  const [description, setDescription] = React.useState('regular');
  const [habbitCreatorModal, setHabbitCreatorModal] = React.useState(false);

  const changeDescription = (desc) => {
    setDescription(desc);
  };

  return (
    <Modal setValue={setSelectTypeModal}>
      {habbitCreatorModal && 
        <FormHabbit
          setShowModal={setHabbitCreatorModal}
          detailHabbit={dataDetailHabbit}
          closeSelectTypeModal={setSelectTypeModal}
        />
      }
      <div className="row">
        <div className='col-4'>
          <div className={`${styles['habit-type']} ${description === 'regular' ? 'bg-primary' : ''}`} onClick={() => changeDescription('regular')}>
            <BiRepeat />
            <span>Regular</span>
          </div>
        </div>
        <div className='col-4'>
          <div className={`${styles['habit-type']} ${description === 'negative' ? 'bg-danger' : ''}`} onClick={() => changeDescription('negative')}>
            <BiBlock />
            <span>Negative</span>
          </div>
        </div>
        <div className='col-4'>
          <div className={`${styles['habit-type']} ${description === 'one-time' ? 'bg-info' : ''}`} onClick={() => changeDescription('one-time')}>
            <BsFillCalendar2CheckFill />
            <span>One Time</span>
          </div>
        </div>
      </div>
      <div className="mt-4 card bg-dark p-4" style={{height: '150px'}}>
        {description === 'regular' && 
          <ShowDescription 
            title='REGULAR'
            description='Related to your daily routine. Check it in a regular and repeated way. E.g. Do sports twice a week'
          />}
        {description === 'negative' && 
          <ShowDescription 
            title='NEGATIVE'
            description='Start each day as complete. Only to uncheck it when your fail. E.g. smoking & alcohol'
          />}
        {description === 'one-time' && 
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
