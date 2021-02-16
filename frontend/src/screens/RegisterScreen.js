/* eslint-disable no-alert */

import { register } from '../api';
import { getUserInfo, setUserInfo } from '../localStorage';
import { setLoading, showMessage } from '../utils';

const RegisterScreen = {
  after_render: () => {
    const registerForm = document.getElementById('register-form');
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const rePassword = document.getElementById('repassword').value;
      if (password !== rePassword) {
        showMessage('Passwords not matching');
      } else {
        setLoading(true);
        const data = await register({
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
      }
    });
  },
  render: () => {
    if (getUserInfo().name) {
      document.location.hash = '/';
    }
    return `
    <div class="form-container">
        <form id="register-form">
            <ul class="form-items">
                <li>
                    <h1>Create Account</h1>
                </li>
                <li>
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" required/>
                </li>
                <li>
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required/>
                </li>
                <li>
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required/>
                </li>
                <li>
                    <label for="repassword">Re-Enter Password</label>
                    <input type="password" id="repassword" name="repassword" required/>
                </li>
                <li>
                    <button type="submit" class="primary">Register</button>
                </li>
                <li>
                    <div>
                        Already have an account? 
                        <a href="/#/signin">Sign-In</a>
                    </div>
                </li>
            </ul>
        </form>
    </div>
    `;
  },
};

export default RegisterScreen;
