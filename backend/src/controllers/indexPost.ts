import { RequestHandler, Response ,Request} from "express";
import pool from "../Database/index"

export const indexController: RequestHandler = (_, response: Response) => {
    response.send("Hola!");
};



export async function getAllPosts (_, response: Response) {
    try{
        const result = await pool.query('select * from posts ');
         console.log(result.rows)
       return response.status(200).json( result.rows )
          }catch(err){
          console.log(err.message);

      }
}  

export async function getPost (request:Request, response: Response) {
    try
       {
        const  id = request.query.id
        console.log(id)
      const result = await pool.query(`select * from posts where id=${id}`);
       console.log(result.rows)
     return response.status(200).json( result.rows )
        }catch(err){
        console.log(err.message);

    }
}  
export async function getPostByIdUser (request:Request, response: Response) {
    try
       {
        const  id = request.query.id_user
        console.log(id)
      const result = await pool.query(`select * from posts where id_user=${id}`);
       console.log(result.rows)
     return response.status(200).json( result.rows )
        }catch(err){
        console.log(err.message);

    }
} 


export async function delPosts (request:Request, response: Response) {
    try{
            
        const  id = request.query.id
        console.log(id)
        const rows= await pool.query('delete from posts where id=$1',[id])
         console.log(rows)
     return response.status(200).json({error: false, message: "success"})
        }catch(err){
        console.log(err.message);
    }
} 
export async function insertPosts (request:Request, response: Response) {
    try{
    
        console.log(request.body)
       const rows = await pool.query('insert into posts (id,id_user,title,url,photo,type_post,description,commentaire,tag,created_at)  values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) ',
       [request.body.id,request.body.id_user,request.body.title,request.body.url,request.body.photo,request.body.type_post,request.body.description,request.body.commentaire,request.body.tag,request.body.created_at]);
         console.log(rows)
     return response.status(200).json({error: false, message: "success"})
        }catch(err){
        console.log(err.message);
    }
}
export async function updatePosts (request:Request, response: Response) {
    try{

        const {rows}= await pool.query(' UPDATE posts SET id_user=$2,title=$3,url=$4,photo=$5,type_post=$6,description=$7,commentaire=$8,tag=$9,created_at=$10 where id=$1 ',
        [request.body.id,request.body.id_user,request.body.title,request.body.url,request.body.photo,request.body.type_post,request.body.description,request.body.commentaire,request.body.tag,request.body.created_at]);
        console.log(rows)
     return response.status(200).json({error: false, message: "success"})
        }catch(err){ 
        console.log(err.message);
    }
} 
