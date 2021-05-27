/**
 * 列出不同角色对应的路由名称
 * 然后进行筛选
 */

const roleToRoutesName = {
  coustomer: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'ProductAdd',
  }, {
    name: 'ProductEdit',
  }],
  admin: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'ProductAdd',
  }, {
    name: 'Category',
  }, {
    name: 'ProductEdit',
  }],
};

export default function filterUseRoutes(role, allRoutes) {
  const roleToAllRoutes = roleToRoutesName[role].map((it) => it.name);
  const resultRoutes = allRoutes.filter((r) => {
    const obj = r;
    if (roleToAllRoutes.indexOf(obj.name) !== -1) {
      obj.children = obj.children.filter((c) => roleToAllRoutes.indexOf(c.name) !== -1);
      return true;
    }
    return false;
  });
  // console.log(resultRoutes);
  return resultRoutes;
}
