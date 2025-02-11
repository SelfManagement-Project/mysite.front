import "@/assets/styles/components/finance/FinancePage.scss";

const FinancePage = () => {
 return (
   <div className="finance-container">
     <div className="header">
       <h2>재무 관리</h2>
       <div className="header-buttons">
         <button>기간 선택</button>
         <button>설정</button>
       </div>
     </div>

     <div className="overview-section">
       <div className="box income-expense">
         <h3>수입/지출 현황</h3>
         <div className="chart-area">
           월간 수입/지출 그래프 차트
         </div>
         <ul className="stats">
           <li>수입: 3,000,000원</li>
           <li>지출: 2,000,000원</li>
           <li>잔액: 1,000,000원</li>
         </ul>
       </div>

       <div className="box category">
         <h3>카테고리별 지출 분석</h3>
         <div className="chart-area">
           카테고리별 도넛/파이 차트
         </div>
         <ul className="stats">
           <li>식비: 600,000원 (30%)</li>
           <li>교통비: 400,000원 (20%)</li>
           <li>생활비: 1,000,000원 (50%)</li>
         </ul>
       </div>
     </div>

     <div className="prediction-section">
       <div className="box prediction">
         <h3>예산 현황</h3>
         <div className="stat-row">
           <span>총 예산: 2,500,000원</span>
           <div className="progress-bar">
             <div className="progress" style={{ width: '87%' }}></div>
           </div>
           <span>87%</span>
         </div>
         <div className="stat-row">
           <span>남은 예산: 500,000원</span>
         </div>
       </div>

       <div className="box budget">
         <h3>수입/지출 현황</h3>
         <div className="stat-row">
           <span>목표: 연말저금 1,000만원</span>
           <div className="progress-bar">
             <div className="progress" style={{ width: '91%' }}></div>
           </div>
           <span>91%</span>
         </div>
         <div className="stat-row">
           <span>현재: 5,000,000원 (50%)</span>
         </div>
       </div>
     </div>

     <div className="transactions-section">
       <div className="header-row">
         <h3>최근 거래 내역</h3>
         <button>거래 내역 더보기</button>
       </div>
       <table>
         <thead>
           <tr>
             <th>날짜</th>
             <th>구분</th>
             <th>카테고리</th>
             <th>금액</th>
             <th>내용</th>
           </tr>
         </thead>
         <tbody>
           <tr>
             <td>02/01</td>
             <td>지출</td>
             <td>식비</td>
             <td>-30,000원</td>
             <td>점심식사</td>
           </tr>
           <tr>
             <td>02/01</td>
             <td>수입</td>
             <td>급여</td>
             <td>+3,000,000원</td>
             <td>월급</td>
           </tr>
         </tbody>
       </table>
     </div>

     <div className="action-buttons">
       <button>거래 추가</button>
       <button>예산 설정</button>
       <button>저축 목표 설정</button>
       <button>리포트 보기</button>
       <button>지출분석</button>
     </div>
   </div>
 );
};

export default FinancePage;