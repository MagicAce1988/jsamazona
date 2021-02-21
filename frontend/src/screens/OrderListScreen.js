/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import moment from 'moment';
import { createOrder, getOrders, deleteOrder } from '../api';
import DashboardMenu from '../components/DashboardMenu';
import { showMessage, reRender, setLoading } from '../utils';

const OrderListScreen = {
  after_render: () => {
    const editButtons = document.getElementsByClassName('edit-button');
    [...editButtons].forEach((editButton) =>
      editButton.addEventListener('click', () => {
        document.location.hash = `/order/${editButton.id}/edit`;
      })
    );
    const deleteButtons = document.getElementsByClassName('delete-button');
    [...deleteButtons].forEach((deleteButton) =>
      deleteButton.addEventListener('click', async () => {
        if (confirm('Are you sure you want to delete this order?')) {
          setLoading(true);
          const data = await deleteOrder(deleteButton.id);
          if (data.error) {
            showMessage(data.error);
          } else {
            reRender(OrderListScreen);
          }
          setLoading(false);
        }
      })
    );
  },
  render: async () => {
    const orders = await getOrders();
    return `
    <div class="dashboard">
        ${DashboardMenu.render({ selected: 'orders' })}
        <div class="dashboard-content">
            <h1>Orders</h1>
            <div class="order-list">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>USER</th>
                            <th>PAID AT</th>
                            <th>DELIVERED AT</th>
                            <th class="tr-action">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${orders
                          .map(
                            (order) => `
                        <tr>
                            <td>${order._id}</td>
                            <td>${moment(order.createdAt).format(
                              'DD/MM/YYYY'
                            )}</td>
                            <td>${order.totalPrice}</td>
                            <td>${order.user.name}</td>
                            <td>${
                              order.paidAt
                                ? moment(order.paidAt).format('DD/MM/YYYY')
                                : 'No'
                            }</td>
                            <td>${
                              order.deliveredAt
                                ? moment(order.deliveredAt).format('DD/MM/YYYY')
                                : 'No'
                            }</td>
                            <td>
                            <button id="${
                              order._id
                            }" class="edit-button">Edit</button>
                            <button id="${
                              order._id
                            }" class="delete-button">Delete</button>
                            </td>
                        </tr>
                        `
                          )
                          .join('\n')}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    `;
  },
};

export default OrderListScreen;
