function caesarShift(text,shift){
    s='';
    for(i=0;i<text.length;i++){
        if(text.charCodeAt(i)>=97 && text.charCodeAt(i)<=122){s+=String.fromCharCode((text.charCodeAt(i)-97+shift)%26+97)}
        else if(text.charCodeAt(i)>=65 && text.charCodeAt(i)<=90){s+=String.fromCharCode((text.charCodeAt(i)-65+shift)%26+65)}
        else{s+=text[i]}
    }
    return s
}

function caesarShiftRev(text,shift){
    s='';
    for(i=0;i<text.length;i++){
        if(text.charCodeAt(i)>=97 && text.charCodeAt(i)<=122){
            offset=(text.charCodeAt(i)-97-shift)%26;
            if(offset<0){
                s+=String.fromCharCode(123+offset)   
            }
            else{
                s+=String.fromCharCode(offset+97)
            }
        }
        else if(text.charCodeAt(i)>=65 && text.charCodeAt(i)<=90){
            offset=(text.charCodeAt(i)-65-shift)%26;
            if(offset<0){
                s+=String.fromCharCode(91+offset);
            }
            else{
                s+=String.fromCharCode(65+offset);
            }
        }
        else{s+=text[i]}
    }
    return s
}

function isLower(s){
    if(s.charCodeAt(0)>=97 && s.charCodeAt(0)<=122){return true}
    else{return false}
}

function isUpper(s){
    if(s.charCodeAt(0)>=65 && s.charCodeAt(0)<=90){return true}
    else{return false}
}

function isLetter(s){
    c = s.charCodeAt(0);
    if((c>=65 && c<=90) || (c>=97 && c<=122)){return true}
    else{return false}
}

function generateKey(ciphertext,key){
    key=key.toLowerCase();
    key=key.split('');
    key1=[];
    for(ch in key){
        if(isLetter(key[ch])){key1.push(key[ch])}
    }
    key=key1;
    temp = key.length
    for(i=0;i<ciphertext.length-temp;i++){
        key.push(key[i%key.length])
    }
    return key.join('')
}

function vignereEncrypt(text,key){
    key = generateKey(text,key)
    s=''
    for(i=0;i<text.length;i++){
        if(isUpper(text[i])){flag=true}
        else{flag=false}
        ch1 = String.fromCharCode((text.toLowerCase().charCodeAt(i)-97+key.charCodeAt(i%key.length)-97)%26+97)
        if(flag){ch1=ch1.toUpperCase()}
        s+=ch1;
    }
    return s;
}

function vignereDecrypt(cipher,key){
    key1 = ''
    key = key.toLowerCase();
    for(i=0;i<key.length;i++){
        key1+=(String.fromCharCode((26-(key.charCodeAt(i)-97)%26+97)));
    }
    s = vignereEncrypt(cipher,key1);
    return s;
}

function railEncrypt(text,rail){
    arr = new Array(rail);
    for(i=0;i<rail;i++){
        arr[i]=[];
    }
    j=0;
    flag=true;

    for(i=0;i<text.length;i++){
        if(j==rail){flag=false;j-=2};
        if(j==-1){flag=true;j+=2};
        arr[j].push(text[i]);
        if(flag){j++}
        else{j--}
    }
    s=''
    for(i=0;i<rail;i++){
        s+=arr[i].join('');
    }
    return s;
}

function railDecrypt(cipher,rail){
    arr = new Array(rail);
    for(i=0;i<rail;i++){
        arr[i]=[];
    }
    j=0;
    flag=true;

    for(i=0;i<cipher.length;i++){
        if(j==rail){flag=false;j-=2};
        if(j==-1){flag=true;j+=2};
        arr[j].push(cipher[i]);
        if(flag){j++}
        else{j--}
    }

    index=0;
    arr1=[];

    for(i=0;i<rail;i++){
        arr1.push(cipher.slice(index,index+arr[i].length).split('').reverse())
        index+=arr[i].length;
    }

    s=''
    j=0;
    flag=true;

    for(i=0;i<cipher.length;i++){
        if(j==rail){flag=false;j-=2};
        if(j==-1){flag=true;j+=2};
        s+=arr1[j].pop();
        if(flag){j++}
        else{j--}
    }

    return s;
}

