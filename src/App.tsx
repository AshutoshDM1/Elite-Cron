import './App.css';
import Header from './components/common/Topbar/Topbar';
import Home from './modules/Home/Home';
import UsernameDialog from './components/common/UsernameDialog';
import { useUsername } from './hooks/use-username';
import { useState } from 'react';

function App() {
  const { username, saveUsername } = useUsername();
  const [showDialog, setShowDialog] = useState(false);

  const handleUsernameSet = (newUsername: string) => {
    saveUsername(newUsername);
    setShowDialog(false);
  };

  const requestUsername = () => {
    setShowDialog(true);
  };

  return (
    <>
      <UsernameDialog open={showDialog} onUsernameSet={handleUsernameSet} />
      <div className="flex flex-col min-h-screen animate-in fade-in duration-200">
        <Header username={username} onRequestUsername={requestUsername} />
        <Home onRequestUsername={requestUsername} />
      </div>
    </>
  );
}

export default App;
