import './App.css';
import Header from './components/common/Topbar/Topbar';
import Home from './modules/Home/Home';

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Home />
      </div>
    </>
  );
}

export default App;
