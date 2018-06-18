/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var textCode = "";
var numCode = "";
var result="";

var alphabet = "abcdefghijklmnopqrstuvwxyz";
var num = "0123456789";


export function TextCode( textLength ){
  for( var i=0; i < textLength; i++ )
  {
      textCode += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }

  result = textCode;

  textCode = "";

  return result;
}

export function NumCode( numLength ){
  for( var i=0; i < numLength; i++ )
  {
      numCode += num.charAt(Math.floor(Math.random() * num.length));
  }

  result = numCode;

  numCode = "";

  return result;
}

export function TextNumCode( textLength, numLength ){

   for( var i=0; i < textLength; i++ )
   {
       textCode += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
   }

   for( var i=0; i < numLength; i++ )
   {
       numCode += num.charAt(Math.floor(Math.random() * num.length));
   }

   result = textCode+numCode;

   textCode = "";
   numCode = "";

   return result;
}