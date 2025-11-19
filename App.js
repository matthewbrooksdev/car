import { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom'; // Removed BrowserRouter import here
import { HashLink } from 'react-router-hash-link';  // separate name to avoid conflict
import About from './About';
import Services from './Services';
import './App.css';
import Home from './Home';

function App() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const images = [
  process.env.PUBLIC_URL + '/image1.png', 
  process.env.PUBLIC_URL + '/image2.png',
  process.env.PUBLIC_URL + '/image3.png',
  process.env.PUBLIC_URL + '/image4.png'
];


  const phrases = [
    'Community Founder',    'President',    'SiBAN | CEO', 'C.B.C Blockchain Services'
  ];

  const scrollingImages = [
     process.env.PUBLIC_URL + '/slide-1.png',
     process.env.PUBLIC_URL + '/slide-2.png',
     process.env.PUBLIC_URL + '/slide-3.png',
     process.env.PUBLIC_URL + '/slide-4.png',
    process.env.PUBLIC_URL + '/slide-5.png',
     process.env.PUBLIC_URL + '/slide-6.png',
  ];

  const allScrollingImages = [...scrollingImages, ...scrollingImages];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, 400);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    let timeout;

    if (isTyping) {
      if (currentText.length < currentPhrase.length) {
        timeout = setTimeout(() => {
          setCurrentText(currentPhrase.substring(0, currentText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 1000);
      }
    } else {
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        }, 50);
      } else {
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, currentPhraseIndex, isTyping, phrases]);

  return (
  //Section A (header) 
    <div className="App">
      <header className="header">
        <div className="card">
          <div className="name">Obinna Iwuno</div>
          <div className="role">community founder</div>
        </div>
        <nav className="nav">
         <HashLink to="/#">Home</HashLink>
          <Link to="/about">About Me</Link> 
         <HashLink to="/#services">Services</HashLink>
          <a href="#blog">Blog</a>
          <a href="#beyond-vision">Beyond the Vision</a>
        </nav>
        <input id="checkbox" type="checkbox"></input>
        <label className="toggle" htmlFor="checkbox">
          <div id="bar1" className="bars"></div>
          <div id="bar2" className="bars"></div>
          <div id="bar3" className="bars"></div>
        </label>
        <div className="mobile-nav">
          <HashLink to="/#">Home</HashLink>
          <Link to="/about">About Me</Link>
          <HashLink to="/#services">Services</HashLink>
          <a href="#blog">Blog</a>
          <a href="#beyond-vision">Beyond the Vision</a>
        </div>
      </header>
       <Routes>
<Route path="/" element={<Home />} />

        <Route path="/about" element={<About  />} />
        <Route path="/services" element={<Services />} /> 
      </Routes>
  </div>
  
  );
}

export default App;
