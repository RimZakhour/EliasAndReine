"use client";

import Head from "next/head";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const startBtnRef = useRef<HTMLButtonElement>(null);
  const heartContainerRef = useRef<HTMLDivElement>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videos = ["/assets/background-video1.mp4"];
  // let lastIndex = -1;
 // Countdown state
 const [timeLeft, setTimeLeft] = useState({
  days: 0, hours: 0, minutes: 0, seconds: 0
});

  // Synchronize the video's mute state.
  useEffect(() => {
    const target = new Date("2025-08-24T00:00:00");
    const tick = () => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      if (diff <= 0) {
        clearInterval(id);
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    };
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
   
  }, [isMuted]);

  useEffect(() => {
    // let debounceTimer: number;
    const handleStart = () => {
      // 1) scroll back to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
  
      // 2) reveal content & play video
      setIsStarted(true);
      if (videoRef.current) {
        videoRef.current.src = videos[0];
        videoRef.current
          .play()
          .catch((err) => console.error("Video play failed:", err));
      }
    };

    startBtnRef.current?.addEventListener("click", handleStart);

    // const handleScroll = () => {
    //   // 2) Clear the previous timer
    //   clearTimeout(debounceTimer);
  
    //   // 3) Schedule a new one
    //   debounceTimer = window.setTimeout(() => {
    //     if (videoRef.current) {
    //       const scrollY = window.scrollY;
    //       const sectionIndex = Math.floor(scrollY / window.innerHeight);
    //       const safeIndex = Math.min(sectionIndex, videos.length - 1);
    //       if (safeIndex !== lastIndex) {
    //         videoRef.current.pause();
    //         videoRef.current.src = videos[safeIndex];
    //         videoRef.current.load();
    //         videoRef.current.oncanplay = () =>
    //           videoRef.current
    //             ?.play()
    //             .catch((err) => console.error("Video play error:", err));
    //         lastIndex = safeIndex;
    //       }
    //     }
    //   }, 100);
    // };

    // window.addEventListener("scroll", handleScroll);

    const createHeart = () => {
      const heart = document.createElement("div");
      heart.classList.add("heart");
      heart.innerHTML = "♡";
      heart.style.left = `${Math.random() * 100}vw`;
      heart.style.animationDuration = `${3 + Math.random() * 3}s`;
      heart.style.fontSize = `${16 + Math.random() * 16}px`;
      if (heartContainerRef.current) {
        heartContainerRef.current.appendChild(heart);
      }
      setTimeout(() => heart.remove(), 6000);
    };

    const intervalId = setInterval(createHeart, 300);

    return () => {
      startBtnRef.current?.removeEventListener("click", handleStart);
      // window.removeEventListener("scroll", handleScroll);
      clearInterval(intervalId);
    };
  }, []);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Wedding of Elias &amp; Reine</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Video Background Container */}
      <div id="background-container">
        <video
          autoPlay
          loop
          playsInline
          id="bg-video"
          ref={videoRef}
          poster="/assets/background-thumbnail.jpg"
          style={{ opacity: isStarted ? 1 : 0.5 }}
        >
          <source src="/assets/background-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Landing Overlay */}
      {!isStarted && (
        <div id="landing-overlay">
          <button id="start-btn" ref={startBtnRef}>
            Start
          </button>
        </div>
      )}

      {/* Mute Toggle Button */}
      <button id="mute-toggle" onClick={toggleMute}>
        {isMuted ? (
          // Muted: filled heart with muted icon
          <svg width="60" height="60" viewBox="0 0 35 35"   style={{ background: "none" }}>
            <path
              d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 
                 0-3.791 3.068-5.191 5.281-5.191 
                 1.312 0 4.151.501 5.719 4.457 
                 1.59-3.968 4.464-4.447 5.726-4.447 
                 2.54 0 5.274 1.621 5.274 5.181 
                 0 4.069-5.136 8.625-11 14.402
                 m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238
                 -1.285-2.206-3.522-3.248-5.719-3.248
                 -3.183 0-6.281 2.187-6.281 6.191 
                 0 4.661 5.571 9.429 12 15.809 
                 6.43-6.38 12-11.148 12-15.809 
                 0-4.011-3.095-6.181-6.274-6.181"
              fill="black"
              stroke="black"
              strokeWidth="0.5"
            />
            <text
              x="12"
              y="16"
              textAnchor="middle"
              fill="black"
              fontSize="8"
              fontFamily="sans-serif"
            >
              🎵
            </text>
          </svg>
        ) : (
          // Unmuted: outlined heart with unmuted icon
          <svg width="60" height="60" viewBox="0 0 35 35" style={{ background: "none" }}>
            <path
              d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 
                 0-3.791 3.068-5.191 5.281-5.191 
                 1.312 0 4.151.501 5.719 4.457 
                 1.59-3.968 4.464-4.447 5.726-4.447 
                 2.54 0 5.274 1.621 5.274 5.181 
                 0 4.069-5.136 8.625-11 14.402
                 m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238
                 -1.285-2.206-3.522-3.248-5.719-3.248
                 -3.183 0-6.281 2.187-6.281 6.191 
                 0 4.661 5.571 9.429 12 15.809 
                 6.43-6.38 12-11.148 12-15.809 
                 0-4.011-3.095-6.181-6.274-6.181"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
            />
            <text
              x="12"
              y="16"
              textAnchor="middle"
              fill="white"
              stroke="white"
              fontSize="8"
              fontFamily="sans-serif"
            >
              🎶
            </text>
          </svg>
        )}
      </button>

      {/* Main Content Container */}
      <div id="content-container" className={isStarted ? "visible" : "hidden"}>
        {/* ─── HERO SECTION ──────────────────────────────────────────── */}
      <section id="hero-section">
        <div className="hero-letters">
          <span className="hero-e">E</span>
          <span className="hero-amp">&</span>
          <span className="hero-r">R</span>
        </div>

        <div className="hero-subtext">
          <p>Therefore what God has joined together, let no one separate</p>
          <p className="parents">
            Mr. &amp; Mrs. Gharbieh<br/>
            Mr. &amp; Mrs. Zakhour
          </p>
          <p className="invite">
            Request the honor of your presence at the wedding of their son and daughter
          </p>
          <p className="names">
            Elias<br/>&amp;<br/>Reine
          </p>
          <p>Sunday, August 24th, 2025</p>

          <div className="countdown">
            <div>
              <span>{timeLeft.days}</span>
              Days
            </div>
            <div>
              <span>{timeLeft.hours}</span>
              Hours
            </div>
            <div>
              <span>{timeLeft.minutes}</span>
              Minutes
            </div>
            <div>
              <span>{timeLeft.seconds}</span>
              Seconds
            </div>
          </div>
        </div>
      </section>

             <section className="detail-section">
         <h2>Wedding Ceremony</h2>
         <div className="location-block">
           {/* location pin SVG */}
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#3c2f2f" viewBox="0 0 24 24">
             <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5
                      s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
           </svg>
           <span>St. Challita – 6:00 PM</span>
         </div>
         <p>Andaket</p>
         <p style={{ margin: '1.5em 0 0' }}>Sword Arch Ceremony will follow – 6:45 PM</p>
        <a
          className="map-button"
           href="https://maps.google.com/?q=St.+Challita+Andaket"
           target="_blank"
          rel="noopener noreferrer"
         >
           Map
         </a>
       </section>

        {/* <section className="double-card animated-section">
          <div className="card half-card">
            <h2>Bride’s Story</h2>
            <p>
              Once upon a time, Reine dreamed of a beautiful day filled with
              roses...
            </p>
          </div>
          <div className="ring"></div>
          <div className="card half-card">
            <h2>Groom’s Story</h2>
            <p>
              Elias, the charming hero of this tale, knew she was the one when...
            </p>
          </div>
        </section> */}

     {/* ─── CELEBRATION SECTION ─────────────────────────────────── */}
     <section className="detail-section">
       <h2>The Celebration</h2>

       <div className="location-block">
         {/* same map‑pin SVG */}
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#3c2f2f" viewBox="0 0 24 24">
           <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5
                    c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
         </svg>
         <span>Sant Challita Church – Cocktails will be served</span>
       </div>

       <p>Andaket</p>

       <a
         className="map-button"
                  href="https://maps.google.com/?q=Sant+Challita+Church+Andaket"
         target="_blank"
         rel="noopener noreferrer"
       >
         Map
       </a>
     </section>
     <section className="detail-section">
       <h2>Gift Registry</h2>
       <p>You love, laughter and presence are all we could wish for on our special day. For those who wish, a wedding list is available</p>

      
     {/* ─── WISH ACCOUNT ───────────────────────────────────────── */}
      <div className="account-block">
        <span className="account-label">Wish Account</span>
        <button
          className="copy-btn"
          onClick={() =>
            navigator.clipboard.writeText("Acc#23974923749")
          }
          aria-label="Copy account number"
        >
          {/* simple copy icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#3c2f2f"
          >
            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14
                     c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7
                     c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
          </svg>
        </button>
      </div>
      <p className="account-code">Acc#23974923749</p>
     </section>
        {/* <section className="card location-card animated-section">
          <h2>Location</h2>
          <p>St. Mary’s Church, Beirut</p>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.9892520004443!2d35.500377815161885!3d33.888628928623096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1521f3df7a33a00f%3A0xd6ebd171d1f1d7f4!2sSt.%20Mary%20Church!5e0!3m2!1sen!2slb!4v1715000000000"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
          <a
            className="map-button"
            href="https://maps.google.com/?q=St.+Mary’s+Church,+Beirut"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Google Maps
          </a>
        </section> */}

<section className="rsvp-section detail-section">
          <h2>Be Our Guest</h2>
          <p>
            Please reply before <strong>July 02, 2025</strong>
          </p>
          <p>
            <strong>Number of persons: 2</strong>
          </p>
          <div className="heart-button">
            <label>
              <input type="radio" name="attendance" value="accept" />
              <span>💖 Joyfully Accept</span>
            </label>
            <label>
              <input type="radio" name="attendance" value="decline" />
              <span>💔 Respectfully Decline</span>
            </label>
          </div>
          <div className="attending-names">
            <label htmlFor="guest-name">Names of the people attending:</label>
            <input type="text" id="guest-name" placeholder="Enter name..." />
            <button type="button" className="add-person-btn">
              Add Person
            </button>
          </div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </section>

        <footer className="animated-section">
          <p>Made with love 💕 by the couple</p>
        </footer>
      </div>

      <div className="floating-hearts-container" ref={heartContainerRef}></div>
    </>
  );
}
