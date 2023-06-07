export function dealRoutes(routes, index) {
  if (index < 0) {
    console.log(routes)
    return routes;
  } else {
    routes[index].component = asyncComponent(routes[index].component);
    if (!(routes[index].path.includes("/:userId"))) {
      routes[index].path = routes[index].path.slice(1) + "/:userId"
      routes[index].path = routes[index].path.slice(routes[index].path.indexOf("/") + 1)
    }
    if (routes[index].children && routes[index].children.length > 0) {
      routes[index].children = routes[index].children.map((item) => {
        asyncComponent(item.component);
        if (!(item.path.includes("/:userId"))) {
          item.path = item.path.slice(1) + "/:userId"
          item.path = item.path.slice(item.path.indexOf("/") + 1)

        }
        return item;
      });
    }
    return dealRoutes(routes, index - 1);
  }
}

function asyncComponent(path) {
  if (path[0] == "/") {
    path = path.slice(1)
  }
  return () => import(`@/views/${path}`);
}


export function dealpaths(routes, index, name, newArr = []) {
  if (index > routes.length - 1) {
   
    return [...new Set(newArr)];
  } else {
    if (Reflect.has(routes[index], name)) {
      newArr.push(routes[index]);
      return dealpaths(routes, index + 1, name, newArr);
    } else if (routes[index].children && routes[index].children.length > 0) {
      newArr.push(...dealChildrenPaths(routes[index].children, newArr, name));
      return dealpaths(routes, index + 1, name, newArr);
    }

    return dealpaths(routes, index + 1, name, newArr);
  }
}

function dealChildrenPaths(routes, newArr, name, index2 = 0) {
  if (routes[index2]) {
    newArr.push(...routes.filter((item) => Reflect.has(item, name)));
    if (routes[index2].children) {
      routes[index2].hasForeach = true;
      return dealChildrenPaths(routes[index2].children, newArr, name);
    } else {
      return dealChildrenPaths(routes, newArr, name, index2 + 1);
    }
  } else {
    return [...new Set(newArr)];
  }
}
