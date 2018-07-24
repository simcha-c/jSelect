class DomNodeCollection {

  constructor(nodes) {
    this.nodes = nodes;
  }

  html(str) {
    if (typeof str === 'string') {
      this.nodes.forEach(node => {
        node.innerHTML = str;
      });
    } else {
      return this.nodes[0].innerHTML;
    }
  }

  empty() {
    this.html('');
  }

  append(els) {
    if (this.nodes.length === 0) return;

    if (typeof els === 'object' && !(els instanceof DomNodeCollection)) {
      els = $l(els);
    }

    if (typeof els === 'string') {
      this.nodes.forEach(node => {
        node.innerHTML += els;
      });
    } else if (els instanceof DomNodeCollection) {
      this.nodes.forEach(node => {
        els.nodes.forEach(el => {
          node.innerHTML += el.outerHTML;
        });
      });
    }

  }

  attr(name, value) {
    if (value) {
      this.nodes.forEach(node => {
        node.attributes[name] = value;
      });
    } else if (name) {
      const node = this.nodes[0];
      return node.attributes[name];
    }
  }

  addClass(value) {
    this.nodes.forEach(node => {
      node.classList = `${node.classList} ${value}`;
    });
  }

  removeClass(value) {
    this.nodes.forEach(node => {
      node.classList.remove(value);
    });
  }

  children() {
    let childrenArr = [];
    this.nodes.forEach(node => {
      childrenArr = childrenArr.concat(Array.from(node.children));
    });
    return new DomNodeCollection(childrenArr);
  }

  parent() {
    let parentArr = [];
    this.nodes.forEach(node => {
      if (!parentArr.includes(node.parentNode)) {
        parentArr = parentArr.concat([node.parentNode]);
      }
    });
    return new DomNodeCollection(parentArr);
  }

  find(selector) {
    let foundArr = [];
    this.nodes.forEach(node => {
      const list = node.querySelectorAll(selector);
      foundArr = foundArr.concat(Array.from(list));
    });
    return new DomNodeCollection(foundArr);
  }

  remove() {
    this.nodes.forEach(node => {
      node.parentNode.removeChild(node);
    });
  }



}

module.exports = DomNodeCollection;
















//
