

import { useParams } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import Chat from "../components/Chat";
import "../room.css";
import VoiceChat from "../components/VoiceChat";



export default function Room() {

  const { id } = useParams();

  if (!id) {
    return <div>Invalid Room</div>;
  }

  const shareLink =
    `${window.location.origin}/room/${id}`;

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink);
    alert("Room link copied!");
  };

  return (
    <div className="room-page">

      {/* ========================= */}
      {/* TOP BAR */}
      {/* ========================= */}

    
<div className="top-bar">

  <h2
    className="room-logo"
    onClick={() => window.location.href = "/"}
  >
   Wave
  </h2>

 <div className="top-actions">

  

  <input
    value={shareLink}
    readOnly
  />

  {/* <button onClick={copyLink}>
    Share
  </button> */}

  <button className="share-btn" onClick={copyLink}>
  
  Share
</button>

</div>






</div>


      {/* ========================= */}
      {/* VIDEO SECTION */}
      {/* ========================= */}

      <div className="video-section">

        <div className="video-box">

          <VideoPlayer roomId={id} />

        </div>

      </div>


      {/* ========================= */}
      {/* CHAT SECTION */}
      {/* ========================= */}

      <div className="chat-wrapper">

        <Chat roomId={id} />
        

      </div>
      

    </div>
  );
}