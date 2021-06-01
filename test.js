const fetch = require("node-fetch");

fetch("http://192.168.1.171:3000").then(res=>res.json())
.then(res=>{
  let arr=[]
  for(let i of Object.entries(res)){
    arr.push( { [ i[0] ] : [ i[1][0], i[1][1], i[1][2], i[1][3] ] })
  }
  //console.log(arr)
  //arr.sort((a,b)=>(Object.keys(a)[0].localeCompare(Object.keys(b)[0])))
  //console.log(arr)
  category=[...new Set( arr.map( v=> Object.values(v)[0][2] ) )]
  console.log(arr)
})