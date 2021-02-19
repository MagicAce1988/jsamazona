/* eslint-disable no-alert */

import { getOrders, update } from '../api';
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
  render: async () => {
    const { name, email } = getUserInfo();
    if (!name) {
      document.location.hash = '/';
    }
    const orders = await getOrders();
    return `
    <div class="content profile">
      <div class="profile-info">
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
      </div>
      <div class="profile-orders">
        <h2>Order History</h2>
        <table>
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            ${
              !orders.length
                ? `<tr><td colspan="6">No Order Found</td></tr>`
                : `
                ${orders
                  .map(
                    (order) => `
                <tr>
                  <td>${order._id.slice(8)}</td>
                  <td>${order.createdAt}</td>
                  <td>${order.totalPrice}</td>
                  <td>${order.paidAt || 'No'}</td>
                  <td>${order.deliveredAt || 'No'}</td>
                  <td><a href="/#/order/${order._id}">DETAILS</a></td>
                  <td></td>
                </tr>`
                  )
                  .join('\n')}
                `
            }
          </tbody>
        </table>
      </div>
    </div>
    `;
  },
};

export default ProfileScreen;
