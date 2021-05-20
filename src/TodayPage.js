import axios from 'axios'
import dayjs from 'dayjs'
import { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import UserContext from './contexts/UserContext';
import Header from './Header'
import Menu from './Menu'
import HabitItem from './HabitItem'

export default function TodayPage() {
    const { user } = useContext(UserContext)
    const [habits, setHabits] = useState([])
    const [countHabit, setCountHabit] = useState(0)
    const now = dayjs()
    const daysOfweek = [
        { id:0, name: "Domingo" },
        { id:1, name: "Segunda" },
        { id:2, name: "Terça" },
        { id:3, name: "Quarta" },
        { id:4, name: "Quinta" },
        { id:5, name: "Sexta" },
        { id:6, name: "Sábado" },
    ]
   
    function weekday() {
        const dayOfWeek = daysOfweek.filter( item => item.id === now.day())
        return dayOfWeek[0].name
    }

    function PercentHabit(){
        const percent = (countHabit/habits.length)
        const newPercent = (100*percent).toFixed(0)
        return newPercent
    }
   
    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }

        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)

        request.then( response => setHabits(response.data))
        request.catch(()=>alert("tenta novamente!"))
    }
        ,[])

    return (
        <>
        <Header />
        <Container>
            <Heading>
                <Title>{weekday()}, {now.format("DD/MM")}</Title>
                {(countHabit !== 0) ? <Tracker selected>{PercentHabit()}% dos hábitos concluídos</Tracker> :<Tracker>Nenhum hábito concluído ainda</Tracker>}
            </Heading>
            { habits.map( habit => <HabitItem key={habit.id} habit={habit} setCount={setCountHabit} count={countHabit} />)}
        </Container>
        <Menu/>
        </>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 70px 0px;
    padding: 28px 18px 0 18px;
    background: #F2F2F2;
`
const Heading = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 28px;
`

const Title = styled.span`
    font-size: 23px;
    color: #126BA5;
`

const Tracker = styled.span`
    margin-top: 5px;
    font-size: 18px;
    color: ${props => props.selected ? "#8FC549" :"#BABABA"};
`