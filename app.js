const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const amount_entered=document.querySelector(".amount");
const dropdown_opn=document.querySelectorAll(".dropdown select");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".final-msg");
const btn=document.querySelector("form button");

for(let select of dropdown_opn){    //selecting 1 by 1 select of dropdown
      for(currCode in countryList) {//selecting currency code in list

        let newOption=document.createElement("option");   //creating element name option
        newOption.innerText=currCode;
        newOption.value=currCode;
        select.append(newOption);    //adding all countries in new option and put it in select
        if(select.name==="from" && currCode==="USD"){
          newOption.selected="selected";
        }else if(select.name==="to" && currCode==="INR"){
          newOption.selected="selected";
         }
        select.append(newOption);
}
select.addEventListener("change",(evt)=>{    //when selected element changes update flag to target(selected element)
  updateFlag(evt.target);
});
}

const updateFlag=(element)=>{
  let currCode= element.value;
  let countryCode=countryList[currCode];
  let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
  let img=element.parentElement.querySelector("img");
  img.src=newSrc;
};

btn.addEventListener("click",async(evt)=>{
  evt.preventDefault(); //to prevent previous loading etc things
  let amount=document.querySelector(".amount input");
  let amountVal=amount.value;
  if(amountVal==="" || amountVal<1){
    amountVal=1;
    amount.value="1";
  }

  const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response= await fetch(URL);
  let data=await response.json();
  let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
   let finalAmount=rate*amountVal;

   msg.innerText=`${amountVal} ${fromCurr.value}= ${finalAmount} ${toCurr.value}`;
});

