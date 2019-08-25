let a = 0
$("#qqortim").change(() => {
	console.log("change")
	console.log(a)
	a++
	if( a%2 == 1){
		$("#bili")[0].innerHTML = '<iframe src="//player.bilibili.com/player.html?aid=52425230&cid=91750540&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="370" height="278"> </iframe>'
		console.log($("#bili")[0].innerHTML)

	}else{
		$("#bili")[0].innerHTML = '<iframe src="//player.bilibili.com/player.html?aid=52425371&cid=91750957&page=1 "scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="370" height="278"> </iframe>'
	}
})
