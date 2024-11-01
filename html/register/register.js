function onLoad(){
    const slideshow = document.querySelector(".slideshow");
    const slideshow_slides = document.querySelector(".slideshow_slides");
    const slidesArray = document.querySelectorAll(".slideshow_slides a");
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");
    const indicatiorArray = document.querySelectorAll(".slideshow_indicatior a");

    let currentIndex = 0;
    let timerID = null;
    let slideCount = slidesArray.length;
    for(let i=0; i<slideCount; i++){
        let newLeft = `${i*100}%`;
        slidesArray[i].style.left = newLeft;
    }
    function gotoslide(index){
        currentIndex = index;
        let newLeft = `${index* -100}%`;
        slideshow_slides.style.left = newLeft;

        for(let i=0; i<slideCount; i++){
            indicatiorArray[i].classList.remove('active');
        }
        indicatiorArray[index].classList.add('active');
    }
    gotoslide(1);

    function startTimer(){
        timerID = setInterval(()=>{
            let index = (currentIndex + 1) % slideCount;
            currentIndex = index;
            gotoslide(index);
        }, 3000);
    }
    startTimer();

    slideshow_slides.addEventListener("mouseenter", (event)=>{
        clearInterval(timerID);
    });

    slideshow_slides.addEventListener("mouseleave", (event)=>{
        startTimer();
    });

    prev.addEventListener("mouseenter", (event)=>{
        clearInterval(timerID);
    });

    prev.addEventListener("mouseleave", (event)=>{
        startTimer();
    });

    next.addEventListener("mouseenter", (event)=>{
        clearInterval(timerID);
    });

    next.addEventListener("mouseleave", (event)=>{
        startTimer();
    });

    prev.addEventListener("click", (event)=>{
        event.preventDefault();
        currentIndex = currentIndex -1
        if(currentIndex < 0){
            currentIndex = slideCount -1;
        }
        gotoslide(currentIndex);
    });

    next.addEventListener("click", (event)=>{
        event.preventDefault();
        currentIndex = currentIndex +1
        if(currentIndex > (slideCount -1)){
            currentIndex = 0;
        }
        gotoslide(currentIndex);
    });

    indicatiorArray.forEach((obj)=>{
        obj.addEventListener("mouseenter",(event)=>{
            clearInterval(timerID);
        });
    });

    indicatiorArray.forEach((obj)=>{
        obj.addEventListener("mouseleave",(event)=>{
            startTimer();
        });
    });

    indicatiorArray.forEach((obj,index)=>{
        obj.addEventListener("click",(event)=>{
            event.preventDefault();
            gotoslide(index);
        });
    });

    //패턴검색내용
    const idPattern = /^[\w]{3,}$/; //영문자, 숫자, _만 입력 가능 {3,} 3글자이상가능
    const pwdPattern = /^[\w]{6,10}$/; //영문자와 숫자, _ 6~10
    const namePattern = /^[가-힣]{2,4}|[A-Z]{1}[a-zA-Z\x20]{1,9}$/; //한글 2~4글자, 영문자 2~10 첫글자는 대문자, 공백가능
    const datePattern = /^[\d]{4}$/; //\d 숫자만 가능
    const emailPattern = /^[a-z0-9_+.-]+@([a-z0-9-]+.)+[a-z0-9]{2,4}$/;
    const mobilePattern = /^010-(?:[\d]{3}|[\d]{4})-[\d]{4}$/; //\d 숫자만 가능
    const numberPattern = /^[\d]{6}$/; //\d 숫자만 가능
    
    //객체찾기
    const inputID = document.querySelector("#id");
    const inputPW1 = document.querySelector("#pwd1");
    const inputPW2 = document.querySelector("#pwd2");
    const inputName = document.querySelector("#name");
    const inputDate = document.querySelector("#year");
    const inputEmail = document.querySelector("#email");
    const inputMobile = document.querySelector("#tel");
    const inputNumber = document.querySelector("#num");
    
    //폼객체찾기
    const join = document.querySelector(".join");
    
    //이벤트리스너등록 및 핸들러처리
    inputID.addEventListener("blur",()=>validate(inputID, idPattern, "영문자, 숫자, _만 입력 가능"));
    inputPW1.addEventListener("blur",()=>validate(inputPW1, pwdPattern, "영문자와 숫자, _ 6~10"));
    inputPW2.addEventListener("blur",()=>{
        validate(inputPW2, pwdPattern, "영문자와 숫자, _ 6~10");
        if(inputPW1.value !== inputPW2.value){
            inputPW2.nextSibling.textContent = "패스워드가 일치하지 않습니다.";
            inputPW2.nextSibling.style.color = "red";
            inputPW1.value = "";
            inputPW2.value = "";
            inputPW1.focus();
            return;
        }
    });
    inputName.addEventListener("blur",()=>validate(inputName, namePattern, "한글 2~4글자, 영문자 2~10 첫글자는 대문자, 공백가능"));
    inputDate.addEventListener("blur",()=>validate(inputDate, datePattern, "출생연도를 입력해주세요"));
    inputEmail.addEventListener("blur",()=>validate(inputEmail, emailPattern, "이메일형식 안맞음"));
    inputMobile.addEventListener("blur",()=>validate(inputMobile, mobilePattern, "모바일전화번호형식이 안맞음"));
    inputNumber.addEventListener("blur",()=>validate(inputNumber, numberPattern, "인증번호를 입력해주세요"));
    
    //폼 이벤트등록 및 핸들러처리
    join.addEventListener("submin",(e)=>{
        e.preventDefault();
        validate(inputID, idPattern, "영문자, 숫자, _만 입력 가능");
        validate(inputPW1, pwdPattern, "영문자와 숫자, _ 6~10");
        validate(inputPW2, pwdPattern, "영문자와 숫자, _ 6~10");
        if(inputPW1.value !== inputPW2.value){
            inputPW2.nextSibling.textContent = "패스워드가 일치하지 않습니다.";
            inputPW2.nextSibling.style.color = "red";
            inputPW1.value = "";
            inputPW2.value = "";
            inputPW1.focus();
            return;
        }
        validate(inputName, namePattern, "한글 2~4글자, 영문자 2~10 첫글자는 대문자, 공백가능");
        validate(inputDate, datePattern, "출생연도를 입력해주세요");
        validate(inputEmail, emailPattern, "이메일형식 안맞음");
        validate(inputMobile, mobilePattern, "모바일전화번호형식이 안맞음");
        validate(inputNumber, numberPattern, "인증번호를 입력해주세요");
    });
    
    //핸들러처리기능
    function validate(userInput, pattern, message){
        if(userInput.value.match(pattern)){
            userInput.nextSibling.innerHTML = "성공";
            userInput.nextSibling.style.color = "blue";
        }else{
            userInput.nextSibling.innerHTML = message;
            userInput.nextSibling.style.color = "red";
            userInput.value = "";
            userInput.focus();
            return;
        }
    }
}