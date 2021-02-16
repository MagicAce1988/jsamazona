/* eslint-disable no-alert */

import { update } from '../api';
import { getUserInfo, setUserInfo, deleteUserInfo } from '../localStorage';
import { setLoading, showMessage } from '../utils';

const ProfileScreen = {
  after_render: () => {
    document.getElementById('signout-button').addEventListener('click', () => {
      deleteUserInfo();
      document.location.hash = '/';
    });
    const profileForm = document.getElementById('profile-form');
    profileForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      setLoading(true);
      const data = await update({
        name,
        email,
        password,
      });
      setLoading(false);
      if (data.error) {
        showMessage(data.error);
      } else {
        setUserInfo(data);
        document.location.hash = '/';
      }
    });
  },
  render: () => {
    const { name, email } = getUserInfo();
    if (!name) {
      document.location.hash = '/';
    }
    return `
    <div class="form-container">
        <form id="profile-form">
            <ul class="form-items">
                <li>
                    <h1>User Profile</h1>
                </li>
                <li>
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" value="${name}"/>
                </li>
                <li>
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" value="${email}"/>
                </li>
                <li>
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password"/>
                </li>
                <li>
                    <button type="submit" class="primary">Update</button>
                </li>
                <li>
                    <button type="button" id="signout-button">Sign Out</button>
                </li>
            </ul>
        </form>
    </div>
    `;
  },
};

export default ProfileScreen;
