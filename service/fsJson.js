const fs  = require('fs')

// fs.readFile('./index.txt','utf8',function(err,data){

//     let newData = data
//     console.log(newData)
// })
const lists = fs.readFileSync("index.txt").toString().split("\n")
console.log(lists[0].split("丨"))
// if (lines.includes("This is a line")) {
//   // Do something.
// }

// fs.readFile('./data_json/goods.json','utf8',function(err,data){

//     let newData = JSON.parse(data)
//     let pushData = []
//     let i = 0
//     newData.RECORDS.map(function(value,index){
//         if(value.IMAGE1!=null){
//             i++
//             console.log(value.NAME)
//             pushData.push(value)
//         } 
//     })
//     console.log(i)
//     //console.log(pushData)
//     fs.writeFile('./newGoods.json',JSON.stringify(pushData),function(err){
//         if(err) console.log('写文件操作失败')
//         else console.log('写文件操作成功')
//     })
// })

