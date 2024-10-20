import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    return token? jwtDecode<JwtPayload>(token):null;
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    try{
      const decoded = jwtDecode<JwtPayload>(token);
      if(decoded.exp){
        return decoded.exp * 1000 < Date.now();
      }
      return true;

    }catch(e){
      return true;
    }
  }

  getToken(): string {
    // TODO: return the token
    return localStorage.getItem('token')||'';
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem('token',idToken)
    // TODO: redirect to the home page
    window.location.assign('/')
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('token')
    // TODO: redirect to the login page
    // window.location.assign('/login') 
    //for seeding live needed to comment this and used useNavigate in the navnar component
  }
}

export default new AuthService();
