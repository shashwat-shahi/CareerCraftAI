export const isJSessionIdPresent = () => {
    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith('JSESSIONID=')) {
        return true; // JSESSIONID cookie is present
      }
    }
    return false; // JSESSIONID cookie is not present
};

export const removeJSessionIdCookie = () => {
  document.cookie = 'JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; Secure; SameSite=Strict';
};

