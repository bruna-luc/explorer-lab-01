import "./css/index.css" 
import IMask from "imask"

// trabalhando com a DOM

const bg_color01 = document.querySelector(".cc-bg svg > g  g:nth-child(1) path");
const bg_color02 = document.querySelector(".cc-bg svg > g  g:nth-child(2) path");

const flag = document.querySelector(".cc-logo span:nth-child(2) img");

function setCardType(type){

  const color ={
    visa : [ "#436D99" ," #2D57F2"],
    mastercard: ["#C69347"," #DF6F29"],
    hipercard:["#822124" ," #561D1E"],
    default:["black", "gray"],

  }

bg_color01.setAttribute("fill",color[type][0])
bg_color02.setAttribute("fill", color[type][1])
flag.setAttribute("src",`cc-${type}.svg`)

}

globalThis.setCardType = setCardType;



const securityCode = document.getElementById("security-code")
const securityCodePattern = {
  mask:"0000",
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)



const expirationDate = document.getElementById("expiration-date")
const expirationDatePattern = {
  mask: "mm{/}yy",
  blocks: {

    yy:{
 mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() +10).slice(2),
      maxLength: 2,
    },
    mm: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
      maxLength: 2,
    },
  }
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)



const cardNumber = document.getElementById("card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^38|^60)\d{0,14}/,
      cardtype: "hipercard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },
  ],

  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")

    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      // console.log(item.regex)
      return number.match(item.regex)
    })
    // console.log(foundMask)

    return foundMask
  },
}
 const cardNumberMasked = IMask(cardNumber, cardNumberPattern)



// EVENTOS  

const addButton =document.getElementById("addCard")

addButton.addEventListener("click", () => {console.log("Opa o botão esta funcionando");})

document.querySelector("form").addEventListener("submit",(evento) =>{
  evento.preventDefault()
})



securityCodeMasked.on ("accept", () => {

  upadeteSecurityCode(securityCodeMasked.value)
})

function upadeteSecurityCode (code){
 const ccSecutiry = document.querySelector(".cc-security .value")

  ccSecutiry.innerText = code.length === 0 ? "123" : code;
  
}



expirationDateMasked.on("accept", () => {
 
  upadeteExpirationDate(expirationDateMasked.value)
})

function upadeteExpirationDate(date) {
  const ccExpirationDate = document.querySelector(".cc-expiration .value")

  ccExpirationDate.innerText = date.length === 0 ? "02/32" : date
}



const ccCardHolder = document.querySelector("#card-holder")

 ccCardHolder.addEventListener("keypress", function (event) {
 
  const keyCode = event.keyCode ? event.keyCode : event.wich
  // console.log(keyCode)
  if (keyCode > 47 && keyCode < 58) {
    event.preventDefault()
}})
ccCardHolder.addEventListener("input",() =>{
  upadeteCardHolder(ccCardHolder.value)
})

function upadeteCardHolder(holder) {
const CardHolder = document.querySelector(".cc-holder .value")

CardHolder.innerText = holder.length === 0 ? "FULANO DA SILVA" : holder;

}



cardNumberMasked.on("accept", () => {

  upadeteCardNumber(cardNumberMasked.value)

  const cardType = cardNumberMasked.masked.currentMask.cardtype
  globalThis.setCardType(cardType)
})

function upadeteCardNumber(number) {
  const ccCardNumber = document.querySelector(".cc-number")
  ccCardNumber.innerText = number.length === 0 ? "1234 5678 9012 3456" : number;

}



