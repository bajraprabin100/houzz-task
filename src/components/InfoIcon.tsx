import React, { useState, useRef, useEffect } from 'react';
import { InfoCircle } from 'react-bootstrap-icons';
import './infoBox.scss';

const InfoIcon = (props: any) => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { arrow, top, left, right, marginLeft, position, width, height, bodyData } = props;

  // This method will be clicked always when we click on anywhere on screen(document)
  const handleDocumentClick = (event: any) => {
    // This will be true only when user click on info icon
    if (
      (event.path[0].nodeName === 'path' && event.path[1].classList.value.includes('databox')) ||
      event.path[0].classList.value.includes('databox')
    ) {
      handleIconClick();
      return;
    }
    // This will be clicked only when user clicks anywhere but not in info box
    if (ref.current && !ref.current.contains(event.target)) {
      setShow(false);
    }
  };

  const handleIconClick = () => {
    if (show) setShow(false);
    else setShow(true);
  };

  // This will run in all render and handle outside click of info box
  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  });

  return (
    <div className='info-box-container' data-testid='info-box'>
      <InfoCircle size={15} className='pointer databox' />
      <div>
        {show && (
          <div
            className={`info-content info-box ${arrow}`}
            style={{ top, left, marginLeft, right, width, height, position }}
            ref={ref}>
            {bodyData}
            {!bodyData && (
              <ul>
                <li>
                  <span>Minimum 8 characters in length</span>
                </li>
                <li>
                  <span>At least 1 upper case letter (alphabet)</span>
                </li>
                <li>
                  <span>At least 1 numeric character (number)</span>
                </li>
                <li>
                  <span>At least 1 special character (!, #, @ $ etc)</span>
                </li>
                <li>
                  <span>Password should not have first name and/or last name</span>
                </li>
                <li>
                  <span>Password can not be any of your last 5 passwords</span>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoIcon;
