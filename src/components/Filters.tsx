import React, {useState} from 'react';
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {SET_CHECKBOX_FILTER} from "../store/types/flights";

const FilterLabel = styled.p`
  text-transform: uppercase;
  color: #4A4A4A;
  font-size: 12px;
  line-height: 12px;
  font-weight: 600;
`

const CheckboxItem = styled.span`
  font-size: 13px;
  color: #4A4A4A;
`

const CheckboxList = styled.div`
  padding: 20px;
  background: #FFFFFF;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  min-width: 232px;
  max-height: 300px;
  .container {
    padding: 10px 10px 10px 35px;
    display: block;
    position: relative;
    margin-bottom: 20px;
    cursor: pointer;
    &:hover {
      background-color: #F3F7FA;
    }
  }

  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }


  .checkmark {
    position: absolute;
    top: 8px;
    left: 0;
    height: 20px;
    width: 20px;
    border: #ccc 1px solid;
    border-radius: 3px;
  }

  .container input:checked ~ .checkmark {
    border: #2196F3 1px solid;
  }

  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  .container input:checked ~ .checkmark:after {
    display: block;
  }

  .container .checkmark:after {
    left: 6px;
    top: 3px;
    width: 5px;
    height: 10px;
    border: solid #2196F3;
    border-width: 0 1px 1px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`

const Filters = () => {
    const [isChecked, setIsChecked] = useState({
        all: true,
        WithoutTransplantation: false,
        oneTransplantation: false,
        twoTransplantation: false,
        threeTransplantation: false
    });

    const dispatch = useDispatch()

    const {
        all,
        WithoutTransplantation,
        oneTransplantation,
        twoTransplantation,
        threeTransplantation
    } = isChecked

    const handleInputChange =(event:any) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const payload = {...isChecked,[name]: value }

        setIsChecked(payload)
        dispatch({type: SET_CHECKBOX_FILTER, payload })
    }

    return (
        <CheckboxList>
            <FilterLabel>
                Количество пересадок
            </FilterLabel>
            <label className="container">
                <input name='all'
                       type="checkbox"
                       onChange={event =>handleInputChange(event)}
                       checked={all}
                />
                <span className="checkmark"/>
                <CheckboxItem>
                    Все
                </CheckboxItem>
            </label>
            <label className="container">
                <input name='WithoutTransplantation'
                       type="checkbox"
                       onChange={event =>handleInputChange(event)}
                       checked={WithoutTransplantation}
                />
                <span className="checkmark"/>
                <CheckboxItem>
                    Без пересадок
                </CheckboxItem>

            </label>
            <label className="container">
                <input name='oneTransplantation'
                       type="checkbox"
                       onChange={event =>handleInputChange(event)}
                       checked={oneTransplantation}
                />
                <span className="checkmark"/>
                <CheckboxItem>
                    1 пересадка
                </CheckboxItem>

            </label>
            <label className="container">
                <input name='twoTransplantation'
                       type="checkbox"
                       onChange={event =>handleInputChange(event)}
                       checked={twoTransplantation}
                />
                <span className="checkmark"/>
                <CheckboxItem>
                    2 пересадки
                </CheckboxItem>
            </label>
            <label className="container">
                <input name='threeTransplantation'
                       type="checkbox"
                       onChange={event =>handleInputChange(event)}
                       checked={threeTransplantation}
                />
                <span className="checkmark"/>
                <CheckboxItem>
                    3 пересадки
                </CheckboxItem>
            </label>
        </CheckboxList>
    );
};

export default Filters;
