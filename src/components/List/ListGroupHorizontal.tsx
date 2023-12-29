import React, { Props, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
export interface ListGroupHorizontalProps extends Props<JSX.Element> {
  data: Array<{
    title: string;
    active: boolean;
    className: string;
  }>;
}
export const ListGroupHorizontal = (props: any) => {
  const listGroupClicked = (e: any) => {
    const newData = props.data.map((el: any) => {
      if (el.active) {
        el.active = false;
      }
      if (el.className === e.target.id) {
        el.active = true;
      }
      return el;
    });
    props.getClickedData(newData);
  };
  return (
    <ListGroup horizontal className='list-group-custom-horizontal no-border'>
      {props?.data.map((single: any) => (
        <ListGroup.Item key={single.title} active={single.active} id={single.className} onClick={listGroupClicked}>
          {single.title}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
