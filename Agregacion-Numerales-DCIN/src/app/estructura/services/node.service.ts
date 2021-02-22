import { Injectable } from '@angular/core';
import { TdDialogService } from '@covalent/core/dialogs';
import { BehaviorSubject } from 'rxjs';


/**
 * Node for to-do name
 */
export class ItemNode {
  children: ItemNode[];
  name: string;
  idNode: number;
}

/** Flat to-do item node with expandable and level information */
export class ItemFlatNode {
  name?: string;
  level?: number;
  Id_NodoContable?: number;
  Id_NodoContablePadre?: number;
  Desc_NodoContablePadre?: string;
  Sk_RCNumeralCambiario?: number;
  idnumeralcco?: string;
  formulacion?: any[];
  expandable?: boolean;
  childs?: any;
  cbEliminado?: boolean;
  fechaEliminado?: string;
  Sk_NodoContable?: number;
}

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<ItemNode[]>([]);

  get data(): ItemNode[] { return this.dataChange.value; }

  constructor(
    private _dialogService: TdDialogService,
  ) {
    this.dataChange.subscribe((datos) => {

    });
  }

  /** Add an item to to-do list */
  insertItem(parent: ItemNode, name: string): ItemNode {
    //console.log("insertItem", parent, name);
    if (!parent.children) {
      parent.children = [];
    }
    const newItem = { name: name } as ItemNode;
    parent.children.push(newItem);
    this.dataChange.next(this.data);
    return newItem;
  }

  insertItemAbove(node: ItemNode, name: string): ItemNode {
    //console.log("insertItemAbove", node, name);
    const parentNode = this.getParentFromNodes(node);
    const newItem = { name: name } as ItemNode;
    if (parentNode != null) {
      parentNode.children.splice(parentNode.children.indexOf(node), 0, newItem);
    } else {
      this.data.splice(this.data.indexOf(node), 0, newItem);
    }
    this.dataChange.next(this.data);
    return newItem;
  }

  insertItemBelow(node: ItemNode, name: string): ItemNode {
    //console.log("insertItemBelow", node, name);
    const parentNode = this.getParentFromNodes(node);
    const newItem = { name: name } as ItemNode;
    if (parentNode != null) {
      parentNode.children.splice(parentNode.children.indexOf(node) + 1, 0, newItem);
    } else {
      this.data.splice(this.data.indexOf(node) + 1, 0, newItem);
    }
    this.dataChange.next(this.data);
    return newItem;
  }

  getParentFromNodes(node: ItemNode): ItemNode {
    //console.log("getParentFromNodes", node);
    for (let i = 0; i < this.data.length; ++i) {
      const currentRoot = this.data[i];
      const parent = this.getParent(currentRoot, node);
      if (parent != null) {
        return parent;
      }
    }
    return null;
  }

  getParent(currentRoot: ItemNode, node: ItemNode): ItemNode {
    //console.log("getParent", currentRoot, node);
    if (currentRoot.children && currentRoot.children.length > 0) {
      for (let i = 0; i < currentRoot.children.length; ++i) {
        const child = currentRoot.children[i];
        if (child === node) {
          return currentRoot;
        } else if (child.children && child.children.length > 0) {
          const parent = this.getParent(child, node);
          if (parent != null) {
            return parent;
          }
        }
      }
    }
    return null;
  }

  updateItem(node: ItemNode, name: string) {
    //console.log("updateItem", node, name);
    node.name = name;
    this.dataChange.next(this.data);
  }

  deleteItem(node: ItemNode) {
    //console.log("deleteItem", node);
    this.deleteNode(this.data, node);
    this.dataChange.next(this.data);
  }

  copyPasteItem(from: ItemNode, to: ItemNode): ItemNode {
    //console.log("copyPasteItem", from, to);
    const newItem = this.insertItem(to, from.name);
    if (from.children) {
      from.children.forEach(child => {
        this.copyPasteItem(child, newItem);
      });
    }
    return newItem;
  }

  copyPasteItemAbove(from: ItemNode, to: ItemNode): ItemNode {
    //console.log("copyPasteItemAbove", from, to);
    const newItem = this.insertItemAbove(to, from.name);
    if (from.children) {
      from.children.forEach(child => {
        this.copyPasteItem(child, newItem);
      });
    }
    return newItem;
  }

  copyPasteItemBelow(from: ItemNode, to: ItemNode): ItemNode {
    //console.log("copyPasteItemBelow", from, to);
    const newItem = this.insertItemBelow(to, from.name);
    if (from.children) {
      from.children.forEach(child => {
        this.copyPasteItem(child, newItem);
      });
    }
    return newItem;
  }

  deleteNode(nodes: ItemNode[], nodeToDelete: ItemNode) {
    //console.log("deleteNode", nodes, nodeToDelete);
    const index = nodes.indexOf(nodeToDelete, 0);
    if (index > -1) {
      nodes.splice(index, 1);
    } else {
      nodes.forEach(node => {
        if (node.children && node.children.length > 0) {
          this.deleteNode(node.children, nodeToDelete);
        }
      });
    }
  }
}