let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
addButton.addEventListener("click",addTask)
let taskList = []
let tabs = document.querySelectorAll(".task-tabs div") //아이템 필터링을 하기 위해
let mode="all" //render 함수 내에서도 써줘야 하기 때문에 원래 filter 함수(지역변수)였는데 전역변수로 바꿔주고 초기값은 "all"이다
let filterList = []
let list = []

console.log(tabs);
for(let i=1;i<tabs.length;i++){   //탭 항목들을 클릭해야 하는데 아이템들이 여러개이기 때문에 for문 써줘야함 
    tabs[i].addEventListener("click",function(event) //tab도 어떤거 선택했는지 알아야 하기 떄문에 event태그를 준다...?
    {filter(event)})
}



function addTask(){
    let task = { //check 버튼을 눌렀을 때 줄생기게 하기 위한 객체의 사용
        id:randomIDGenerate(),
        taskContent : taskInput.value,
        isComplete : false //끝났나 안 끝났나
    }
    taskList.push(task)
    console.log(taskList)
    render()
}

function render(){
     list = [] //2.리스트를 달리 보여준다 --> 빈껍데기 만들어주고 모든 trackList를 list로 바꿔줘야 함
    if (mode==="all"){ //1. 내가 선택한 탭에 따라서
        list = taskList;
    }else if (mode==="ongoing"){
        list = filterList
    }else if (mode==="done"){
        list = filterList
    }

    
    let resultHTML = '';
    for( let i=0;i<list.length;i++){
        if(list[i].isComplete == true){
            resultHTML +=`<div class="task">
            <div class = "task-done">${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button> 
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
            </div>`
        }else{resultHTML+=`<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
            <button onclick="toggleComplete('${list[i].id}')">Check</button> 
            <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
        </div>`;
        }
    }


    document.getElementById("task-board").innerHTML = resultHTML
}

function toggleComplete(id){ //check 버튼을 눌렀을 때 밑줄가게 할려고 함수만듬
    
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete; //현재 갖고 있는 값의 반댓값
            break;
        }
    }
    console.log(taskList)
    render()
}


function deleteTask(id){
    for(let i=0;i<list.length;i++){
        if(list[i].id == id){
            list.splice(i,1) //array에서 아이템 삭제하는 방법
            break;
        }
    }
   render()
}


function filter(event){ //event를 매개변수로 받고 있고 내가 누구를 클릭했는지를 알려준다(addeventlistner가)
    console.log("filter",event.target.id);//target-->내가 클릭한 애의 태그 전체가 나옴
     mode= event.target.id //내가 선택한 탭의 정보를 보여줌
     filterList = [] //진행중인 아이템들을 보여줄 리스트 만들어야함.
    if(mode === "all"){
        render();
    }else if(mode === "ongoing"){
        for(i=0;i<taskList.length;i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i]);
            }
        }
        render();
    }else if(mode === "done"){
        for(i=0;i<taskList.length;i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i]);
            }
        }
        render();
    }
}

function randomIDGenerate(){ // toggleComplete함수가 어떤 check를 클릭하는지 알 수 없기 때문에 각각의 아이템에 id를 부여해줘야함
    return '_'+ Math.random().toString(36).substring(2,9);
}