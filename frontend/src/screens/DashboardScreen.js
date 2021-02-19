import DashboardMenu from '../components/DashboardMenu';

const DashboardScreen = {
  after_render: () => {},
  render: () => {
    const temp = 0;
    return `
    <div class="dashboard">
        ${DashboardMenu.render({ selected: 'dashboard' })}
        <div class="dashboard-content">
            <h1>Dashboard</h1>
            <div>
            Info and Charts
            </div>
        </div>
    </div>
    `;
  },
};

export default DashboardScreen;
