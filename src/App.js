import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { useState } from 'react'
import GlobalStyle from './globalStyles'
import UserContext from './contexts/UserContext';
import ProgressContext from './contexts/ProgressContext';
import LoginPage from './LoginPage'
import SignUpPage from './SignUpPage'
import TodayPage from './TodayPage'
import HabitsPage from './HabitsPage'
import HistoryPage from './HistoryPage'

export default function App() {
    const [user, setUser] = useState("")
    const [progress, setProgress] = useState(0)

    return(
       <BrowserRouter>
            <GlobalStyle/>
            <UserContext.Provider value={{user, setUser}}>
                <Switch>
                    <Route path="/" exact={true}>
                        <LoginPage setUser={setUser}/>
                    </Route>
                    <Route path="/cadastro" exact={true}>
                        <SignUpPage />
                    </Route>
                    <ProgressContext.Provider value={{progress, setProgress}}>
                    <Route path="/hoje" exact={true}>
                        <TodayPage />
                    </Route>
                    <Route path="/habitos" exact={true}>
                        <HabitsPage />
                    </Route>
                    <Route path="/historico" exact={true}>
                        <HistoryPage />
                    </Route>
                    </ProgressContext.Provider>
                </Switch>
            </UserContext.Provider>
       </BrowserRouter>
    )
}