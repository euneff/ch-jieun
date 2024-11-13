import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import styles from './App.module.css';
import MyPage from "./pages/MyPage";
import PointHistory from "./pages/PointHistory";
import PointExchange from "./pages/PointExchange";
import PointRecharge from "./pages/PointRecharge";
import PrivateRoute from "./components/PrivateRoute";
import FreeBoard from "./pages/FreeBoard";
import PostDetail from "./pages/PostDetail";
import WritePost from "./pages/WritePost";
import EditPost from "./pages/EditPost";
import CoursesPage from "./pages/CoursesPage";
import CourseDetail from "./pages/CourseDetail";
import CreateCoursePage from "./pages/CreateCoursePage";
import MyChallenge from "./pages/MyChallenge";
import CompletedChallenges from "./pages/CompletedChallenges";
import InfoEdit from "./pages/InfoEdit";
import HelpCenter from "./pages/HelpCenter";
import HelpPost from "./pages/HelpPost";
import Review from "./pages/Review";


function App() {
    const [userName, setUserName] = useState(() => JSON.parse(localStorage.getItem('user'))?.name || '');
    const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("isLoggedIn") === "true");
    const [parsed, setParsed] = useState(() => JSON.parse(localStorage.getItem('user')));
    const [courses, setCourses] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/course');
                setCourses(response.data);
            } catch (error) {
                console.error("Error fetching courses data:", error);
            }
        };

        fetchCourses();
    }, []);

    const handleLogin = (user) => {
        setIsLoggedIn(true);
        setUserName(user.name);
        setParsed(user);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(user));
    };

    const handleLogout = (showAlert = true) => {
        setIsLoggedIn(false);
        setUserName('');
        setParsed(null);
        localStorage.clear();
        if (showAlert) {
            alert("로그아웃되었습니다.");
        }
    };

    return (
        <>
            <Nav className={styles.nav} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            <div className={styles.body}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/course" element={<CoursesPage courses={courses} />} />
                    <Route path="/course/:courseId" element={<CourseDetail />} />
                    <Route path="/create-course" element={<CreateCoursePage />} />
                    <Route path="/my-challenge" element={<MyChallenge />} />
                    <Route path="/review" element={<Review />} />
                    
                    
                    {/* 보호된 라우트 설정 */}
                    <Route path="/freeboard" element={<PrivateRoute isLoggedIn={isLoggedIn}><FreeBoard /></PrivateRoute>} />
                    <Route path="/write" element={<PrivateRoute isLoggedIn={isLoggedIn}><WritePost userName={userName} /></PrivateRoute>} />
                    <Route path="/post/:id" element={<PrivateRoute isLoggedIn={isLoggedIn}><PostDetail userName={userName} /></PrivateRoute>} />
                    <Route path="/edit/:id" element={<PrivateRoute isLoggedIn={isLoggedIn}><EditPost /></PrivateRoute>} />
                   
                    {/* 마이페이지와 관련된 보호된 경로 */}
                    <Route path="/mypage" element={<PrivateRoute isLoggedIn={isLoggedIn}><MyPage parsed={parsed} onLogout={() => handleLogout(false)} /></PrivateRoute>}>
                        <Route path="pointhistory" element={<PointHistory />} />
                        <Route path="pointexchange" element={<PointExchange />} />
                        <Route path="pointrecharge" element={<PointRecharge />} />
                        <Route path="infoEdit" element={<InfoEdit />}/>
                        <Route path="helpCenter" element={<HelpCenter />} />
                        <Route path="helpPost" element={<HelpPost />} />
                    </Route>

                    {/* 종료된 도전 페이지 라우트 추가 */}
                    <Route path="/completedchallenges" element={<PrivateRoute isLoggedIn={isLoggedIn}><CompletedChallenges /></PrivateRoute>} />
                </Routes>
            </div>

            {/* 메인 페이지에서만 Footer 표시 */}
            {location.pathname === '/' && <Footer className={styles.footer} />}
        </>
    );
}

function Root() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}

export default Root;