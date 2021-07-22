import React, {useState} from 'react';
import PassItem from "./PassItem";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {Checkboxes, Segment, Ticket} from "../store/types/flights";
import Loader from "react-loader-spinner";
import MessageCard from "./MessageCard";
import {getFlights} from "../store/actions/flights";

const TicketsListWrapper = styled.div`
  width: 100%;
`

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`

const PaginationContainer = styled.div`
  padding: 20px 0 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .block {
    display: none;
  }
`

const PaginationButton = styled.button`
  padding: 15px;
  width: 100%;
  background: #2196F3;
  color: white;
  text-transform: uppercase;
  font-size: 12px;
  border: 1px solid #DFE5EC;
  border-radius: 5px;
`

const PassList = () => {

    const {
        tickets,
        currentFilter,
        checkboxProps,
        loading,
        error
    } = useSelector((store: RootState) => store.tickets)

    const {
        all,
        WithoutTransplantation,
        oneTransplantation,
        twoTransplantation,
        threeTransplantation
    }: Checkboxes = checkboxProps

    const [itemsAmount, setItemsAmount] = useState(5);

    const filterBySelectedButton = (a: Ticket, b: Ticket): number | undefined => {
        if (currentFilter === "lowcost")
            return a.price - b.price;
        else if (currentFilter === "fastest")
            return a.segments
                .reduce((sum: number, item: Segment) => sum + item.duration, 0) - b.segments
                .reduce((sum: any, item: Segment) => sum + item.duration, 0);
        else if (currentFilter === "optimal")
            return a.segments
                .reduce((sum: number, item: Segment) => sum + item.duration, 0) / a.price - b.segments
                .reduce((sum: any, item: Segment) => sum + item.duration, 0) / b.price
    }

    const flightsFilter = (item: Ticket) => {
        const stops = item.segments.reduce((sum: number, item: Segment) => sum + item.stops.length, 0)
        if (all) return true;
        switch (stops) {
            case undefined: return WithoutTransplantation;
            case 1: return oneTransplantation;
            case 2: return twoTransplantation;
            case 3: return threeTransplantation;
        }
    }

    const  onPaginationClick = () => {
        if (tickets) {
            if (itemsAmount < tickets?.length) {
                setItemsAmount(prevState => prevState + 5);
            } else setItemsAmount(tickets?.length)
        }
    }

    const renderContent = () => {
        //nothing selected
        if (!all && !WithoutTransplantation && !oneTransplantation && !twoTransplantation && !threeTransplantation && !loading && !error)
            return <MessageCard message={"Билетов нет"}/>
        else if (error)//fetch error
            return <MessageCard
                withAction
                buttonText={"Обновить"}
                action={getFlights}
                message={"Произошла ошибка"}/>
        else if (loading)//preloader
            return (
                <LoaderContainer>
                    <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
                </LoaderContainer>
            )
            //flights
        else {
            //this part need optimisation but I have limited time
            let renderData = tickets?.slice(0, itemsAmount);
            let list = renderData
                ?.reverse()
                .sort((a: Ticket, b: Ticket): number => filterBySelectedButton(a, b) as number)
                .filter((item: Ticket) => flightsFilter(item))
                .map((item: Ticket, index: number) => <PassItem key={index} item={item} />)
            return (
                <>
                    {list}
                    <PaginationContainer>
                        <PaginationButton className={itemsAmount !== tickets?.length && list?.length ? "" : "block"} onClick={onPaginationClick}>Показать еще 5 билетов!</PaginationButton>
                    </PaginationContainer>
                </>
            )
        }
    }

    return (
        <TicketsListWrapper>
            {renderContent()}
        </TicketsListWrapper>
    )
};

export default PassList;
