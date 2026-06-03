import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import './Dashboard.css'; 
 
// Adjusted path to accurately hit the src/assets folder 
import profileImg from '../../assets/farmer-profile.jpg'; 
 
const OfferServices = () => { 
  const navigate = useNavigate(); 
  const [activeSection, setActiveSection] = useState('service-info'); 
  const [uploadedImages, setUploadedImages] = useState<string[]>([]); 
 
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const files = e.target.files; 
    if (!files) return; 
    const urls = Array.from(files).map(file => URL.createObjectURL(file)); 
    setUploadedImages(prev => [...prev, ...urls]); 
  }; 
 
  return ( 
    <div className="dashboard"> 
      <div className="card" style={{ flexDirection: 'row', maxWidth: '1100px', margin: '50px auto', 
background: 'white', display: 'flex' }}> 
 
        {/* SIDEBAR NAVIGATION */} 
        <div style={{ width: '280px', background: '#f4f7f4', padding: '40px', borderRightWidth: '1px', 
borderRightStyle: 'solid', borderRightColor: '#eeeeee' }}> 
          <button  
            onClick={() => navigate('/')}  
            style={{ background: 'none', border: 'none', color: '#2e7d32', cursor: 'pointer', 
marginBottom: '30px', fontWeight: 'bold' }} 
          > 
            &larr; Back to Dashboard 
          </button> 
 
          <p 
            onClick={() => setActiveSection('service-info')} 
            style={{ fontWeight: 'bold', color: activeSection === 'service-info' ? '#2e7d32' : '#999', 
marginBottom: '20px', cursor: 'pointer' }} 
          > 
            Service Info 
          </p> 
          <p 
            onClick={() => setActiveSection('gallery')} 
            style={{ fontWeight: 'bold', color: activeSection === 'gallery' ? '#2e7d32' : '#999', 
marginBottom: '20px', cursor: 'pointer' }} 
          > 
            Gallery 
          </p> 
          <p 
            onClick={() => setActiveSection('location')} 
            style={{ fontWeight: 'bold', color: activeSection === 'location' ? '#2e7d32' : '#999', 
marginBottom: '20px', cursor: 'pointer' }} 
          > 
            Location 
          </p> 
        </div> 
 
        {/* MAIN FORM CONTENT */} 
        <div style={{ flex: 1, padding: '50px' }}> 
          <div style={{ textAlign: 'center', marginBottom: '40px' }}> 
            <img src={profileImg} style={{ width: '110px', height: '110px', marginBottom: '10px', 
borderRadius: '50%', objectFit: 'cover' }} alt="profile" /> 
            <h2 style={{ margin: 0 }}>Post Your Service</h2> 
          </div> 
 
          {/* SECTION 1: SERVICE INFO */} 
          <div style={{ display: activeSection === 'service-info' ? 'block' : 'none' }}> 
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}> 
              <div> 
                <label htmlFor="serviceName" style={{ display: 'block', marginBottom: '5px', 
fontWeight: 'bold' }}>Service Name</label> 
                <input id="serviceName" className="input-field" placeholder="e.g. Soil Testing" /> 
              </div> 
              <div> 
                <label htmlFor="servicePrice" style={{ display: 'block', marginBottom: '5px', 
fontWeight: 'bold' }}>Service Price (XAF)</label> 
                <input id="servicePrice" className="input-field" placeholder="3000" /> 
              </div> 
            </div> 
            <label htmlFor="serviceDescription" style={{ display: 'block', marginBottom: '5px', 
marginTop: '15px', fontWeight: 'bold' }}>Full Description</label> 
            <textarea id="serviceDescription" className="input-field" style={{ height: '100px' }} 
placeholder="What does your service include?"></textarea> 
            <button className="button" style={{ width: '100%', padding: '20px', marginTop: '20px' }} 
onClick={() => setActiveSection('gallery')}> 
              Next: Add Gallery &rarr; 
            </button> 
          </div> 
 
          {/* SECTION 2: GALLERY */} 
          <div style={{ display: activeSection === 'gallery' ? 'block' : 'none' }}> 
            <h3 style={{ marginBottom: '20px' }}>Upload Service Images</h3> 
            <label style={{ 
              display: 'block', border: '2px dashed #2e7d32', padding: '40px', 
              textAlign: 'center', borderRadius: '15px', background: '#f0fdf4', cursor: 'pointer' 
            }}> 
              <p>
📁
 Click to upload images</p> 
              <input type="file" accept="image/*" multiple onChange={handleImageUpload} style={{ 
display: 'none' }} /> 
            </label> 
            {uploadedImages.length > 0 && ( 
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginTop: 
'20px' }}> 
                {uploadedImages.map((src, i) => ( 
                  <img key={i} src={src} alt={`upload-${i}`} style={{ width: '100%', height: '100px', 
objectFit: 'cover', borderRadius: '8px' }} /> 
                ))} 
              </div> 
            )} 
            <button className="button" style={{ width: '100%', padding: '20px', marginTop: '20px' }} 
onClick={() => setActiveSection('location')}> 
              Next: Add Location &rarr; 
            </button> 
          </div> 
 
          {/* SECTION 3: LOCATION */} 
          <div style={{ display: activeSection === 'location' ? 'block' : 'none' }}> 
            <h3 style={{ marginBottom: '20px' }}>Service Location</h3> 
            <label htmlFor="serviceRegion" style={{ display: 'block', marginBottom: '5px', fontWeight: 
'bold' }}>Region</label> 
            <select id="serviceRegion" className="input-field"> 
              <option>Centre</option> 
              <option>Littoral</option> 
              <option>West</option> 
              <option>North West</option> 
              <option>South West</option> 
              <option>Adamawa</option> 
              <option>North</option> 
              <option>Far North</option> 
              <option>East</option> 
              <option>South</option> 
            </select> 
            <label htmlFor="serviceTown" style={{ display: 'block', marginBottom: '5px', marginTop: 
'15px', fontWeight: 'bold' }}>Town / Village</label> 
            <input id="serviceTown" className="input-field" placeholder="e.g. Bafoussam" /> 
            <button className="button" style={{ width: '100%', padding: '20px', marginTop: '20px' }} 
onClick={() => navigate('/')}> 
              &#x2705; Post Service 
            </button> 
          </div> 
 
        </div> 
      </div> 
    </div> 
  ); 
}; 
 
export default OfferServices; 