export default function({ $axios, redirect, $auth, $notify }) {
  $axios.onRequest((config) => {
    // eslint-disable-next-line no-console
    console.log('Making request to ' + config.url)
  })
  $axios.onError((error) => {
    // const code = parseInt(error.response && error.response.status);
    // if (400 === code) {
    // redirect('/');
    // eslint-disable-next-line no-console
    console.log('has error' + error)
    // }
  })

  // $axios.setHeader('Accept', 'application/json');

  // Set baseURL to something different
  $axios.setBaseURL('http://localhost:3333/api/v1/')
}
