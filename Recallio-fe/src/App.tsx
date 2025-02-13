import { Button } from "./components/ui/button";
import { PlusIcon } from "./assets/icons/plusIcon";
import { ShareIcon } from "./assets/icons/shareIcon";
import { Card } from "./components/ui/card";
import { Modal } from "./components/ui/modal";
import { useState } from "react";
import { Sidebar } from "./components/ui/sidebar";

function App() {
  return (
    <div>
      <Sidebar />
      {/* <div className="p-4">
        <Modal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
        <div className="flex justify-end gap-4">
          <Button
            onClick={() => {
              setModalOpen(true);
            }}
            variant="primary"
            text="Add New"
            startIcon={<PlusIcon />}
          />
          <Button
            variant="secondary"
            text="Share All"
            startIcon={<ShareIcon />}
          />
        </div>
        <div className="flex gap-4">
          <Card
            type="youtube"
            title="Amazing Video Title"
            link="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          />

          <Card
            type="twitter"
            title="Interesting Tweet"
            link="https://x.com/sargampoudel/status/1889659947727589831"
          />
          <Card
            type="twitter"
            title="Interesting Tweet"
            link="https://x.com/DearS_o_n/status/1883387324136071662"
          />
        </div>
      </div> */}
    </div>
  );
}

export default App;
