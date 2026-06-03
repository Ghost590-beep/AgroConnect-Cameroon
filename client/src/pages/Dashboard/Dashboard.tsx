import React from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import './Dashboard.css'; 
 
// Using two dots (../) to reach the assets folder from src/pages/Dashboard/ 
import agroHero from '../../assets/agro.jpg';  
import tomatoes from '../../assets/tomatoes.jpg'; 
import maize from '../../assets/maize.jpg'; 
import training from '../../assets/training.jpg'; 
import harvest from '../../assets/harvest.jpg'; 
import tomatoRec from '../../assets/tomato-rec.jpg'; 
import profileImg from '../../assets/farmer-profile.jpg'; 
 
const Dashboard = () => { 
  const navigate = useNavigate(); 
 
  return ( 
    <div className="dashboard"> 
       
      {/* HERO HEADER */} 
      <div className="hero-header" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), 
rgba(0,0,0,0.5)), url(${agroHero})` }}> 
        <nav className="nav"> 
          <h2>AGROFAMILY</h2> 
          <div> 
            <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Dashboard</span> 
            <span onClick={() => navigate('/marketplace')} style={{ cursor: 'pointer' 
}}>Marketplace</span> 
            <span onClick={() => navigate('/about')} style={{ cursor: 'pointer' }}>About</span> 
            <span onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>Profile</span> 
          </div> 
          <div className="profile"> 
            <span>Princess</span> 
            <img src={profileImg} alt="Profile" /> 
          </div> 
        </nav> 
 
        <header className="header"> 
          <h1>Welcome back, Princess 
�
�
</h1> 
          <p>Growing the future of Cameroon, together.</p> 
        </header> 
      </div> 
 
      {/* CONTENT AREA */} 
      <div className="content-area"> 
         
        {/* Action Cards */} 
        <div className="action-cards"> 
          <div className="card"> 
            <div className="card-content"> 
              <h2 style={{ color: '#2e7d32' }}>Add Product</h2> 
              <button onClick={() => navigate('/add-product')}>+ Start Selling</button> 
            </div> 
            <div className="card-image" style={{ backgroundImage: `url(${harvest})` }}></div> 
          </div> 
 
          <div className="card"> 
            <div className="card-content"> 
              <h2 style={{ color: '#1565c0' }}>Offer Service</h2> 
              <button  
                onClick={() => navigate('/offer-service')}  
                style={{ backgroundColor: '#1565c0' }} 
              > 
                + Post Service 
              </button> 
            </div> 
            <div className="card-image" style={{ backgroundImage: `url(${training})` }}></div> 
          </div> 
        </div> 
 
        {/* Listings and Services */} 
        <div className="listings"> 
          <div className="listing"> 
            <h3>Your Active Listings</h3> 
            <div className="listing-item" onClick={() => navigate('/add-product')} style={{ cursor: 
'pointer' }}> 
              <img src={maize} alt="Maize" /> 
              <div><strong>White Maize</strong></div> 
              <span style={{ color: '#2e7d32', fontWeight: 'bold' }}>XAF 500/kg</span> 
            </div> 
            <div className="listing-item" onClick={() => navigate('/add-product')} style={{ cursor: 
'pointer' }}> 
              <img src={tomatoes} alt="Tomatoes" /> 
              <div><strong>Roma Tomatoes</strong></div> 
              <span style={{ color: '#2e7d32', fontWeight: 'bold' }}>XAF 4500/Crate</span> 
            </div> 
          </div> 
 
          <div className="card" style={{ display: 'block', overflow: 'hidden' }}> 
            <img src={training} style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
alt="Workshop" /> 
            <div style={{ padding: '20px' }}> 
              <h4 style={{ margin: 0 }}>Farmer Education Workshop</h4> 
              <button  
                className="card-content button"  
                style={{ marginTop: '15px', width: '100%' }} 
                onClick={() => navigate('/offer-service')} 
              > 
                Manage Service 
              </button> 
            </div> 
          </div> 
        </div> 
 
        {/* Recommendations Section */} 
        <h3 className="recommendations">Recommended for your Farm</h3> 
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}> 
          <div className="recommendation-card" onClick={() => navigate('/marketplace')} style={{ 
cursor: 'pointer' }}> 
            <img src={tomatoRec} alt="Fertilizer" /> 
            <div> 
              <p style={{ margin: 0, fontWeight: 'bold' }}>Organic Fertilizer</p> 
              <p style={{ color: '#2e7d32', fontWeight: 'bold' }}>XAF 8,500</p> 
            </div> 
          </div> 
          <div className="recommendation-card" onClick={() => navigate('/marketplace')} style={{ 
cursor: 'pointer' }}> 
            <img src={maize} alt="Seeds" /> 
            <div> 
              <p style={{ margin: 0, fontWeight: 'bold' }}>Hybrid Maize Seeds</p> 
              <p style={{ color: '#2e7d32', fontWeight: 'bold' }}>XAF 2,200</p> 
            </div> 
          </div> 
          <div className="recommendation-card" onClick={() => navigate('/marketplace')} style={{ 
cursor: 'pointer' }}> 
            <img src={harvest} alt="Crates" /> 
            <div> 
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