import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import './Dashboard.css'; 
 
const AddProduct = () => { 
  const navigate = useNavigate(); 
  const [step, setStep] = useState(1); 
  const [uploadedImages, setUploadedImages] = useState<string[]>([]); 
 
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const files = e.target.files; 
    if (!files) return; 
    const urls = Array.from(files).map((file: File) => URL.createObjectURL(file)); 
    setUploadedImages((prev: string[]) => [...prev, ...urls]); 
  }; 
 
  const steps = ['01 General', '02 Pricing', '03 Files', '04 Settings']; 
 
  return ( 
    <div className="dashboard"> 
      <div className="card" style={{ flexDirection: 'column', display: 'block', background: 'white', 
margin: '50px auto', maxWidth: '900px' }}> 
 
        <div style={{ padding: '30px', display: 'flex', justifyContent: 'space-between', borderBottom: 
'1px solid #eee' }}> 
          <h2>Add Product</h2> 
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', fontSize: 
'2rem', cursor: 'pointer' }}>&times;</button> 
        </div> 
 
        {/* STEP INDICATORS */} 
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px', background: 
'#f9f9f9' }}> 
          {steps.map((label, i) => ( 
            <span 
              key={i} 
              onClick={() => setStep(i + 1)} 
              style={{ 
                color: step === i + 1 ? '#2e7d32' : '#999', 
                fontWeight: step === i + 1 ? 'bold' : 'normal', 
                borderBottom: step === i + 1 ? '2px solid #2e7d32' : 'none', 
                cursor: 'pointer', 
                paddingBottom: '4px', 
              }} 
            > 
              {label} 
            </span> 
          ))} 
        </div> 
 
        <div style={{ padding: '40px' }}> 
 
          {/* STEP 1 */} 
          {step === 1 && ( 
            <div> 
              <label style={{ display: 'block', marginBottom: '8px' }}>Product Name *</label> 
              <input className="input-field" placeholder="e.g. Organic White Maize" /> 
              <label style={{ display: 'block', marginBottom: '8px', marginTop: '15px' 
}}>Category</label> 
              <select className="input-field"> 
                <option>Grains & Cereals</option> 
                <option>Vegetables</option> 
                <option>Fruits</option> 
                <option>Livestock</option> 
                <option>Tools & Equipment</option> 
              </select> 
              <label style={{ display: 'block', marginBottom: '8px', marginTop: '15px' 
}}>Description</label> 
              <textarea className="input-field" style={{ height: '120px' }} placeholder="Describe 
your product quality..." /> 
            </div> 
          )} 
 
          {/* STEP 2 */} 
          {step === 2 && ( 
            <div> 
              <label style={{ display: 'block', marginBottom: '8px' }}>Price (XAF) *</label> 
              <input className="input-field" type="number" placeholder="e.g. 5000" /> 
              <label style={{ display: 'block', marginBottom: '8px', marginTop: '15px' }}>Unit</label> 
              <select className="input-field"> 
                <option>Per kg</option> 
                <option>Per crate</option> 
                <option>Per bag</option> 
                <option>Per piece</option> 
              </select> 
              <label style={{ display: 'block', marginBottom: '8px', marginTop: '15px' }}>Available 
Quantity</label> 
              <input className="input-field" type="number" placeholder="e.g. 200" /> 
            </div> 
          )} 
 
          {/* STEP 3 */} 
          {step === 3 && ( 
            <div> 
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Upload 
Product Images</label> 
              <label style={{ display: 'block', border: '2px dashed #2e7d32', padding: '40px', textAlign: 
'center', borderRadius: '15px', background: '#f0fdf4', cursor: 'pointer' }}> 
                <p>Click to upload images</p> 
                <input type="file" accept="image/*" multiple onChange={handleImageUpload} style={{ 
display: 'none' }} /> 
              </label> 
              {uploadedImages.length > 0 && ( 
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginTop: 
'20px' }}> 
                  {uploadedImages.map((src: string, i: number) => ( 
                    <img key={i} src={src} alt={`upload-${i}`} style={{ width: '100%', height: '100px', 
objectFit: 'cover', borderRadius: '8px' }} /> 
                  ))} 
                </div> 
              )} 
            </div> 
          )} 
 
          {/* STEP 4 */} 
          {step === 4 && ( 
            <div> 
              <label style={{ display: 'block', marginBottom: '8px' }}>Region</label> 
              <select className="input-field"> 
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
              <label style={{ display: 'block', marginBottom: '8px', marginTop: '15px' 
}}>Visibility</label> 
              <select className="input-field"> 
                <option>Public — visible to all buyers</option> 
                <option>Private — only you can see</option> 
              </select> 
            </div> 
          )} 
        </div> 
 
        <div style={{ padding: '25px', display: 'flex', justifyContent: 'space-between', background: 
'#f9f9f9' }}> 
          {step > 1 
            ? <button className="button" style={{ padding: '12px 25px' }} onClick={() => 
setStep(step - 1)}>Back</button> 
            : <span /> 
          } 
          {step < 4 
            ? <button className="button" style={{ padding: '12px 25px' }} onClick={() => 
setStep(step + 1)}>Next step</button> 
            : <button className="button" style={{ padding: '12px 25px' }} onClick={() => 
navigate('/')}>Submit Product</button> 
          } 
        </div> 
 
      </div> 
    </div> 
  ); 
}; 
 
export default AddProduct; 