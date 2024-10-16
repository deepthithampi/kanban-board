import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try{
    const response = await fetch(
      '/api/login',{
        method: 'POST',
        headers:{
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(userInfo)
      }
    )
   
    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }
    const data = await response.json();
    return data;
  }catch(e){
    return Promise.reject('UserLogin failed to create');
  }
}



export { login };
