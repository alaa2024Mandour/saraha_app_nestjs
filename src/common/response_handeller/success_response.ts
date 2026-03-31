export function successRes (ms:string,data?:any) {
    if(data){
        return({message:ms,data})
    }else{
        return({message:ms})
    }
}