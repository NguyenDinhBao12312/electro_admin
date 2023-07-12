import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/home';
import Header from './header';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogAdmin />} />
      </div>
    </Router>
  );
}

export default App;
