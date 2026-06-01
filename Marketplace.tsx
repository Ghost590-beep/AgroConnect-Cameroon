import React from 'react';
// These must be in your src/assets folder
import agroHero from '../../assets/agro.jpg'; // Forest 1 (Top)
import forestBody from '../../assets/forest-bg.jpg'; // Forest 2 (Whole Page)
import tomatoes from '../../assets/tomatoes.jpg';
import maize from '../../assets/maize.jpg';
import training from '../../assets/training.jpg';
import harvest from '../../assets/harvest.jpg';
import tomatoRec from '../../assets/tomato-rec.jpg';
import profileImg from '../../assets/farmer-profile.jpg';

const Dashboard = () => {
  return (
    <div style={{ 
      // This makes the forest background cover the WHOLE page, including recommendations
      backgroundImage: `linear-gradient(rgba(240, 242, 240, 0.85), rgba(240, 242, 240, 0.85)), url(${forestBody})`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed', // This keeps the forest still while you scroll
      backgroundPosition: 'center',
      minHeight: '100vh', 
      fontFamily: 'sans-serif', 
      paddingBottom: '50px' 
    }}>
      
      {/* --- HERO HEADER (Forest Top) --- */}
      <div style={{ 
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${agroHero})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        height: '320px', 
        color: 'white',
        padding: '0 50px'
      }}>
        {/* FIXED NAVIGATION: Now includes Profile after About */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', alignItems: 'center' }}>
          <h2 style={{ margin: 0, letterSpacing: '1px' }}>AGROFAMILY</h2>
          <div style={{ display: 'flex', gap: '30px', fontWeight: 'bold' }}>
            <span>Dashboard</span>
            <span>Marketplace</span>
            <span>About</span>
            <span>Profile</span> {/* <--- Added Profile here */}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.2)', padding: '5px 15px', borderRadius: '20px' }}>
            <span>Princess</span>
            <img src={profileImg} alt="Profile" style={{ width: '35px', height: '35px', borderRadius: '50%', objectFit: 'cover', border: '2px solid white' }} />
          </div>
        </nav>

        <header style={{ marginTop: '50px' }}>
          <h1 style={{ fontSize: '3rem', margin: 0 }}>Welcome back, Princess 👋</h1>
          <p style={{ fontSize: '1.2rem', opacity: '0.9' }}>Growing the future of Cameroon, together.</p>
        </header>
      </div>

      {/* --- CONTENT AREA (Sitting on the Forest Background) --- */}
      <div style={{ maxWidth: '1200px', margin: '-50px auto 0', padding: '0 20px' }}>
        
        {/* Top Action Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', background: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}>
             <div style={{ padding: '30px', flex: 1 }}>
                <h2 style={{ color: '#2e7d32', margin: '0 0 10px 0' }}>Add Product</h2>
                <button style={{ backgroundColor: '#2e7d32', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>+ Start Selling</button>
             </div>
             <div style={{ width: '180px', backgroundImage: `url(${harvest})`, backgroundSize: 'cover' }}></div>
          </div>

          <div style={{ display: 'flex', background: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}>
             <div style={{ padding: '30px', flex: 1 }}>
                <h2 style={{ color: '#1565c0', margin: '0 0 10px 0' }}>Offer Service</h2>
                <button style={{ backgroundColor: '#1565c0', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>+ Post Service</button>
             </div>
             <div style={{ width: '180px', backgroundImage: `url(${training})`, backgroundSize: 'cover' }}></div>
          </div>
        </div>

        {/* Listings and Services */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '30px', marginBottom: '40px' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.9)', padding: '25px', borderRadius: '15px', backdropFilter: 'blur(5px)' }}>
            <h3 style={{ borderBottom: '2px solid #2e7d32', paddingBottom: '10px' }}>Your Active Listings</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px 0', borderBottom: '1px solid #eee' }}>
              <img src={maize} style={{ width: '55px', height: '55px', borderRadius: '10px', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}><strong>White Maize</strong></div>
              <span style={{ color: '#2e7d32', fontWeight: 'bold' }}>XAF 500/kg</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px 0' }}>
              <img src={tomatoes} style={{ width: '55px', height: '55px', borderRadius: '10px', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}><strong>Roma Tomatoes</strong></div>
              <span style={{ color: '#2e7d32', fontWeight: 'bold' }}>XAF 4500/Crate</span>
            </div>
          </div>

          <div style={{ background: 'white', borderRadius: '15px', overflow: 'hidden' }}>
            <img src={training} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '20px' }}>
              <h4 style={{ margin: 0 }}>Farmer Education Workshop</h4>
              <button style={{ marginTop: '15px', width: '100%', padding: '10px', background: '#2e7d32', color: 'white', border: 'none', borderRadius: '8px' }}>Manage Service</button>
            </div>
          </div>
        </div>

        {/* Recommendations Section (Now has forest background behind it) */}
        <h3 style={{ color: '#333', marginBottom: '20px' }}>Recommended for your Farm</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
           <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
              <img src={tomatoRec} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
              <div style={{ padding: '15px' }}>
                <p style={{ margin: 0, fontWeight: 'bold' }}>Organic Fertilizer</p>
                <p style={{ color: '#2e7d32', fontWeight: 'bold' }}>XAF 8,500</p>
              </div>
           </div>
           <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
              <img src={maize} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
              <div style={{ padding: '15px' }}>
                <p style={{ margin: 0, fontWeight: 'bold' }}>Hybrid Maize Seeds</p>
                <p style={{ color: '#2e7d32', fontWeight: 'bold' }}>XAF 2,200</p>
              </div>
           </div>
           <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
              <img src={harvest} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
              <div style={{ padding: '15px' }}>
                <p style={{ margin: 0, fontWeight: 'bold' }}>Storage Crates</p>
                <p style={{ color: '#2e7d32', fontWeight: 'bold' }}>XAF 1,500</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;