import axios from 'axios'

const request = axios.created({
    url:"",
    token:sessionStorage.getItem("token")||""
})