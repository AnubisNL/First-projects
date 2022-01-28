function converter(){
    let bn =  document.getElementById('bn')
    let bin =  String(bn.value)

    for (let i = 0; i <bin.length;i++){
    
    if (bin[i]!= '1' || bin[i]!= '0') {
        window.alert('isso nao é um número binário')
        
    }
    

    }



    let des = parseInt(bin, 2)
    out.innerHTML = 'testando '+ des

}