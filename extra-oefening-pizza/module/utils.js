class Utils{
    static async getData(url, callback, failure = this.failure, options) {
        let response; 
    
        try{
            if(options != null){
                response = await fetch(url, options);
            }else{
                response = await fetch(url);
            }
    
            if (response.ok) {
                let data =  await response.json();
                callback(data);
            }else{
                failure(response);
            }
        }catch (error){
            console.log(error);
        }    
    }
    
    
    failure(data){
        console.error("Failed:",data);
    }
}


export default Utils;