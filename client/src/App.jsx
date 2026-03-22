import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PrecisProvider } from './store.jsx';
import GlobalStyles from './components/GlobalStyles.jsx';
import Nav from './components/Nav.jsx';

import Feed from './pages/Feed.jsx';
import Explore from './pages/Explore.jsx';
import Compose from './pages/Compose.jsx';
import Press from './pages/Press.jsx';
import Profile from './pages/Profile.jsx';
import Shelf from './pages/Shelf.jsx';
import Notifications from './pages/Notifications.jsx';
import Messages from './pages/Messages.jsx';
import Challenges from './pages/Challenges.jsx';
import Clubs from './pages/Clubs.jsx';
import Settings from './pages/Settings.jsx';
import BookDetail from './pages/BookDetail.jsx';

export default function App() {
  return (
    <PrecisProvider>
      <AppInner />
    </PrecisProvider>
  );
}

function AppInner() {
  return (
    <HashRouter>
      <GlobalStyles />
      <Nav />
      <main style={{ paddingTop: 56, paddingBottom: 72 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/feed" replace />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/compose" element={<Compose />} />
          <Route path="/press" element={<Press />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/shelf" element={<Shelf />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/book" element={<BookDetail />} />
          <Route path="/compass" element={<Challenges />} />
          <Route path="*" element={<Navigate to="/feed" replace />} />
        </Routes>
      </main>
    </HashRouter>
  );
}
