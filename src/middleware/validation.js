import {z, ZodError } from "zod";

const validation = (schema) => (req, res, next) => {
   
  try {
    
 const data= schema.parse(req.body);

    next();
  } catch (err) {
    if (err instanceof ZodError) {
    //   const formatedError = z.treeifyError(err);

      return res.status(400).send(err.flatten());
    }

    res.status(400).send(err);
  }
}
export default validation;
