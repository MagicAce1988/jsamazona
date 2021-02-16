/* eslint-disable no-alert */

import { signIn } from '../api';
import { getUserInfo, setUserInfo } from '../localStorage';

const SignInScreen = {
  after_render: () => {
    const signInForm = document.getElementById('signin-form');
    signInForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = await signIn({
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
      });
      if (data.error) {
        alert(data.error);
      } else {
        setUserInfo(data);
        document.location.hash = '/';
      }
    });
  },
  render: () => {
    if (getUserInfo().name) {
      document.location.hash = '/';
    }
    return `
    <div class="form-container">
        <form id="signin-form">
            <ul class="form-items">
                <li>
                    <h1>Sign-In</h1>
                </li>
                <li>
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email"/>
                </li>
                <li>
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password"/>
                </li>
                <li>
                    <button type="submit" class="primary">Sign In</button>
                </li>
                <li>
                    <div>
                        New user? 
                        <a href="/#/register">Create your account</a>
                    </div>
                </li>
            </ul>
        </form>
    </div>
    `;
  },
};

export default SignInScreen;
