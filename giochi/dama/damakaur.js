function GiocoDama()
{
	let turno;
	let tocco1=false;
	let tocco2=false;
	let rtocco1;
	let ctocco1;
	let rtocco2;
	let ctocco2;
	var lato=8;
	let matrice=
		[[1,0,1,0,1,0,1,0],
		[0,1,0,1,0,1,0,1],
		[1,0,1,0,1,0,1,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,2,0,2,0,2,0,2],
		[2,0,2,0,2,0,2,0],
	    [0,2,0,2,0,2,0,2]];
	this.creastruttura=function()
	{
		
		var colore;
		var j=0;
		let cont=0;
		var strTab = "<table>";
		for(let c=0; c<lato; c++)
		{
			j++;
			strTab+="<tr>"
			for(let i=0; i<lato; i++)
			{
				if(j%2==0)
				{
					colore="white";
				}
				else
				{
					colore="brown";
				}
				strTab+="<td id='"+cont+"' onclick='giocodama.muovi(this.id)' style='background-color:"+colore+"' </td>";
				j++;
				cont++;
			}
			strTab+="</tr>"
		}
		strTab+="</tr></table>";
		document.getElementById("giocodama").innerHTML=strTab;
		turno=1;
		this.posiziona();
	}
	
	this.posiziona=function()
	{
		let elencocelle=document.getElementsByTagName("td");
		let colore;
		let colcella;
		let j=0;
		let k=0;
		for(let i=0;i<lato;i++)
		{
			k++;
			for(let c=0;c<lato;c++)
			{
				if(k%2==0)
				{
					colcella="white";
				}
				else
				{
					colcella="brown";
				}
				document.getElementById(j).style=`background-color:${colcella}`;
				
				if(matrice[i][c]==0)
			    {
					elencocelle[j].innerHTML="";
					
				}
				else
				{
			        if(matrice[i][c]==1)
				    {
					    colore="white";
						
					}
				    else if(matrice[i][c]==2)
				    {
					    colore="black";
						
						
					}
				    elencocelle[j].innerHTML=`<div class="pedina${colore}"> </div>`;
					
				}
				j++;
				k++;
			}
		}
	}
	
	this.muovi=function(cellaid)
	{
		
		let r=parseInt(cellaid/lato);
		let c=cellaid%lato;
		if(tocco1==false)
		{
			rtocco1=r;
			ctocco1=c;
		}
		if(tocco2==false)
		{
			rtocco2=r;
			ctocco2=c;
		}
		
		if(matrice[r][c]==1&&turno==1)
		{
			tocco1=true;
		}
		else if(matrice[r][c]==2&&turno==2)
		{
			tocco2=true;
		}
		if(tocco1)
		{
			if(matrice[r][c]==0)
			{
				if(vicino(r,c,1))
				{
					let temp=matrice[r][c];
					matrice[r][c]=matrice[rtocco1][ctocco1];
					matrice[rtocco1][ctocco1]=temp;
					tocco1=false;
				}
			    else 
				{
					mangia1(r,c);
				}
			}
			else if(matrice[r][c]==1)
			{
				rtocco1=r;
				ctocco1=c;
			}
			turno=2;
		}
		
		if(tocco2)
		{
			if(matrice[r][c]==0)
			{
				if(vicino(r,c,2))
				{
					let temp=matrice[r][c];
					matrice[r][c]=matrice[rtocco2][ctocco2];
					matrice[rtocco2][ctocco2]=temp;
					tocco2=false;
				}
			    else 
				{
					mangia2(r,c);
				}
			}
			else if(matrice[r][c]==2)
			{
				rtocco2=r;
				ctocco2=c;
			}
			turno=1;
		}
		this.posiziona();
		evidenzia();
		vittoria();
	}
	
	let vicino=function(r,c,col)
	{
		if(col==1)
		{
			if(Math.abs(ctocco1-c)==1&&r-rtocco1==1)
		    {
				return true;
			}
		}
		else
		{
			if(Math.abs(ctocco2-c)==1&&rtocco2-r==1)
			{
				return true;
			}
		}
		return false;
	}
	
	let mangia1=function(r,c)
	{
		if(Math.abs(ctocco1-c)==2&&r-rtocco1==2)
		{
			if(c>ctocco1)
			{
				if(matrice[r-1][c-1]==2)
				{
					let temp=matrice[r][c];
					matrice[r][c]=matrice[rtocco1][ctocco1];
					matrice[rtocco1][ctocco1]=temp;
					matrice[r-1][c-1]=0;
					tocco1=false;
				}
			}
			else
			{
				if(matrice[r-1][c+1]==2)
				{
					let temp=matrice[r][c];
					matrice[r][c]=matrice[rtocco1][ctocco1];
					matrice[rtocco1][ctocco1]=temp;
					matrice[r-1][c+1]=0;
					tocco1=false;
				}
			}
		}
		
		
	}
	
	let mangia2=function(r,c)
	{
		if(Math.abs(ctocco2-c)==2&&rtocco2-r==2)
		{
			if(c>ctocco2)
			{
				if(matrice[r+1][c-1]==1)
				{
					let temp=matrice[r][c];
					matrice[r][c]=matrice[rtocco2][ctocco2];
					matrice[rtocco2][ctocco2]=temp;
					matrice[r+1][c-1]=0;
					tocco2=false;
				}
			}
			else
			{
				if(matrice[r+1][c+1]==1)
				{
					let temp=matrice[r][c];
					matrice[r][c]=matrice[rtocco2][ctocco2];
					matrice[rtocco2][ctocco2]=temp;
					matrice[r+1][c+1]=0;
					tocco2=false;
				}
			}
		}
		
		
	}
	
	let evidenzia=function()
	{
		let id;
		if(tocco1==true)
		{
			id=(rtocco1*lato)+ctocco1;
			document.getElementById(id).style="background-color:red";
		}
		else if(tocco2==true)
		{
			id=(rtocco2*lato)+ctocco2;
			document.getElementById(id).style="background-color:red";
		}
		
	}
	
	let controlla=function(tipo)
	{
		for(let r=0;r<lato;r++)
		{
			for(let c=0;c<lato;c++)
			{
				if(matrice[r][c]==tipo)
				{
					return false;
				}
			}
		}
		return true;
	}
	
	let vittoria=function()
	{
		if(controlla(1))
		{
			console.log("ha vinto il giocatore 2");
		}
		else if(controlla(2))
		{
			console.log("ha vinto il giocatore 1");
		}
	}
}







