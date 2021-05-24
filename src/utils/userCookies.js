import Cookies from 'js-cookie';

// 设置Cookies
export function setUserCookie(info) {
  const arr = Object.entries(info);
  for (let i = 0; i < arr.length; i += 1) {
    Cookies.set(arr[i][0], arr[i][1]);
  }
  return true;
}

// 获取cookie
export function getUserCookie() {
  return {
    appkey: Cookies.get('appkey'),
    email: Cookies.get('email'),
    role: Cookies.get('role'),
    username: Cookies.get('username'),
  };
}

// 移除cookie
export function removeUserCookie() {
  Cookies.remove('username');
  Cookies.remove('appkey');
  Cookies.remove('email');
  Cookies.remove('role');
  return true;
}
