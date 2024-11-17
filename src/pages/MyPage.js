import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./MyPage.css";
import {useNavigate } from 'react-router-dom';

function Mypage() {
  const location = useLocation();
  const navigate = useNavigate();

  const isSubRoute = location.pathname !== "/mypage";

  if (isSubRoute) {
    return <Outlet />;
  }

  return (
    <div className="mypage">
        <h1 className="my"> MYPAGE </h1>
      {/* 상단 환영 메시지 */}
      <div className="welcome-message">
        <p>
          challenger를 이용해주셔서 감사합니다.
          <br />
          
          <br/>
          할 수 있다고 믿는 순간, 도전은 시작됩니다.
        </p>
        <p>도전 내역 [1]개</p>
      </div>

      {/* 포인트 요약 */}
      <div className="points-summary">
        <div className="pi">
            <div className="point-item">
            <p>획득한 point</p>
            <p>1,000원</p>
            </div>
            <div className="point-item">
            <p>환전한 point</p>
            <p>0원</p>
            </div>
        </div>
        <div className="buttons">
            <button className="pointbutton" onClick={() => navigate('/mypage/pointrecharge')}>point 충전하기</button>
            <button onClick={() => navigate('/mypage/pointexchange')}>point 환전하기</button>
        </div>
      </div>

      {/* 메인 레이아웃 */}
      <div className="main-layout">
        {/* 왼쪽: 나의 도전 현황 */}
        <div className="order-status">
          <h3>나의 도전 처리 현황</h3>
          <ul>
            <li>최근 본 도전</li>
            <li>찜 한 도전</li>
            <li>현재 진행 중인 도전</li>
            <li>성공한 도전</li>
          </ul>
          <p>- 진행중: 0 | 성공: 0 | 경험: 0</p>
        </div>

        {/* 오른쪽: 메뉴 링크 */}
        <div className="menu-links">
          <div className="menu-item" onClick={() => navigate('/my-challenge')}>
            <h4>ORDER</h4>
            <p>신청하신 도전 내역을 확인하실 수 있습니다.</p>
          </div>
          <div className="menu-item"  onClick={() => navigate('/mypage/infoedit')}>
            <h4>PROFILE</h4>
            <p>도전자님의 개인정보를 관리하는 공간입니다.</p>
          </div>
          <div className="menu-item">
            <h4>WISHLIST</h4>
            <p>관심도전으로 등록하신 도전 목록을 보여드립니다.</p>
          </div>
          <div className="menu-item" onClick={() => navigate('/mypage/pointhistory')}>
            <h4>POINT</h4>
            <p>포인트 내역을 확인하실 수 있습니다.</p>
          </div>
          <div className="menu-item">
            <h4>BOARD</h4>
            <p>도전자님께서 작성하신 게시물을 관리하실 수 있습니다.</p>
          </div>
          <div className="menu-item">
            <h4>ADDRESS</h4>
            <p>배송지를 등록하고 관리하실 수 있습니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypage;