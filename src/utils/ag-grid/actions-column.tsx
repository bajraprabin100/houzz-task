import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Icon, ThreeDotsVertical } from 'react-bootstrap-icons';
import { useHistory } from 'react-router-dom';
import { AnyType } from '../../interfaces';

export interface ActionColumnActions {
  featureKey?: string;
  href: string;
  icon: Icon;
  label: string;
  testId?: string;
  data?: any;
}

export const ActionsCellRenderer = () => {
  return (
    <div className='text-center text-primary' data-testid='cmx__hcp-grid-actions-button'>
      <ThreeDotsVertical />
    </div>
  );
};

export const ActionsCellEditor = forwardRef((props: AnyType, ref) => {
  const [show, setShow] = useState(true);
  const history = useHistory();

  const handleClick = (event: any) => {
    let eventPathArray = [];
    let className = [];
    if (event.path) {
      eventPathArray = event.path.splice(0, 5);
      className = eventPathArray.filter((eventPath: any) => {
        return typeof eventPath.className === 'string' && eventPath.className.includes('ag-cell-popup-editing');
      });
    }
    if (show || className.length) {
      setShow(!show);
    }
  };

  // This will run in all render and handle clicks
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });

  useImperativeHandle(ref, () => {
    return {
      getValue() {
        return '';
      },
      isPopup() {
        return true;
      }
    };
  });
  return (
    <div>
      <Dropdown drop='left' show={show}>
        <p>test</p>
      </Dropdown>
    </div>
  );
});

ActionsCellEditor.displayName = 'ActionsCellEditor';
