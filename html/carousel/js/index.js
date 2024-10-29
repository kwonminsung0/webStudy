function carousel(){
    //화면객체 가져온다.
    let slideshow = document.querySelector(".slideshow");
    let slideshow_slides = document.querySelector(".slideshow_slides");
    let slidesArray = document.querySelectorAll(".slideshow_slides a");
    let prev = document.querySelector(".prev");
    let next = document.querySelector(".next");
    let indicatiorArray = document.querySelectorAll(".slideshow_indicatior a");

    //현재이미지 인덱스
    let currentIndex = 0;
    let timerID = null;
    let slideCount = slidesArray.length;
    //현재이미지를 한줄로 정렬한다.
    for(let i=0; i<slideCount; i++){
        let newLeft = `${i*100}%`;
        slidesArray[i].style.left = newLeft;
    }

    //화면전환해주는 함수
    function gotoslide(index){
        currentIndex = index;
        let newLeft = `${index* -100}%`;
        slideshow_slides.style.left = newLeft;

        //indicator
        for(let i=0; i<slideCount; i++){
            indicatiorArray[i].classList.remove('active');
        }
        indicatiorArray[index].classList.add('active');
    } // end of gotoslide

    gotoslide(1);

    //3초마다 gotoslide() 불러주자.
    //불러주되, index 0,1,2,3,0,1,..
    function startTimer(){
        timerID = setInterval(()=>{
            let index = (currentIndex + 1) % slideCount;
            currentIndex = index;
            gotoslide(index);
        }, 3000);
    }
    startTimer();

    //이벤트등록 핸들러기능
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
        event.preventDefault();  //anchor tag 가지고 있는 페이지이동 기본기능을 막아라
        currentIndex = currentIndex -1
        if(currentIndex < 0){
            currentIndex = slideCount -1;
        }
        gotoslide(currentIndex);
    });

    next.addEventListener("click", (event)=>{
        event.preventDefault();  //anchor tag 가지고 있는 페이지이동 기본기능을 막아라
        currentIndex = currentIndex +1
        if(currentIndex > (slideCount -1)){
            currentIndex = 0;
        }
        gotoslide(currentIndex);
    });

    //indivator 클릭하면 해당된 페이지로 이동한다.
    // for(let i=0; i<slideCount; i++){
    //     indicatiorArray[i].addEventListener("mouseenter",(event)=>{
    //         clearInterval(timerID);
    //     });
    // }

    indicatiorArray.forEach((obj)=>{
        obj.addEventListener("mouseenter",(event)=>{
            clearInterval(timerID);
        });
    });

    // for(let i=0; i<slideCount; i++){
    //     indicatiorArray[i].addEventListener("mouseleave",(event)=>{
    //         startTimer();
    //     });
    // }

    indicatiorArray.forEach((obj)=>{
        obj.addEventListener("mouseleave",(event)=>{
            startTimer();
        });
    });

    // for(let i=0; i<slideCount; i++){
    //     indicatiorArray[i].addEventListener("click",(event)=>{
    //         event.preventDefault();
    //         gotoslide(i);
    //     });
    // }

    indicatiorArray.forEach((obj,index)=>{
        obj.addEventListener("click",(event)=>{
            event.preventDefault();
            gotoslide(index);
        });
    });
} // end of carousel