function encode(){
    if(document.querySelector("select[name='cipher']").value=='Caesar'){
        document.querySelector("textarea[class='ciphertext']").value=caesarShift(document.querySelector("textarea[class='content']").value,Number(document.querySelector("input[value='shift']").value))
    }
    else if(document.querySelector("select[name='cipher']").value=='Vigenere'){
        document.querySelector("textarea[class='ciphertext']").value=vignereEncrypt(document.querySelector("textarea[class='content']").value,document.querySelector("input[name='key']").value)
    }
    else if(document.querySelector("select[name='cipher']").value=='Rail'){
        document.querySelector("textarea[class='ciphertext']").value=railEncrypt(document.querySelector("textarea[class='content']").value,document.querySelector("input[value='rail']").value)
    }
}

function decode(){
    if(document.querySelector("select[name='cipher']").value=='Caesar'){
        document.querySelector("textarea[class='ciphertext']").value=caesarShiftRev(document.querySelector("textarea[class='content']").value,Number(document.querySelector("input[value='shift']").value))
    }
    else if(document.querySelector("select[name='cipher']").value=='Vigenere'){
        document.querySelector("textarea[class='ciphertext']").value=vignereDecrypt(document.querySelector("textarea[class='content']").value,document.querySelector("input[name='key']").value)
    }
    else if(document.querySelector("select[name='cipher']").value=='Rail'){
        document.querySelector("textarea[class='ciphertext']").value=railDecrypt(document.querySelector("textarea[class='content']").value,document.querySelector("input[value='rail']").value)
    }
    
}

function changeArgs(){
    if(document.querySelector("select").value=="Vigenere"){
        document.querySelector("span[class='args']").innerHTML= "Key Value:<br><input type=\"text\" name=\"key\">"
    }
    else if(document.querySelector("select").value=="Caesar"){
        document.querySelector("span[class='args']").innerHTML= "Shift Value:<br><input type=\"number\" value=\"shift\">"
    }
    else if(document.querySelector("select").value=="Rail"){
        document.querySelector("span[class='args']").innerHTML= "No. of Rails:<br><input type=\"number\" value=\"rail\">"
    }
}

function changeDesc(){
    if(document.querySelector("select").value=="Vigenere"){
        document.querySelector("div[class='dabba']").innerHTML= "<h3>Vigenere Cipher</h3>\n<span class=\"popup\">The Vigenère cipher is a method of encrypting alphabetic text by using a series of interwoven Caesar ciphers, based on the letters of a keyword. It employs a form of <a href=\"https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Vigen%C3%A8re_square.svg/2048px-Vigen%C3%A8re_square.svg.png\" target=\"new\">polyalphabetic substitution</a>.</span>"
    }
    else if(document.querySelector("select").value=="Caesar"){
        document.querySelector("div[class='dabba']").innerHTML= "<h3>Caesar Cipher</h3>\n<span class=\"popup\">Caesar ciphers use a substitution method where letters in the alphabet are shifted by some fixed number of spaces to yield an encoding alphabet. A Caesar cipher with a shift of 11 would encode an A as a B, an M as an N, and a Z as an A, and so on.</span>"
    }
    else if(document.querySelector("select").value=="Rail"){
        document.querySelector("div[class='dabba']").innerHTML= "<h3>Rail Cipher</h3>\n<span class=\"popup\">The rail fence cipher (also called a zigzag cipher) is a classical type of transposition cipher. It derives its name from the manner in which encryption is performed, in analogy to a fence built with horizontal rails.</span>"
    }
}




document.querySelector("button[value='Encode']").addEventListener("click",encode);
document.querySelector("button[value='Decode']").addEventListener("click",decode);
document.querySelector("select[name='cipher']").addEventListener("click",changeArgs);
document.querySelector("select[name='cipher']").addEventListener("click",changeDesc);
document.querySelector("a[class='nouline']").addEventListener("click",function(){
    document.querySelector("div[class='overlay']").style.visibility = "visible";
})

document.querySelector("div[class='overlay']").addEventListener("click",function() {
    document.querySelector("div[class='overlay']").style.visibility = "hidden";
})