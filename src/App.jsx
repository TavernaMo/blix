import React, { memo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Playlist from "./modules/playlist/playlist";
import Record from "./modules/record/record";
import AlbumList from "./modules/albumList/albumList";
import { Provider } from "react-redux";
import store from "./redux/redux-store";

const AppContent = () => {
  return (
    <div style={{ background: "#101729" }}>
      <Routes>
        <Route path="/" element={<AlbumList />} />
        <Route path="/AlbumList" element={<AlbumList />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/record" element={<Record />} />
      </Routes>
    </div>
  );
};

const App = memo(() => (
  <Provider store={store}>
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  </Provider>
));

export default App;
