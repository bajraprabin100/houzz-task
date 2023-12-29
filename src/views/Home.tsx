import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import './Home.scss';
import { ListGroupHorizontal } from '../components/List/ListGroupHorizontal';
import { MyVerticallyCenteredModal } from '../components/Modal/MyVerticallyCenteredModal';
import { BeerDetails, useGetBeers } from '../api/portal-config.generated';
import { CONFIG_DOMAIN, GATEWAY_API_URL } from '../api';
import { AllList } from '../components/AllList';

export const HomeView = () => {
  const [modalShow, setModalShow] = useState(false);
  const [page, setPage] = useState(1);
  const { data, loading, error, refetch } = useGetBeers({
    base: GATEWAY_API_URL,
    lazy: true
  });

  const [beers, setBeersState] = useState<BeerDetails[]>([]);
  const [addedBeer, setAddedBearState] = useState<any[]>([]);

  const loadData = useCallback(() => {
    refetch({ queryParams: { page: page, per_page: 10 } });
  }, [page]);
  useEffect(() => {
    if (!data) return;
    setBeersState([...beers, ...data]);
  }, [data]);

  useEffect(loadData, [loadData, page]);
  const [titleData, setTitleData] = useState([
    {
      title: 'All Beers',
      active: true,
      className: 'all-beer'
    },
    {
      title: 'My Beers',
      active: false,
      className: 'my-beer'
    }
  ]);
  const [activeTab, setActiveTab] = useState('');
  const getClickedData = (values: any) => {
    setTitleData(values);
  };
  useEffect(() => {
    const newActiveTab = titleData.find((data) => data.active === true);
    setActiveTab(newActiveTab?.className || '');
  }, [titleData]);
  const loadMore = () => {
    const newPage = page + 1;
    setPage(newPage);
  };
  const addNewBeer = (value: any) => {
    setAddedBearState([...addedBeer, value]);
  };

  return (
    <>
      <Container>
        <Row>
          <Col lg='12' md='12' className='p-2 title-section'>
            <ListGroupHorizontal data={titleData} getClickedData={getClickedData} />
            {activeTab !== 'all-beer' ? (
              <div>
                <Button variant='primary' size='sm' onClick={() => setModalShow(true)}>
                  Add a new beer
                </Button>
              </div>
            ) : (
              <></>
            )}
          </Col>
          {activeTab === 'all-beer' ? (
            <AllList data={beers} loadMore={loadMore} isLoadMore={true} />
          ) : (
            <>
              {addedBeer.length > 0 ? (
                <AllList data={addedBeer} loadMore={loadMore} isLoadMore={false} />
              ) : (
                <Col lg='12' md='12' className='p-2 empty-list center'>
                  <div className='empty-content'>
                    <p>Nothing to see yet</p>
                    <p>
                      <span>Click here</span> to add your first beer!
                    </p>
                  </div>
                </Col>
              )}
            </>
          )}
        </Row>
      </Container>
      <MyVerticallyCenteredModal
        className='beer-modal'
        size='md'
        show={modalShow}
        onHide={() => setModalShow(false)}
        getsubmitteddata={addNewBeer}
      />
    </>
  );
};
