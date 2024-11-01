function onLoad(){
    //객체찾기
    const btnOpen = document.querySelector("#open");
    const btnClose = document.querySelector("#close");
    const idobj = document.querySelector("#userid");
    const pwd = document.querySelector("#pwd");
    //팝업윈도우 === window 핸들변수
    let win = null;
    
    //이벤트리스너등록 및 핸들러처리
    btnOpen.addEventListener("click",()=>{
        win =  window.open("./ex8_2_formName.html","_blank","width=400, height=400, left=100, top=100");
        setTimeout(()=>{
            win.document.querySelector("#userid").value = idobj.value;
            win.document.querySelector("#pwd").value = pwd.value;
        },100);
    });
    btnClose.addEventListener("click",()=>{
        win = window.close();
    });
}