import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentUser } from '../features/userSlice';
import { AppDispatch } from '../store/store';
import './Register.scss';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
    return re.test(email);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      window.alert('Invalid email format');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/register', { email, password });
      localStorage.setItem('token', response.data.access_token); 
      dispatch(setCurrentUser(response.data.user)); 
      window.alert('Registration successful');
      navigate('/welcome');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        window.alert(error.response.data.message);
      } else {
        window.alert('Registration failed');
      }
    }
    setEmail('');
    setPassword('');
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h1 className="form__title">Create Account</h1>
        <div className="form__message form__message--error"></div>
  
        <div className="form__input-group">
          <input
            type="text"
            className="form__input"
            autoFocus
            placeholder="First Name"
         
          />
          <input
            type="text"
            className="form__input"
            autoFocus
            placeholder="Last Name"
  
          />
          <div className="form__input-error-message"></div>
        </div>
  
        <div className="form__input-group">
          <input
            type="email"
            className="form__input"
            autoFocus
            placeholder="Email Address"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
          <div className="form__input-error-message"></div>
        </div>
  
        <div className="form__input-group">
          <input
            type="tel"
            className="form__input"
            autoFocus
            placeholder="Phone Number"
          
          />
          <div className="form__input-error-message"></div>
        </div>
  
        <div className="form__input-group form__input-group--address">
          <input
            type="text"
            className="form__input form__input--address"
            autoFocus
            placeholder="Address"
      
          />
          <input
            type="text"
            className="form__input form__input--postcode"
            autoFocus
            placeholder="Postcode"
            maxLength={4}
       
          />
          <div className="form__input-error-message"></div>
        </div>
  
        <div className="form__input-group form__input-group--half">
          <select
            className="form__input"
            id="country"
            autoFocus
    
          >
            <option value="" selected disabled>
              Country
            </option>
            <option value="UK">United Kingdom</option>
            <option value="Australia">Australia</option>
            <option value="USA">USA</option>
          </select>
          <select
            className="form__input"
            id="state"
            autoFocus
        
          >
            <option value="" selected disabled>
              State
            </option>
          </select>
          <div className="form__input-error-message"></div>
        </div>
  
        <div className="form__input-group">
          <input
            type="password"
            id="password"
            className="form__input"
            autoFocus
            placeholder="Password"
            value={password} // 添加 value 属性
            onChange={(e) => setPassword(e.target.value)} // 添加 onChange 属性
            minLength={8}
            required
          />
          <div className="form__input-error-message"></div>
        </div>
  
        <button className="form__button" type="submit">
          Continue
        </button>
        <p className="form__text">
          <a href="#" className="form__link" id="linkSignIn">
            Already have an account? Sign in
          </a>
        </p>
      </form>
    </div>
  );
  
};

export default Register;