/**
 * @name  判断手机的方向
 * @return  [ string ] 'horizontal' => 横屏 'vertical' => 竖屏 '' => 未知
 */

export default function orientation() {
  if (window.orientation == 180 || window.orientation == 0) {
    return "horizontal";
  }
  if (window.orientation == 90 || window.orientation == -90) {
    return "vertical";
  }
  return "";
}
