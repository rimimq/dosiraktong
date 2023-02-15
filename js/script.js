// 이미지 및 리소스 로드 후 코드실행
window.onload = function () {

    let htmlTag = document.querySelector("html");
    // 모바일 메뉴 버튼 처리
    // 1. 모바일 버튼을 찾아서 저장한다.
    let mbBt = document.querySelector(".mb-bt");
    // 2. 모바일 메뉴를 찾아서 저장한다.
    let mbNav = document.querySelector(".mb-nav");
    // 3. 로고를 찾아서 저장한다.
    let logo = document.querySelector(".logo");
    // 4. header 를 찾아서 저장한다.
    let header = document.querySelector(".header");
    // 5. gnb > li > a
    let gnbA = document.querySelectorAll(".gnb>li>a");
    // 6. mb-bt span
    let mbBtSpan = document.querySelectorAll(".mb-bt span");

    // 4. 모바일 버튼 클릭을 하면  
    mbBt.addEventListener("click", function () {
        // html scroll 없애기
        htmlTag.classList.toggle("active");
        //  로고에 active 클래스를 추가한다.
        logo.classList.toggle("active-blue");
        //  모바일 버튼에 active 클래스를 추가한다.
        mbBt.classList.toggle("active");
        // 모바일 메뉴에 active 클래스를 추가한다.
        mbNav.classList.toggle("active");
        mbBtSpan.forEach((item) => {
            item.classList.add("active");
        });
    });
    // 화면 리사이징 처리 
    window.addEventListener("resize", function () {
        // window 의 화면 안쪽 너비 체크
        // console.log(window.innerWidth);
        let wW = window.innerWidth;
        if (wW > 1080) {
            // html scroll 없애기
            htmlTag.classList.remove("active");

            //  모바일 버튼에 active 클래스를 제거한다.
            mbBt.classList.remove("active");
            // 모바일 메뉴에 active 클래스를 제거한다.
            mbNav.classList.remove("active");

            // 스크롤이 되었는지 안되었는지에 따라서 처리 분리
            let scT = window.document.documentElement.scrollTop;
            if (scT > 100) {
                // 스크롤이 되었으므로
                mbBtSpan.forEach((item) => {
                    item.classList.add("active");
                });
            } else {
                // 모바일 버튼 아이콘 색상 짙게(#fff)
                mbBtSpan.forEach((item) => {
                    item.classList.remove("active");
                });
            }

            logo.classList.remove("active-blue");
        }

    });
    // window 스크롤 처리
    window.addEventListener("scroll", function () {
        // 스크롤바가 스크롤이 된 픽셀 값을 파악
        let scT = window.document.documentElement.scrollTop;
        // 조금이라도 스크롤을 했다면 처리한다.
        if (scT > 100) {
            header.classList.add("active");
            logo.classList.add("active");
            gnbA.forEach((item) => {
                item.classList.add("active");
            });
            mbBtSpan.forEach((item) => {
                item.classList.add("active");
            });
        } else {
            header.classList.remove("active");
            logo.classList.remove("active");
            gnbA.forEach((item) => {
                item.classList.remove("active");
            });
            mbBtSpan.forEach((item) => {
                item.classList.remove("active");
            });
        }
    });
    // 화면 Reload 시 처리
    let scT = window.document.documentElement.scrollTop;
    if (scT > 100) {
        header.classList.add("active");
        logo.classList.add("active");
        gnbA.forEach((item) => {
            item.classList.add("active");
        });
        mbBtSpan.forEach((item) => {
            item.classList.add("active");
        });
    }

    //data.joun 외부연동
    //1. XMLHttpRequest 활용(반드시 JSON.parse()실행)
    const xhttp = new XMLHttpRequest();
    //data.json 이 불러들여졌는지 검사 후 완료 시 실행
    xhttp.onreadystatechange = function (e) {
        const req = e.target;
        if (req.readyState === XMLHttpRequest.DONE) {
            console.log(req.response);
            //아래 구문을 반드시 체크.
            const dataArr = data.visual;
            console.log(dataArr);
        }
    }
    // xhttp.open("GET", "data.json");
    // xhttp.send();

    //2. fetch 활용 (아래구문을 준수. JSON.parse를 할 필요가 없음.)
    fetch("data.json")
        .then((res) => {
            res.json();
        })
        .then((data) => {
            //데이터를 활용
            // console.log(data.visual)
            const dataArr = data.visual;
            //데이터를 외부 변수에 저장
            visualData = dataArr;
            console.log(visualData);
            showVT(visualData[0]);
        })
        .catch((err) => {
            console.log(err);
        });

    //비주얼에 활용할 데이터
    let visualData;
    //화면에 데이터를 출력하는 함수
    const swvTitle = document.querySelector(".swvisual-title");
    const swvTxt = document.querySelector(".swvisual-txt");
    const swvLink = document.querySelector(".swvisual-link");
    const swList = document.querySelectorAll(".swvisual-list li")
    // 타이틀 내용 보여주기
    function showVT(_data) {
        swvTitle.innerHTML = _data.title;
        swvTxt.innerHTML = _data.txt;
        if (_data.link === "no") {
            swvLink.classList.add("active");
        } else {
            swvLink.classList.remove("active");
        }
    }
    //포커스 라인 애니메이션 실행함수
    function changeBar(_idx) {
        swList.forEach((item, index) -> {
            if(index === _idx) {
            item.classListadd("active");
        }
    });
}


// 비주얼 슬라이드
let swvisual = new Swiper(".swvisual", {
    effect: "fade",
    loop: true,
    speed: 1000,
    autoplay: {
        delay: 1000,
        disableOnInteraction: false,
    },
    navigation: {
        prevEl: ".swvisual-prev",
        nextEl: ".swvisual-next"
    }
});
//슬라이드가 변경될 때마다 하고 싶은 일 진행
swvisual.on("slideChange", function () {
    console.log("진짜 html 태그의 순서", swvisual.realIndex);
    console.log("모션이 되는 순서", swvisual.realIndex);
    //텍스트를 수정
    showVT(visualData[swvisual.realIndex]);
});

}