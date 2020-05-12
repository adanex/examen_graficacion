let circuloPP;
let circuloDDA;
let circuloBH;
let partes,angulo,step,xp,yp,pPP,pDDA,pBH;
let dimencion = 50;

let i;
let pfPP,pfDDA,pfBH;

let pintarCirculo=0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	
	
	inst = createElement('h5', 'escribe el numero de partes');
	inst.position(windowWidth/6, 20);

	num = createInput();
	num.position(windowWidth/6, 80);

	boton = createButton('Partir');
	boton.position(windowWidth/6, 100);
	boton.mousePressed(greet);

	e1 = createElement('h2', 'puntoPendiente');
	e1.position(windowWidth/2, 20);
	e2 = createElement('h2', 'DDA');
	e2.position(windowWidth/2, 150);
	e3 = createElement('h2', 'Bresenham');
	e3.position(windowWidth/2, 300);
	
	
	stroke("black");
	
	frameRate(60);
}

function draw() {
	

	if(angulo < radians(360) && partes > 1){
		piPP = {x: windowWidth/4, y:20};
		piDDA = {x: (windowWidth/4)*2, y:150};
		piBH = {x: (windowWidth/4)*3, y:300};
		if (pintarCirculo<1) {
			ellipse(piPP.x, piPP.y,dimencion,dimencion);
			ellipse(piDDA.x, piDDA.y,dimencion, dimencion);
			ellipse(piBH.x, piBH.y,dimencion,dimencion);
		}
		pintarCirculo++;
		xp = Math.floor(dimencion/2 * cos(angulo));
		yp = Math.floor(dimencion/2 * sin(angulo));
		pfPP = {x:Math.floor(piPP.x+xp),y:Math.floor(piPP.y+yp)};
		pfDDA = {x:Math.floor(piDDA.x+xp),y:Math.floor(piDDA.y+yp)};
		pfBH = {x:Math.floor(piBH.x+xp),y:Math.floor(piBH.y+yp)};

		DDA(piDDA,pfDDA);
		DDA(pfDDA,piDDA);
		puntoPendiente(piPP,pfPP);
		Bresenham(piBH,pfBH);
		line(piPP.x,piPP.y,piPP.x+xp,piPP.y+yp);

		angulo+= step;

	}
	
}

function puntoPendiente(p1,p2) {
	var dx = p2.x - p1.x;
	var dy = p2.y - p1.y;

	let x;
    let m, b, y;
    
    m = dy / dx;
    b = p1.y - m * p1.x;

    x = p1.x;
    y = p1.y;
     
    while (x < (p2.x + 1)) {
        
        point(x, p1.y)
        x++;
        y = m * x + b; 
    }
}

function DDA(p1, p2) {
	var p,xi,yi,k;
	var dx = p2.x - p1.x;
	var dy = p2.y - p1.y;

	point(p1.x, p1.y)

	let y=p1.y,x=p1.x;
	
	if (dx > dy || dy == 0) {
		p = dx;
	} else {
		p = dy;
	}

	xi = dx / p;
    yi = dy / p;

	for(k = 0;k < p;k++){
		x += xi;
		y += yi;
		point(x, y);
	}
}


function Bresenham(p1, p2){
	var dx = p2.x - p1.x;
	var dy = p2.y - p1.y;

	point(p1.x, p1.y)

	var m,b;
	let y,x,xEnd,stepx,stepy,p,incE,incNE;
	

	  if (dy < 0) { 
	    dy = -dy;
	    stepy = -1; 
	  } 
	  else{
	  	stepy = 1;
	  }  
	  if (dx < 0) {  
	    dx = -dx; 
	    stepx = -1; 
	  } 
	  else{
	  	stepx = 1;
	  } 
	    
	  x = p1.x;
	  y = p1.y;
	  point(p1.x, y)


	  if(dx>dy){
	    p = 2*dy - dx;
	    incE = 2*dy;
	    incNE = 2*(dy-dx);
	    while (x != p2.x){
	      x += stepx;
	      if (p < 0){
	        p += incE;
	      }
	      else {
	        y += stepy;
	        p += incNE;
	      }
	      point(x,y)
	    }
	  }else{
	    p = 2*dx - dy;
	    incE = 2*dx;
	    incNE = 2*(dx-dy);
	    while (y != p2.y){
	      y += stepy;
	      if (p < 0){
	        p += incE;
	      }
	      else {
	        x += stepx;
	        p += incNE;
	      }
	      point(x,y);
	    }
	  }
	}


function greet() {
	background('white');
	pintarCirculo =0;
	piPP = {x: windowWidth/4, y:400};
	piDDA = {x: (windowWidth/4)*2, y:400};
	piBH = {x: (windowWidth/4)*3, y:400};
	partes = num.value();
	step = radians(360/partes);
	angulo= 0;
}