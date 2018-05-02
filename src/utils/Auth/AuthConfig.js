const dev = false;
export const AUTH_CONFIG = {
  domain: 'cavallaro.auth0.com',
  clientId: 'DAqjk8dCiDVT92kKaFePHydBq552Ae1l',
  callbackUrl: (dev ? 'http://localhost:3000' :'https://paintify.herokuapp.com') +'/callback'
}
