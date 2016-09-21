/**
 * Created by Administrator on 2016/8/23.
 */
var oDiv=document.getElementById('box');
var ulNode=oDiv.getElementsByTagName('ul')[0];
var lisNode=ulNode.getElementsByTagName('li');
var arr=[];//记录是否有雷
var allLiNode=[];//记录位子
function Bulidbox(x,y){// x为横坐标，y为纵坐标
    var frag=document.createDocumentFragment();
    for(var i=0;i<y;i++){
        arr[i]=[];
        allLiNode[i]=[];
        for(var j=0;j<x;j++){
            arr[i][j]=true;//true表示无雷，false表示有雷
            var lisNode=document.createElement('li');
            allLiNode[i][j]=lisNode;
            lisNode.x=j;
            lisNode.y=i;
            frag.appendChild(lisNode);
        }
    }
    ulNode.appendChild(frag);
}
function mine(numMine){//布雷，numM为雷的个数
    for(var k=0;k<numMine;k++){
        i=Math.floor(Math.random()*9);
        j=Math.floor(Math.random()*9);
        arr[i][j]=false;//j是横坐标，i是纵坐标；
        if(allLiNode[j][i].className=='lei'){
            k-=1;
        }
    }
}
Bulidbox(9,9);//建立扫雷场
mine(10);//布雷
oDiv.onclick=function(e){
   var event=window.event||e;
   var target=event.srcElement||event.target;
   if(target.nodeName.toLowerCase()=="li"){//toLowercase将字符串统一转化成小写，便于判别
       LeftliFun(target);
   }
}
function LeftliFun(target){
    if(target.className=="none")//说明已经点过
    {
        return;
    }
    var x=target.x;
    var y=target.y;
   // console.log(x,y);
    var bobNum=0;
    if(arr[y][x]==false){
        for(var i=0;i<9;i++){
            for(var j=0;j<9;j++) {
                if(arr[i][j]==false){
                    allLiNode[i][j].className='lei';
                }
            }
        }
    }
    else{
        for(var yy=y-1;yy<=y+1;yy++){//找我按下去的那个区域周边8个位置有多少颗雷
            for(var xx=x-1;xx<=x+1;xx++){
                if(yy>=0 && xx>=0)//二维数组存在；语法是对的
                {
                    if(arr[yy]!=null)//保证一维数组是可以被找到的
                    {
                        if(arr[yy][xx]==false)
                        {
                            bobNum++;
                        }
                    }
                }
            }
        }
        if(bobNum==0){//无雷
            target.className="none";
            for(var yy=y-1;yy<=y+1;yy++){
                for(var xx=x-1;xx<=x+1;xx++){
                    if(yy>=0 && xx>=0)//二维数组存在；语法是对的
                    {
                        if(arr[yy]!=null)//保证一位数组是可以被找到的
                        {
                            if(arr[yy][xx]!=null)//判定位置是存在的
                            {
                                if((yy!=y || xx!=x) && allLiNode[yy][xx].className!="none"){//yy!=y && xx!=x不能等于他本身，因为已经判断过了，防止死循环的
                                    //console.log(allLiNode[yy][xx]);
                                    LeftliFun(allLiNode[yy][xx]);
                                }
                            }
                        }
                    }
                }
            }
        }
        else{//有雷
            target.className="none";
            target.innerHTML=bobNum;
        }
    }

}

//还需添加鼠标右击事件，加上红旗；
