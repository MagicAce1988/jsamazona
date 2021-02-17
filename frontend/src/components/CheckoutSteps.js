const CheckoutSteps = {
  after_render: () => {
    const steps = document.querySelectorAll('.step');
    function redirectToStep() {
      if (this.classList.contains('active')) {
        document.location.hash = `/${this.innerText.toLowerCase()}`;
      }
    }
    [...steps].forEach((step) =>
      step.addEventListener('click', redirectToStep)
    );
  },
  render: (props) => `
    <div class="checkout-steps">
        ${['Signin', 'Shipping', 'Payment', 'Place Order']
          .map(
            (step, index) => `
        <div  class="step ${
          props[`step${index + 1}`] ? 'active' : ''
        }">${step}</div>
        `
          )
          .join('\n')}
    </div>
    `,
};

export default CheckoutSteps;
