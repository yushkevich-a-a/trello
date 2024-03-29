export default class DrawWidget {
  constructor() {
    this.init();
  }

  init() {
    this.widget = document.createElement('div');
    this.widget.classList.add('widget-task');
    document.body.appendChild(this.widget);
  }

  drawWidget(data) {
    this.data = data;
    this.widget.innerHTML = '';
    this.darwLists();
  }

  darwLists() {
    for (const i of this.data) {
      const blockTaskList = document.createElement('div');
      blockTaskList.classList.add('block-task-list');
      blockTaskList.innerHTML = `<div>
                                  <div class="block-title">
                                    <h2 class="title-task-list">todo</h2>
                                    <div class="title-menu">...</div>
                                  </div>
                                  <ul class="list-block">
                                  </ul>
                                </div>
                                <div class="block-add-item">
                                  <div class="add-field disabled">
                                    <textarea class="textarea-add"></textarea>
                                    <div class="textarea-buttons">
                                      <div class="button-submit">
                                        Add card
                                      </div>
                                      <div class="button-cancel"></div>
                                    </div>
                                  </div>
                                  <div class="add-block">
                                    Add another card
                                  </div>
                                </div>`;

      this.widget.appendChild(blockTaskList);

      const title = blockTaskList.querySelector('.title-task-list');
      title.textContent = i.title;
      const list = blockTaskList.querySelector('.list-block');
      this.drawContent(i.data, list);
    }
  }

  drawContent(data, element) {
    for (const i of data) {
      const li = document.createElement('li');
      li.classList.add('task-item');
      li.innerHTML = '<div class="item-content"></div>';
      const itemContent = li.querySelector('.item-content');
      this.drawImg(i.img, itemContent);
      this.drawText(i.text, itemContent);
      this.drawIcons(i.icons, itemContent);
      li.insertAdjacentHTML('beforeend', '<div class="delete-item"></div>');
      element.appendChild(li);
    }
  }

  drawImg(dataImg, element) {
    if (dataImg === null) {
      return;
    }
    const contentBlock = document.createElement('div');
    contentBlock.classList.add('content-block', 'img-block');
    const img = document.createElement('img');
    img.classList.add('img');
    img.src = dataImg.src;
    img.alt = dataImg.alt || 'контент';
    contentBlock.appendChild(img);
    element.appendChild(contentBlock);
  }

  drawText(dataText, element) {
    if (dataText === null) {
      return;
    }
    const contentBlock = document.createElement('div');
    contentBlock.classList.add('content-block', 'text-block');
    const p = document.createElement('p');
    p.classList.add('p');
    p.textContent = dataText;
    contentBlock.appendChild(p);
    element.appendChild(contentBlock);
  }

  drawIcons(dataIcons, element) {
    if (dataIcons === null) {
      return;
    }
    const contentBlock = document.createElement('div');
    contentBlock.classList.add('content-block', 'icons');
    for (const i of dataIcons) {
      if (i.value === null) {
        continue;
      }
      const icon = document.createElement('div');
      icon.classList.add('icon', i.name);

      if (i.name === 'check') {
        if (i.value.count === null) {
          continue;
        }
        icon.textContent = `${i.value.result}/${i.value.count}`;
      } else {
        icon.textContent = i.value;
      }
      contentBlock.appendChild(icon);
    }

    element.appendChild(contentBlock);
  }
}
