import axios from 'axios';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoading } from '../features/loadingSlice';
import { setCurrentUser } from '../features/userSlice';
import { User } from '../models/user';
import { RootState } from '../store/store';



const UserInfoUpdate = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [street, setStreet] = useState('');
  const [suburb, setSuburb] = useState('');
  const [postcode, setPostcode] = useState('');
  const [country, setCountry] = useState('');
  const [dob, setDob] = useState(''); // 日期格式为 'YYYY-MM-DD'
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user) as User;
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    street: '',
    suburb: '',
    postcode: '',
    country: '',
    dob: '',
    phone: '',
  });

  


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };


 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    debugger
    
    try {
      dispatch(setLoading(true));
      console.log("updatedInfo are : ",userInfo)
      const response = await axios.put(
        `http://localhost:5000/update_user_info/${user.id}`,
        userInfo
      );
      console.log("Response data: ", response.data);
      const updatedUser = response.data.user;
      dispatch(setCurrentUser(updatedUser));
      dispatch(setLoading(false));
      window.alert("Your information has been updated successfully.");
      console.log("updated user is : ",updatedUser);

      navigate('/');
    } catch (error) {
      dispatch(setLoading(false));
      window.alert("An error occurred while updating user info.");
    }
  };

  return (
    <div>
      <h2>Update User Information.</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          {user && (
              <span>{user.email}</span>
            )}

        </div>
        {isEditing ? (
          <>
            <div>
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={userInfo.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={userInfo.lastName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Street:</label>
              <input
                type="text"
                name="street"
                value={userInfo.street}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Suburb:</label>
              <input
                type="text"
                name="suburb"
                value={userInfo.suburb}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Postcode:</label>
              <input
                type="text"
                name="postcode"
                value={userInfo.postcode}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Country:</label>
              <input
                type="text"
                name="country"
                value={userInfo.country}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Date of Birth:</label>
              <input
                type="date"
                name="dob"
                value={userInfo.dob}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={userInfo.phone}
                onChange={handleChange}
              />
            </div>
          </>
         ) : (
          <>
            {user ? (
              <>
                <div>
                  <label>First Name:</label>
                  <span>{user.firstName}</span>
                </div>
                <div>
                  <label>Last Name:</label>
                  <span>{user.lastName}</span>
                </div>
                <div>
                  <label>Street:</label>
                  <span>{user.street}</span>
                </div>
                <div>
                  <label>Suburb:</label>
                  <span>{user.suburb}</span>
                </div>
                <div>
                  <label>Postcode:</label>
                  <span>{user.postcode}</span>
                </div>
                <div>
                  <label>Country:</label>
                  <span>{user.country}</span>
                </div>
                <div>
                  <label>Date of Birth:</label>
                  <span>{user.dob}</span>
                </div>
                <div>
                  <label>Phone:</label>
                  <span>{user.phone}</span>
                </div>
              </>
            ) : (
              <span>Loading...</span>
            )}
          </>
        )}
        {isEditing && <button type="submit">Update</button>}
        <button type="button" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </form>
    </div>
  );
};

export default UserInfoUpdate;
