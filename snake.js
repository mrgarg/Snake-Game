function init()
{
    canvas = document.getElementById('mycanvas');
    H = canvas.height = 690; //frame height
    W= canvas.width = 1480;  // frame width
    pen = canvas.getContext('2d');

    cs =40; // cell size

    score =100;   // initial score

    food = getRandomFood();   // get food
    
    game_over=false;

    food_img = new Image();
    food_img.src = "./img/apple.png"

    trophy = new Image();
    trophy.src = "./img/trophy.png"
    
    snake={

        init_len:5,
        color:"blue",
        cells:[],
        direction:"right",
        createSnake:function()  // will init the cells
        {
            for(var i=this.init_len;i>0;i--)
            {
                this.cells.push({x:i,y:0});  // cells[0] will be the head
            }

        },
        drawSnake:function()  // will draw the boxes on the frame 
        {   
            for(var i=0;i<this.cells.length;i++)
            {
                pen.fillStyle=this.color;
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-1,cs-1);
            }
        },
        updateSnake:function(){

            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
           
            //when head of the snake collides with the food coordinates
            if(headX==food.x && headY== food.y) 
            {
                food = getRandomFood();
                score+=1;
            }
            else{    // else pop the tail/last block and place it to the front
            this.cells.pop();
            }
            var nextX,nextY;
            if(this.direction=="right")    // for keyboard 
            {
                nextX = headX+1;
                nextY = headY;
               
            }
            else if(this.direction=="left")
            {
                nextX = headX-1;
                nextY = headY;
               
            }
            else if ( this.direction =="up")
            {
                nextX = headX;
                nextY = headY-1;
               
            }
            else
            {
                nextX = headX;
                nextY = headY+1;
               
            } 
            this.cells.unshift({x:nextX,y:nextY}); 


            /* prevents snake from going out*/
            var last_x= Math.round(W/cs);
            var last_y =Math.round(H/cs);
            if(this.cells[0].y < 0 || this.cells[0].x < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y)
            {
                game_over=true;
            }

        }
    };
    snake.createSnake();
    
	//Add a Event Listener on the Document Object
    function keyPressed(e)
    {
        if(e.key=="ArrowRight" ){

            snake.direction="right";
        }
        else if(e.key=="ArrowLeft" )
        {
            snake.direction="left";
        }
        else if( e.key=="ArrowDown")
        {
            snake.direction="down";
        }
        else{
            snake.direction="up";
        }
        console.log(snake.direction);

    }
    document.addEventListener("keydown",keyPressed);
    
}

function draw()
{
    // erase the old frame and draw new snake
   pen.clearRect(0,0,W,H) 
   snake.drawSnake();

   // draw the food 
   pen.fillStyle="red";
   pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);


   // trophy and score
   pen.drawImage(trophy,18,20,cs+20,cs+20);
   pen.fillStyle = "blue";
   pen.font = "20px Roboto"
   pen.fillText(score,35,45);
}

function update()
{
    snake.updateSnake();
}

function getRandomFood()
{
    // generate random coordinates for food
    var FoodX= Math.round(Math.random()*(W-cs)/cs);
    var FoodY= Math.round(Math.random()*(H-cs)/cs);

    var food ={
        x:FoodX,
        y:FoodY,
        color:"red",
    }
    return food;
    
}
function gameLoop()
{
    if(game_over==true)
    {
        clearInterval(f);
        alert("Game is Over");
        return;
    }
    draw();
    update();
}

init();
var f = setInterval(gameLoop,100);
