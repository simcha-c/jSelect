const DomNodeCollection = require('./dom_node_collection.js');

window.$l = (arg) => {
  if (typeof arg === 'object') {
    const newArg = [].slice.call(arg);
    const dom = new DomNodeCollection(newArg);
    return dom;
  }
  if (typeof arg === 'string') {
    const newArg = [].slice.call(document.querySelectorAll(arg));
    const dom = new DomNodeCollection(newArg);
    return dom;
  }
};

window.DomNodeCollection = DomNodeCollection;
