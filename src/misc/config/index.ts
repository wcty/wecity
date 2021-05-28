
export const mapboxConfig = {
  accessToken: 'pk.eyJ1Ijoic3dpdGNoOSIsImEiOiJjamozeGV2bnkxajV2M3FvNnpod3h4ODlpIn0.CTt2IXV8II6finbTlxEddg',
}

export const querySize = 10

const origin = window.location.origin
console.log(origin)

export const BACKEND_ENDPOINT = 
  origin === 'http://localhost:3000' ? 'https://api-local.weee.city':
  origin === 'https://dev.weee.city' ? 'https://api-dev.weee.city':
  'https://api.weee.city'
