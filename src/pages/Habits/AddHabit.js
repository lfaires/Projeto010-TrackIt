import { useContext, useState, useEffect } from 'react'
import UserContext from '../../contexts/UserContext';
import CountContext from '../../contexts/CountContext';
import axios from 'axios'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'

export default function AddHabit({setAddHabit, days, setDays, habitTitle, setHabitTitle, cancel, setCancel}) {
    const { user } = useContext(UserContext)
    const { count, setCount } = useContext(CountContext)
    const [isDisabled, setIsDisabled] = useState(false);
    const [weekdays, setWeekdays] = useState([
        { id: 1, name: "D", days: 0, isSelected: false},
        { id: 2, name: "S", days: 1, isSelected: false},
        { id: 3, name: "T", days: 2, isSelected: false},
        { id: 4, name: "Q", days: 3, isSelected: false},
        { id: 5, name: "Q", days: 4, isSelected: false},
        { id: 6, name: "S", days: 5, isSelected: false},
        { id: 7, name: "S", days: 6, isSelected: false}
    ])

    console.log("teste",cancel)
    useEffect(() => {
        if (cancel !== null){
        cancel.forEach(id => selectDay(id))
    }},[cancel])

    function selectDay(dayId) {
        const newWeekdays = weekdays.map( week => {
            if(week.id === dayId){
                week.isSelected = !week.isSelected;
            }
            return week
        })
        setWeekdays(newWeekdays)
        const selectedDaysID = newWeekdays.filter( item => item.isSelected).map( item => item.days)
        setDays(selectedDaysID)
    }

    function saveHabit() {
        setIsDisabled(true)
        const body = {name: habitTitle, days}
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }

        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config)

        request.then( (response) => {
            setIsDisabled(false)
            setAddHabit(false)
            setCount(count+1)
            setCancel(null)
            setHabitTitle("")
        })

        request.catch( () => {
            alert("O hábito não foi salvo, tente novamente!")
            setIsDisabled(false)
        })
    }

    function cancelHabit() {
        setAddHabit(false)
        const cancelTitle = habitTitle
        if (days !== null){
            const dayToId = days.map(day => day+1)
            setCancel(dayToId)
        }
        setHabitTitle(cancelTitle)
    }

    return (
        <Item>
            <Input type="text" placeholder="nome do hábito" onChange={ e => setHabitTitle(e.target.value)} disabled={isDisabled} value={habitTitle}></Input>
            <Weekdays>
                { weekdays.map( day => 
                <DayButton key={day.id} disabled={isDisabled} selected={day.isSelected} onClick={() => selectDay(day.id)}>{day.name}</DayButton>)}
            </Weekdays>
            <Buttons>
                <Cancel disabled={isDisabled} onClick={cancelHabit}>Cancelar</Cancel>
                <Save onClick={saveHabit} disabled={isDisabled}>{ !isDisabled ? "Salvar" : <Loader type="ThreeDots" color="#FFF" height={10}/>}</Save>
            </Buttons>
        </Item>
    )
    }

const Item = styled.div`
    width: 90.7vw;
    height: 180px;
    background: #FFF;
    border-radius: 5px;
    padding: 18px 18px 15px 18px;
    margin-bottom: 28px;
`
const Input = styled.input`
    width: 100%;
    height: 45px;
    margin-bottom: 10px;
    border: 1px solid #D4D4D4;
    border-radius: 5px;
    padding: 10px;
    & ::placeholder {
        font-size: 20px;
        color: #DBDBDB;
    }
`
const Weekdays = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`
const DayButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #D4D4D4;
    margin-right: 4px;
    font-size: 20px;
    color: ${props => props.selected ? "#FFF" : "#DBDBDB"};
    background: ${props => props.selected ? "#CFCFCF" : "#FFF"};
`
const Cancel = styled.button`
    height: 35px;
    width:84px;
    color: #52B6FF;
    font-size: 16px;
    border-radius: 5px;
    margin-right: 23px;
`
const Save = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    width:84px;
    background: #52B6FF;
    color: #FFF;
    font-size: 16px;
    border-radius: 5px;
`
const Buttons = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-top: 28px;
`