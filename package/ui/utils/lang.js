/**
 * 合并props属性
 * 只能 duration: { type: Number } 而非 duration: Number
 */
export const mergeProps = function(target, resource) {
  let resourceKeys = Object.keys(resource);
  resourceKeys.forEach(key => {
    target[key] && (target[key]['default'] = resource[key]);
  });
  return target;
};
