function dp(text)
{
	document.getElementById("label").innerHTML=text;
}

function demo()
{
	var url="http://musicapi.leanapp.cn/song/detail?ids=347230";
	
	setTimeout(function(){
		dp("Loading...");
		$.get(url,function(data){
		var song = data["songs"][0];
		var name = song["name"];
		var ars = "";
		var i=0;
		while(i<song["ar"].length)
		{
			if(ars!="")
			{
				ars+="s";
			}
			ars+=song["ar"][i]["name"];
			i++;
		}
		dp(ars+"-"+name);
	});
		});
	
}