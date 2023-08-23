import './App.css';
import { ConfigProvider, theme } from "antd";
import trTR from "antd/locale/tr_TR";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import User from "./pages/User";
import Role from "./pages/Role";
import Flow from "./pages/Flow";
import Permission from "./pages/Permission";
import Task from "./pages/Task";
import MainLayout from './components/MainLayout';

function App() {
  return (
    <ConfigProvider locale={trTR} theme={{ algorithm: theme.defaultAlgorithm }}>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path='/' element={<User />} />
            <Route path='/user' element={<User />} />
            <Route path='/role' element={<Role />} />
            <Route path='/flow' element={<Flow />} />
            <Route path='/task' element={<Task />} />
            <Route path='/permission' element={<Permission />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
