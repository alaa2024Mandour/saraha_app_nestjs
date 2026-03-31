import {hashSync,compareSync} from "bcrypt"

export const Hash = ({plainText,saltRounds=12}:{plainText:string,saltRounds?:number}) => {
    return hashSync(String(plainText),saltRounds)
}

export const Compare = ({plainText,cipherText}:{plainText:string,cipherText:string}) => {
    return compareSync(plainText,cipherText)
}