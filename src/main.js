import "./css/index.css" 

const bg_color01 = document.querySelector(".cc-bg svg > g  g:nth-child(1) path")
const bg_color02 = document.querySelector(".cc-bg svg > g  g:nth-child(2) path")

const flag = document.querySelector(".cc-logo span:nth-child(2) img")


console.log(flag)




function setCardType(type){

  const color ={
    visa : [ "#436D99" ," #2D57F2"],
    mastercard: ["#C69347"," #DF6F29"],
    hipercard:["#822124" ," #561D1E"],
    default:["black", "gray"]

  }
bg_color01.setAttribute("fill",color[type][0])
bg_color02.setAttribute("fill", color[type][1])
flag.setAttribute("src",`cc-${type}.svg`)

}

// setCardType("hipercard")

globalThis.setCardType = setCardType;