import React from 'react';
import { Fragment } from 'react';
import { CardHorizontal } from './Cards/CardHorizontal';
import { Col } from 'react-bootstrap';
import { ChevronDown } from 'react-bootstrap-icons';

export const AllList = (props: any) => {
  const loadMore = (e: any) => {
    props.loadMore();
  };
  return (
    <Fragment>
      {props?.data &&
        props?.data.map((single: any) => {
          return (
            <Col lg='12' md='6' className='p-2' key={single.id}>
              <CardHorizontal
                title={single.name}
                tagline={single.tagline}
                imageUrl={single.image_url}
                description={single.description}
              />
            </Col>
          );
        })}
      {props.isLoadMore && (
        <Col lg='12' md='12' className='p-2'>
          <div className='load-more' onClick={loadMore}>
            Load More <ChevronDown />
          </div>
        </Col>
      )}
    </Fragment>
  );
};
