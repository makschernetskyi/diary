export const createCalendar = () => {
	const canvas = document.getElementById('Calendar_canvas')
  
	const ctx = canvas.getContext('2d')
  
	const WIDTH = canvas.width
  
	const HEIGHT = canvas.height


	ctx.strokeStyle = "#000000"
	ctx.lineWidth = 2
	ctx.font = "100px Rubik"
  
	const Calendar = [...new Array(6)].map(() => new Array(7))
  
  
	const now = new Date(Date.now())
  
	const firstDayInCurrentMonth = (()=>{
		const now = new Date(Date.now())
		now.setDate(1)
		return now.getDay()
	})()
  
	const daysInCurrentMonth = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate()
  
  
	fillCalendar(Calendar, firstDayInCurrentMonth, daysInCurrentMonth)
	renderCalendar(ctx, WIDTH, HEIGHT, Calendar)
}
  
  
  
  
  
function renderCalendar(ctx, WIDTH, HEIGHT, Calendar){
	const step = Math.floor(WIDTH/7)
	//const drawGridConfigured = curry(drawGrid, ctx, WIDTH, HEIGHT)
	const drawCellConfigured = curry(drawCell, ctx, step)

	ctx.clearRect(0,0,WIDTH,HEIGHT)
	//drawGridConfigured(step)
	
	for(let i = 0; i<6; i++){
		for(let j = 0; j<7; j++){
			if(Calendar[i][j]){
				drawCellConfigured(j*step,i*step+step,Calendar[i][j])
			}
		}
	}
	const weekDays = ['Mo','Tu','We','Th','Fr','Sa','Su']
	weekDays.forEach((day, index)=>{
		ctx.fillText(day, step*index+200, 200)
	})
}
  
//function drawGrid(ctx, width, height, step){
//	for(let i = step; i<width; i+=step){
//		ctx.beginPath()
//		ctx.moveTo(i,0)
//		ctx.lineTo(i,height)
//		ctx.stroke()
//		ctx.closePath()
//	}
//	for(let i = step; i<height; i+=step){
//		ctx.beginPath()
//		ctx.moveTo(0,i)
//		ctx.lineTo(width,i)
//		ctx.stroke()
//		ctx.closePath()
//	}
//}
  
function drawCell(ctx, size, offsetX, offsetY, day){
	ctx.fillText(day, offsetX+100, offsetY+100)
}
	
function fillCalendar(Calendar, firstDayInMonth, daysInMonth){
	for(let i = 0; i<6; i++){
		for(let j = 0; j<7; j++){
			if(i*7+j+1>=firstDayInMonth && i*7+j+1<firstDayInMonth+daysInMonth){
				Calendar[i][j] = i*7+j+1 - firstDayInMonth +1
			}
		}
	}
}
  
function curry(fn, ...myArguments){
	return (...nextArguments)=>{
		return fn(...myArguments, ...nextArguments)
	}
}
  
  