const Rating = {
  render: ({ value, text }) => {
    if (!value) return `<div></div>`;
    return `
    <div class="rating">
        ${[1, 2, 3, 4, 5]
          .map(
            (number) => `
        <span>
            <i class="${
              value >= number
                ? 'fa fa-star'
                : value >= number - 0.5
                ? 'fa fa-star-half-0'
                : 'fa fa-star-o'
            }"></i>
        </span>
        `
          )
          .join('\n')}
        <span>${text || ''}</span>
    </div>
    `;
  },
};

export default Rating;
