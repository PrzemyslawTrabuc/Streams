import React from 'react';
import {Route, Routes, unstable_HistoryRouter as HistoryRouter, BrowserRouter} from "react-router-dom";
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit'
import StreamDelete from './streams/StreamDelete'
import StreamList from './streams/StreamList'
import StreamShow from './streams/StreamShow'
import Header from "./Header";
import history from '../history';
import '../style/App.css'
//import '../dist/output.css'
//1030502307448-nmhaj2n273ahcd1ededol73i83arfotc.apps.googleusercontent.com


const App = () =>{
    return (
        <div className="ui container">
        <HistoryRouter history={history}>
            <Header />
            <Routes>
                <Route path='/' element={<StreamList />}></Route>
                <Route path="/streams/new" element={<StreamCreate />}></Route>
                <Route path="/streams/edit/:id" element={<StreamEdit />}></Route>
                <Route path="/streams/delete/:id" element={<StreamDelete />}></Route>
                <Route path="/streams/:id" element={<StreamShow />}></Route>
            </Routes>
        </HistoryRouter>
        </div>
    )
}

export default App;