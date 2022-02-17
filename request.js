
export async function getAppDataRequest(location){
    return location?fetch(`http://sailmoa.com/getDataFromGps?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`).then(res=>res.json()):
      fetch("http://sailmoa.com/?ver=0.93").then(res=>res.json())

    // return location?fetch(`http://192.168.1.171/getDataFromGps?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`).then(res=>res.json())
    // :fetch("http://192.168.1.171/?ver=0.93").then(res=>res.json())
}