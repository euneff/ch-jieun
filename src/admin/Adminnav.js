import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import styles from '../components/Nav.module.css';

function getLinkStyle({ isActive }) {
    return {
        textDecoration: isActive ? 'underline' : '',
    };
}

function Adminnav({ isLoggedIn, onLogout }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isCategoryOpen, setCategoryOpen] = useState(false);
    const [isCommunityOpen, setCommunityOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const toggleCategory = () => {
        setCategoryOpen(!isCategoryOpen);
        if (isCommunityOpen) setCommunityOpen(false); // 하나의 메뉴만 열리도록
    };

    const toggleCommunity = () => {
        setCommunityOpen(!isCommunityOpen);
        if (isCategoryOpen) setCategoryOpen(false); // 하나의 메뉴만 열리도록
    };

    return (
        <div className={styles.nav}>
            <button className={styles.sidebarToggle} onClick={toggleSidebar}>
                메뉴
            </button>
                
            <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
                <button className={styles.closeButton} onClick={toggleSidebar}>X</button>
                <ul className={styles.sidebarMenu}>
                    <li className={styles.sectionHeader} onClick={toggleCategory}>
                        질문답변 대기
                    </li>
                    <li className={styles.sectionHeader} onClick={toggleCommunity}>
                        포인트
                    </li>
                    <li className={styles.sectionHeader} onClick={toggleCommunity}>
                        챌린지 인증
                    </li>
                    
                </ul>
            </div>
        </div>
    );
}

export default Adminnav;