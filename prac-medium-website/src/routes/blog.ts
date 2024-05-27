import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET:string;
  };
  Variables :{
    userId : string
  }
}>();


// middleware for authorization
 
blogRouter.use('/*',async(c,next)=>{
    const authHeader = c.req.header('authorization')||"";
    
    const user =  await verify(authHeader,c.env.JWT_SECRET);
    if(user){
      c.set("userId",user.id)
      console.log("authorization is working")
      await next()
    }else{
      c.status(403)
      return c.json({
        message:"your are not logged in"
      })
    }
   
})


//    POST REQUEST

 blogRouter.post("/", async (c) => {
   const userId = c.get('userId');
   const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
   })
   const body = await c.req.json();
   
   try{

     const post = await prisma.post.create({
          data:{
              title: body.title,
              content: body.content,
              authorId: Number(userId)
          }
     })
    return c.json({
        id: post.id
    });
   }catch(e){
     c.status(403);
     console.log(e)
     return c.json({
        message:"Invalid creditionals"
     })
   }
 });

 

 // UPDATE REQUEST
 
 blogRouter.put("/", async(c) => {
   const body  = await c.req.json();
   
   
   const prisma = new PrismaClient({
     datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())
    
    const blogUpdate = await prisma.post.update({
      where:{
        id: body.id
      },
      data:{
        title: body.title,
        content: body.content
      }
    })
    return c.json({
      id:blogUpdate.id
    })
  });

   
     // GET REQUEST ON ID


     blogRouter.get('/bulk', async(c)=>{
      const prisma = new PrismaClient({
          datasourceUrl: c.env.DATABASE_URL
      }).$extends(withAccelerate());
      
      try{
        const posts =  await prisma.post.findMany({})
        return c.json({
             posts
        })
  
      }catch(e){
          console.log(e);
          return c.json({
             error: "Error occur on"
          })
      }
      
  })

  blogRouter.get('/:id',async(c)=>{
     const id = await c.req.param('id');
     const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
     }).$extends(withAccelerate());

     const  posts =  await prisma.post.findUnique({
           where:{
             id : Number(id)
           }
     })

      return c.json(posts)
  })
  
















  blogRouter.get("/:id",async (c) => {
    const id = c.req.param('id');
   
    console.log(id);
    const prisma = new PrismaClient({
       datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
 
    const post =  await prisma.post.findFirst({
       where:{
          //  Number(id)
           id : Number(id)
       }
    })
     
    return c.json({
        post
    })
    
  });





