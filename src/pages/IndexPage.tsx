import React from 'react';
import { Link } from 'react-router-dom';

function IndexPage() {
  return (
    <div><Link to="/dashboard">서비스 이용하기</Link></div>    
  );
}

export default IndexPage;