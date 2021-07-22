import React from 'react';
import styled from "styled-components";
import {Segment} from "../store/types/flights";

const TicketItem = styled.div`
    margin-top: 0;
    padding: 15px;
    background: #FFFFFF;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    width: 470px;
    border-radius: 5px;
  
    &:not(:first-child) {
      margin-top: 24px;
    }
`

const ItemLabel = styled.span`
    font-weight: 600;
    font-size: 24px;
    line-height: 24px;
    color: #2196F3;
  
`
const HeaderText = styled.h1`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const TicketImgWrapper = styled.img`
    width: 110px;
    height: 36px;
`

const InfoColumn = styled.div`
    display: flex;
    flex-direction: column;
`
const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    padding-right: 50px;
    margin-top: 10px;
`

const InfoText = styled.span`
    color:#A0B0B9;
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
    text-transform: uppercase;
`

const TimeText = styled.span`
    margin-top: 4px;
    color:#4A4A4A;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
`

const PassItem = (props: any) => {

    const getTimeForFlight = (a: number) => {
        let num = a;
        let hours = (num / 60);
        let rhours = Math.floor(hours);
        let minutes = (hours - rhours) * 60;
        let rminutes = Math.round(minutes);
        return rhours + "ч " + rminutes + "м";
    };

    const getTransferAmount = (segment: Segment) => {
        if (!segment.stops.length) {
            return 'Без пересадок'
        } else if (segment.stops.length === 1) {
            return  '1 пересадка'
        } else if (segment.stops.length > 1) {
            return `${segment.stops.length} пересадки`
        }
    };

    const getDepartArrivalTime = (props: any, segment: number) => {
        const timeDepart = new Date(props.item.segments[0].date).toLocaleTimeString([], {
            hour: '2-digit',
            minute:'2-digit',
            hour12: false
        });

        let timeArrive = new Date(props.item.segments[segment].date);
        timeArrive.setMinutes( timeArrive.getMinutes() + props.item.segments[segment].duration );

        return `${timeDepart} - ${timeArrive.toLocaleTimeString([], {
            hour: '2-digit',
            minute:'2-digit',
            hour12: false
        })}`
    };

    return (
        <TicketItem>
            <HeaderText>
                <ItemLabel>{props.item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Р</ItemLabel>
                <TicketImgWrapper src={`http://pics.avs.io/99/36/${props.item.carrier}.png`}/>
            </HeaderText>
            <InfoRow>
                <InfoColumn>
                    <InfoText>{props.item.segments[0].origin} - {props.item.segments[0].destination}</InfoText>
                    <TimeText>{getDepartArrivalTime(props, 0)}</TimeText>
                </InfoColumn>
                <InfoColumn>
                    <InfoText>В пути</InfoText>
                    <TimeText>{getTimeForFlight(props.item.segments[0].duration)}</TimeText>
                </InfoColumn>
                <InfoColumn>
                    <InfoText>{getTransferAmount(props?.item.segments[0])}</InfoText>
                    <TimeText>{props?.item.segments[0].stops.join(', ')}</TimeText>
                </InfoColumn>
            </InfoRow>
            <InfoRow>
                <InfoColumn>
                    <InfoText>{props.item.segments[1].origin} - {props.item.segments[1].destination}</InfoText>
                    <TimeText>
                        {getDepartArrivalTime(props, 1)}
                    </TimeText>
                </InfoColumn>
                <InfoColumn>
                    <InfoText>В пути</InfoText>
                    <TimeText>
                        {getTimeForFlight(props.item.segments[1].duration)}
                    </TimeText>
                </InfoColumn>
                <InfoColumn>
                    <InfoText>{getTransferAmount(props?.item.segments[1])}</InfoText>
                    <TimeText>{props?.item.segments[1].stops.join(', ')}</TimeText>
                </InfoColumn>
            </InfoRow>
        </TicketItem>
    );
};

export default PassItem;