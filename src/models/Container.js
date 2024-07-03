import { v4 as uuidv4 } from 'uuid';

class Container {
  constructor({
    id = uuidv4(),
    name,
    description,
    contentMetadata = {},
    parentId = null,
    permissions = {},
    dynamicAttributes = {},
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.contentMetadata = contentMetadata;
    this.parentId = parentId;
    this.permissions = permissions;
    this.dynamicAttributes = dynamicAttributes;
  }

  // Method to add child container
  addChild(container) {
    if (!this.children) {
      this.children = [];
    }
    this.children.push(container);
  }

  // Method to set permissions
  setPermissions(permissions) {
    this.permissions = permissions;
  }

  // Method to add dynamic attributes
  addDynamicAttribute(key, value) {
    this.dynamicAttributes[key] = value;
  }

  // Method to get hierarchical metadata
  getHierarchy() {
    const hierarchy = [];
    let currentContainer = this;
    while (currentContainer) {
      hierarchy.unshift(currentContainer);
      currentContainer = currentContainer.parentId;
    }
    return hierarchy;
  }

  // Method to get relational metadata
  getRelationalMetadata() {
    return {
      parentId: this.parentId,
      children: this.children || [],
    };
  }
}

export default Container;