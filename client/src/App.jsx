import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Lazy-load all pages so the initial bundle stays small
const Feed          = lazy(() => import('./components/builds/precis-feed-v8.jsx'));
const Compose       = lazy(() => import('./components/builds/precis-compose-v6.jsx'));
const ThePress      = lazy(() => import('./components/builds/precis-press.jsx'));
const Explore       = lazy(() => import('./components/nav/precis-explore.jsx'));
const Compass       = lazy(() => import('./components/nav/precis-synopsis-engine.jsx'));
const Shelf         = lazy(() => import('./components/nav/precis-shelf.jsx'));
const Notifications = lazy(() => import('./components/nav/precis-notifications.jsx'));
const Community     = lazy(() => import('./components/nav/precis-book-community-v4.jsx'));
const BookClubs     = lazy(() => import('./components/nav/precis-book-clubs.jsx'));
const Challenges    = lazy(() => import('./components/nav/precis-challenges.jsx'));
const Messages      = lazy(() => import('./components/nav/precis-messages.jsx'));
const Mentions      = lazy(() => import('./components/nav/precis-mentions.jsx'));
const AuthorProfile = lazy(() => import('./components/nav/precis-author.jsx'));
const BookDetail    = lazy(() => import('./components/nav/precis-book-detail.jsx'));
const Settings      = lazy(() => import('./components/nav/precis-settings.jsx'));
const Profile       = lazy(() => import('./components/nav/precis-profile-v11.jsx'));

function PageLoader() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '60vh', fontFamily: "'DM Sans', system-ui, sans-serif",
      color: 'rgba(232,226,214,0.4)', fontSize: 13,
    }}>
      Loading…
    </div>
  );
}

function NotFound() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: '60vh', gap: 12,
      fontFamily: "'DM Sans', system-ui, sans-serif", color: '#E8E2D6',
    }}>
      <div style={{ fontSize: 48, opacity: 0.3 }}>◎</div>
      <div style={{ fontSize: 16, opacity: 0.6 }}>Page not found</div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Default: redirect root to feed */}
          <Route path="/" element={<Navigate to="/feed" replace />} />

          {/* Main platform routes */}
          <Route path="/feed"          element={<Feed />} />
          <Route path="/explore"       element={<Explore />} />
          <Route path="/press"         element={<ThePress />} />
          <Route path="/compass"       element={<Compass />} />
          <Route path="/shelf"         element={<Shelf />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/compose"       element={<Compose />} />
          <Route path="/community"     element={<Community />} />
          <Route path="/clubs"         element={<BookClubs />} />
          <Route path="/challenges"    element={<Challenges />} />
          <Route path="/messages"      element={<Messages />} />
          <Route path="/mentions"      element={<Mentions />} />
          <Route path="/author"        element={<AuthorProfile />} />
          <Route path="/book"          element={<BookDetail />} />
          <Route path="/settings"      element={<Settings />} />
          <Route path="/profile"       element={<Profile />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}
