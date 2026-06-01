import React from 'react';  
import { useNavigate } from 'react-router-dom';  
import './Dashboard.css';  
  
const AddProduct = () => {  
  const navigate = useNavigate();  
  
  return (  
    <div className="dashboard">  
      <div className="card" style={{flexDirection: 'column', display: 'block', background: 'white', margin: '50px auto', maxWidth: '900px'}}>  
        
        <div style={{padding: '30px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee'}}>  
          <h2>Add Product</h2>  
          <button onClick={() => navigate('/')} style={{background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer'}}>&times;</button>  
        </div>  
  
        <div style={{display: 'flex', justifyContent: 'space-around', padding: '20px', background: '#f9f9f9'}}>  
          <span style={{color: '#2e7d32', fontWeight: 'bold', borderBottom: '2px solid #2e7d32'}}>01 General</span>  
          <span style={{color: '#999'}}>02 Pricing</span>  
          <span style={{color: '#999'}}>03 Files</span>  
          <span style={{color: '#999'}}>04 Settings</span>  
        </div>  
  
        <div style={{padding: '40px'}}>  
          <label style={{display: 'block', marginBottom: '8px'}}>Product Name *</label>  
          <input className="input-field" placeholder="e.g. Organic White Maize" />  
  
          <label style={{display: 'block', marginBottom: '8px', marginTop: '15px'}}>Price (XAF) *</label>  
          <input className="input-field" type="number" placeholder="e.g. 5000" />  
  
          <label style={{display: 'block', marginBottom: '8px', marginTop: '15px'}}>Description</label>  
          <textarea className="input-field" style={{height: '120px'}} placeholder="Describe your product quality..."></textarea>  
  
          <div style={{border: '2px dashed #2e7d32', padding: '40px', textAlign: 'center', borderRadius: '15px', background: '#f0fdf4'}}>  
             <p>📁 Drop your images here, or <span style={{color: '#2e7d32', fontWeight: 'bold', cursor: 'pointer'}}>Click to browse</span></p>  
          </div>  
        </div>  
  
        <div style={{padding: '25px', textAlign: 'right', background: '#f9f9f9'}}>  
          <button className="button" style={{padding: '12px 25px'}} onClick={() => navigate('/')}>Next step &rarr;</button>  
        </div>  
      </div>  
    </div>  
  );  
};  
  
export default AddProduct;