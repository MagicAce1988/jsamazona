/* eslint-disable no-alert */

import { getUserInfo, getShipping, setShipping } from '../localStorage';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = {
  after_render: () => {
    CheckoutSteps.after_render();
    const shippingForm = document.getElementById('shipping-form');
    shippingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const address = document.getElementById('address').value;
      const city = document.getElementById('city').value;
      const postalCode = document.getElementById('postalCode').value;
      const country = document.getElementById('country').value;
      setShipping({
        address,
        city,
        postalCode,
        country,
      });
      document.location.hash = '/payment';
    });
  },
  render: () => {
    const { name } = getUserInfo();
    if (!name) {
      document.location.hash = '/';
    }
    const { address, city, postalCode, country } = getShipping();
    return `
    ${CheckoutSteps.render({ step1: true, step2: true })}
    <div class="form-container">
        <form id="shipping-form">
            <ul class="form-items">
                <li>
                    <h1>Shipping</h1>
                </li>
                <li>
                    <label for="address">Address</label>
                    <input type="text" id="address" name="address" value="${address}"/>
                </li>
                <li>
                    <label for="city">City</label>
                    <input type="text" id="city" name="city" value="${city}"/>
                </li>
                <li>
                    <label for="postalCode">Postal Code</label>
                    <input type="text" id="postalCode" name="postalCode" value="${postalCode}"/>
                </li>
                <li>
                    <label for="country">Country</label>
                    <input type="text" id="country" name="country" value="${country}"/>
                </li>      
                <li>
                    <button type="submit" class="primary">Continue</button>
                </li>
            </ul>
        </form>
    </div>
    `;
  },
};

export default ShippingScreen;
