export default class SortableTable {
  sortParams = {};
  element = null;
  subElements = null;

  constructor(headerConfig = [], data = []) {
    
      this.headerConfig = headerConfig;
      this.data = data;
      this.element = this.createElement(this.createTemplate());
      this.subElements = this.getSubElements();
      this.subElements.header.innerHTML = this.createHeaderTemplate();
      this.subElements.body.innerHTML = this.createRowTemplate();
  }
  createElement(template){
      const element = document.createElement("div")
      element.innerHTML = template;
  return element.firstElementChild;
  }
  createTemplate() {
      return `
          <div class="sortable-table">
              <div data-element="header" class="sortable-table__header sortable-table__row"></div>
              <div data-element="body" class="sortable-table__body"></div>
              <div data-element="loading" class="loading-line sortable-table__loading-line"></div>
              <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
                  <div>
                      <p>No products satisfies your filter criteria</p>
                      <button type="button" class="button-primary-outline">Reset all filters</button>
                  </div>
              </div>
          </div>
      `;
  }

  createHeaderTemplate() {
      const sortableCaretTemplate = () => `
          <span data-element="arrow" class="sortable-table__sort-arrow">
              <span class="sort-arrow">
          </span>
      `;

      return this.headerConfig
          .map(({ id = '', title = '', sortable = false, template }) => {
              if (template) return template();

              return `
                  <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order>
                      <span>${title}</span>
                      ${sortable ? sortableCaretTemplate() : ''}
                  </div>
              `;
          })
          .join('');
  }
createRowTemplate() {
      const cellTemplate = data => `<div class="sortable-table__cell">${data}</div>`;

      return this.data
          .map(({ id = '', images = [], title = '', quantity = 0, price = 0, sales = 0, }) => {
              return `
                  <a href="/products/${id}" class="sortable-table__row">
                      ${images.length && cellTemplate('<img class="sortable-table-image" alt="Image" src="' + images[0] + '">')}
                      ${title && cellTemplate(title)}
                      ${quantity && cellTemplate(quantity)}
                      ${price && cellTemplate(price)}
                      ${sales && cellTemplate(sales)}
                  </a>
              `;
          })
          .join('');
  }

  getSubElements() {
      const subElements = {};

      for (const elem of this.element.querySelectorAll('[data-element]')) {
          const name = elem.dataset.element;
          subElements[name] = elem;
      }

      return subElements;
  }

  sort(field = 'title', param = 'asc') {
    this.sortParams = { field, param };

    const sortedData = [ ...this.data ];
    const sortType = this.headerConfig.find(item => item.id === field).sortType;
    const locales = ["ru", "en"];
const paramValue = param == 'asc' ? 1 : -1;
    const compare = sortedData.sort((a, b)=> {
        if (sortType === 'string') {
            return paramValue * a[field].localeCompare(b[field],locales);
        }
        if (sortType === 'number') {
            return paramValue * (a[field] - b[field]);
        }
    });

    this.update(sortedData);
}
  update(data = []) {
          this.data = data;
          this.subElements.body.innerHTML = this.createRowTemplate();
          this.subElements.header.innerHTML = this.createHeaderTemplate();
          const sortHeaderCellElem = this.subElements.header.querySelector(`[data-id="${this.sortParams.field}"]`);
          sortHeaderCellElem.dataset.param = this.sortParams.param;
  }

  remove() {
          this.element.remove();
  }

  destroy() {
      this.remove();
  }
}
