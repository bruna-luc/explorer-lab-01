import "./css/index.css" 
import IMask from "imask"

const bg_color01 = document.querySelector(".cc-bg svg > g  g:nth-child(1) path");
const bg_color02 = document.querySelector(".cc-bg svg > g  g:nth-child(2) path");

const flag = document.querySelector(".cc-logo span:nth-child(2) img");


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



// mask for security code
const securityCode = document.getElementById("security-code")
const securityCodePattern = {
  mask:"0000",
}

const securityCodeMasked = IMask(securityCode, securityCodePattern)

// mask for expitaretion date
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
      console.log(item.regex)
      return number.match(item.regex)
    })
    console.log(foundMask)

    return foundMask
  },
}


 const cardNumberMasked = IMask(cardNumber, cardNumberPattern)