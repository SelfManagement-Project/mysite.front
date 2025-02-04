import { BrowserRouter } from 'react-router-dom';
import { Router } from './common/router';
import Header from './web/components/common/Header';
import Footer from './web/components/common/Footer';
import { Platform } from 'react-native';
import '@/common/assets/styles/main.scss';  // 바로 import
import './App.css';

// Conditionally import SCSS for web
// if (Platform.OS === 'web') {
//   import('@/common/assets/styles/main.scss');
// }

function App() {
  const isWeb = Platform.OS === 'web';

  return (
    <BrowserRouter>
      <div className={isWeb ? 'App web' : 'App mobile'}>
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
