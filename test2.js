(async()=>{
    const fetch = require('node-fetch');

    fetch("http://192.168.1.171:3000?ver=0.91").then(res=>res.json())
      .then(res=>{
        if(res.error){
        console.log(res)
        }
      })
})()