/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import { getOrders, deleteOrder } from '../api';
import DashboardMenu from '../components/DashboardMenu';
import { showMessage, reRender, setLoading, formatDate } from '../utils';

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
                            <td>${formatDate(order.createdAt)}</td>
                            <td>${order.totalPrice}</td>
                            <td>${order.user.name}</td>
                            <td>${
                              order.paidAt ? formatDate(order.paidAt) : 'No'
                            }</td>
                            <td>${
                              order.deliveredAt
                                ? formatDate(order.deliveredAt)
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
