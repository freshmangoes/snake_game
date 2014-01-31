$(document).ready(function(){
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var width = 450;
	var height = 450;
	var cellWidth = 10;
	var direction;
	var food;
	var score;
    var scoreOld;
    //var speed;
    var level;
	var snake_array; 
	function init(){
		direction = "right"; 
		drawSnake();
		drawFood(); 
		score = 0;
        scoreOld = 0;
        level = 1;
		if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(draw, 100);
	}
	init();
	function drawSnake(){
		var length = 5;
		snake_array = []; 
		for(var i = length-1; i>=0; i--){
			snake_array.push({x: i, y:0});
		}
	}
	function drawFood(){
		food = {
			x: Math.round(Math.random()*(width-cellWidth)/cellWidth), 
			y: Math.round(Math.random()*(height-cellWidth)/cellWidth), 
		};
	}
	function draw(){
		drawCanvas();
		var newX = snake_array[0].x;
		var newY = snake_array[0].y;
		if(direction == "right") newX++;
		else if(direction == "left") newX--;
		else if(direction == "up") newY--;
		else if(direction == "down") newY++;
		if(newX == -1 || newX == width/cellWidth || newY == -1 || newY == 
			height/cellWidth || check_collision(newX, newY, snake_array)){
			//init();
            gameOver();
			return;
		}
		if(newX == food.x && newY == food.y){
			var tail = {x: newX, y: newY};
			score++;
			drawFood();
            if(score >= 2){
                game_loop = setInterval(draw, 90);    
            }else if(score>=4){
                game_loop = setInterval(draw, 80);     
            }else if(score >= 8){
                game_loop = setInterval(draw, 70);
            }else if(score >= 14){
                game_loop = setInterval(draw, 60);
            }
		}
		else{
			var tail = snake_array.pop(); 
			tail.x = newX; tail.y = newY;
		}
		snake_array.unshift(tail); 
		for(var i = 0; i < snake_array.length; i++){
			var c = snake_array[i];
			drawCell(c.x, c.y);
		}
		drawFoodCell(food.x, food.y);
		drawScore();
	}
	function drawCanvas(){
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, width, height);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, width, height);
	}
	function drawScore(){
		var score_text = "Score: " + score;
		ctx.fillStyle = "white";
		ctx.fillText(score_text, 5, height-5);
        ctx.fillText(level_text, 5, height-10);
	}
	function drawCell(x, y){
		ctx.fillStyle = "black";
		ctx.fillRect(x*cellWidth, y*cellWidth, cellWidth, cellWidth);
		ctx.strokeStyle = "aqua";
		ctx.strokeRect(x*cellWidth, y*cellWidth, cellWidth, cellWidth);
	}
	function drawFoodCell(x,y){
		ctx.fillStyle = "black";
		ctx.fillRect(x*cellWidth, y*cellWidth, cellWidth, cellWidth);
		ctx.strokeStyle = "green";
		ctx.strokeRect(x*cellWidth, y*cellWidth, cellWidth, cellWidth);
	}
	function check_collision(x, y, array){
		for(var i = 0; i < array.length; i++){
			if(array[i].x == x && array[i].y == y)
			 return true;
		}
		return false;
	}
    function gameOver(){
        active = false;
        ctx.fillStyle = 'black';
        var score_text_final = "Your final score was: " + score;
        ctx.fillStyle = "white";
        ctx.fillText(score_text_final, width/2-60, height/2);
        var reset_text = "Restart by pressing space bar!";
        ctx.fillStyle = "white";
        ctx.fillText(reset_text, width/2-60, height/2 + 100);
    }
	$(document).keydown(function(e){
		var key = e.which;
		if(key == "37" && direction != "right") direction = "left";
		else if(key == "38" && direction != "down") direction = "up";
		else if(key == "39" && direction != "left") direction = "right";
		else if(key == "40" && direction != "up") direction = "down";
		else if(key == "32") init();
	})	
})	