import { layoutBase } from "../layout/base";
import organization from "../layout/organization/organization";
import tree from "./tree";

class LayoutManager {
  private layoutMap = new Map<string, layoutBase>()
  register(type: string, layout: layoutBase, ){
    this.layoutMap.set(type, layout)
  }
  getLayout(type: string): layoutBase {
    const target = this.layoutMap.get(type)
    if(!target){
      throw new Error(`请先实现 ${type } 布局 !!!`)
    }
    return target
  }
}

export const layoutManager = new LayoutManager();

layoutManager.register('organization', organization)
layoutManager.register('tree', tree)