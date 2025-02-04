import { BrowserRouter } from 'react-router-dom';
import { Router } from '@/router';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import '@/assets/styles/index.scss';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="content">
          <Router />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;