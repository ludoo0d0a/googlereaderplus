
var initialVal=1;
var calculatedVal=0 ;
 
function doBigCalc(theData) {
    //injected -> global
    safari.self.tab.dispatchMessage("calcThis",theData);
}
 
function getAnswer(theMessageEvent) {
   if (theMessageEvent.name === "theAnswer") {
      calculatedVal=theMessageEvent.message;
      console.log(calculatedVal);
   }
}
//global -> injected
safari.self.addEventListener("message", getAnswer, false);
 
doBigCalc(initialVal);